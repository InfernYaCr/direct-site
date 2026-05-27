<?php
declare(strict_types=1);

/**
 * send-lead.php — обработчик форм заявок
 *
 * Скопируйте этот файл в send-lead.php и задайте переменные окружения
 * на сервере (через .htaccess, панель хостинга или .env):
 *
 *   LEAD_EMAIL      — email для уведомлений о заявках
 *   TG_BOT_TOKEN    — токен Telegram-бота (получить у @BotFather)
 *   TG_CHAT_IDS     — chat_id получателей через запятую, например: 123456,789012
 *   LEADS_CSV_PATH  — путь к CSV-файлу для хранения заявок (опционально)
 */

function redirect_to(string $url): void
{
    header('Location: ' . $url, true, 303);
    exit;
}

function field(string $key): string
{
    return trim((string)($_POST[$key] ?? ''));
}

function safe_redirect(string $fallback): string
{
    $redirect = field('redirect');

    if ($redirect === '' || substr($redirect, 0, 2) === '//') {
        return $fallback;
    }

    if ($redirect[0] !== '/') {
        return $fallback;
    }

    return $redirect;
}

$fallbackRedirect = '/thank-you/?lead=diagnostic';
$successRedirect = safe_redirect($fallbackRedirect);
$errorRedirect = preg_replace('/\?.*/', '', $successRedirect) . '?lead=error';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    redirect_to($fallbackRedirect);
}

$name     = field('name');
$phone    = field('phone');
$source   = field('source') ?: 'site_form';
$honeypot = field('website');
$consent  = field('consent');

// Honeypot — тихо отклоняем ботов
if ($honeypot !== '') {
    redirect_to($successRedirect);
}

$phoneDigits = preg_replace('/\D+/', '', $phone) ?? '';
$nameLength  = function_exists('mb_strlen') ? mb_strlen($name) : strlen($name);
$isValidName  = $nameLength >= 2 && $nameLength <= 80;
$isValidPhone = strlen($phoneDigits) >= 10 && strlen($phoneDigits) <= 15;
$hasConsent   = $consent === 'yes';

if (!$isValidName || !$isValidPhone || !$hasConsent) {
    redirect_to($errorRedirect);
}

$createdAt = date('c');
$ip        = $_SERVER['REMOTE_ADDR'] ?? '';
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
$referer   = $_SERVER['HTTP_REFERER'] ?? '';

// ── Email-уведомление ────────────────────────────────────────────────────────
$mailTo      = getenv('LEAD_EMAIL') ?: '';
$mailSubject = 'Новая заявка на диагностику рекламы';
$mailBody    = implode("\n", [
    'Новая заявка с сайта.',
    '',
    'Имя: ' . $name,
    'Телефон: ' . $phone,
    'Источник: ' . $source,
    'Дата: ' . $createdAt,
    'IP: ' . $ip,
    'Referer: ' . $referer,
    'User-Agent: ' . $userAgent,
]);

if (filter_var($mailTo, FILTER_VALIDATE_EMAIL) && substr($mailTo, -12) !== '@example.com') {
    @mail(
        $mailTo,
        '=?UTF-8?B?' . base64_encode($mailSubject) . '?=',
        $mailBody,
        "Content-Type: text/plain; charset=UTF-8\r\nFrom: no-reply@" . ($_SERVER['HTTP_HOST'] ?? 'localhost')
    );
}

// ── Telegram-уведомление ─────────────────────────────────────────────────────
$tgToken   = getenv('TG_BOT_TOKEN') ?: '';
$tgChatIds = array_filter(array_map('trim', explode(',', getenv('TG_CHAT_IDS') ?: '')));
$tgText    = implode("\n", [
    '🦷 Новая заявка на диагностику',
    '',
    '👤 Имя: ' . $name,
    '📞 Телефон: ' . $phone,
    '📅 ' . date('d.m.Y H:i'),
    '🔗 ' . $source,
]);

if ($tgToken && $tgChatIds) {
    foreach ($tgChatIds as $tgChatId) {
        $ch = curl_init('https://api.telegram.org/bot' . $tgToken . '/sendMessage');
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT        => 5,
            CURLOPT_POST           => true,
            CURLOPT_POSTFIELDS     => [
                'chat_id' => $tgChatId,
                'text'    => $tgText,
            ],
        ]);
        curl_exec($ch);
        curl_close($ch);
    }
}

// ── CSV-лог заявок ───────────────────────────────────────────────────────────
$csvPath = getenv('LEADS_CSV_PATH') ?: dirname(__DIR__) . '/leads.csv';
$csvLine = [$createdAt, $name, $phone, $source, $ip, $referer, $userAgent];

$handle = @fopen($csvPath, 'ab');
if ($handle) {
    @flock($handle, LOCK_EX);
    @fputcsv($handle, $csvLine, ';');
    @flock($handle, LOCK_UN);
    @fclose($handle);
}

redirect_to($successRedirect);
