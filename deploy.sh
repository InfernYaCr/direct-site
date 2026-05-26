#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# deploy.sh — сборка и FTP-деплой на rosa-zagrebin.ru
#
# Использование:
#   ./deploy.sh
#
# Переменные окружения (задать в .env.local или экспортировать в терминале):
#   FTP_HOST   — хост FTP (например: ftp.yourhoster.ru или IP)
#   FTP_USER   — логин FTP (yourkedm_direct)
#   FTP_PASS   — пароль FTP
#   FTP_DIR    — удалённый путь (по умолчанию /direkt/public_html/)
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

# ── Загрузить .env.local если он есть ────────────────────────────────────────
if [ -f ".env.local" ]; then
  # shellcheck disable=SC2046
  export $(grep -v '^#' .env.local | xargs)
fi

# ── Проверить обязательные переменные ────────────────────────────────────────
: "${FTP_HOST:?Укажите FTP_HOST в .env.local}"
: "${FTP_USER:?Укажите FTP_USER в .env.local}"
: "${FTP_PASS:?Укажите FTP_PASS в .env.local}"
FTP_DIR="${FTP_DIR:-/direkt/public_html/}"

# ── Сборка ───────────────────────────────────────────────────────────────────
echo "▶ Сборка проекта..."
SITE_URL="https://rosa-zagrebin.ru" BASE_PATH="/" npm run build

echo "✓ Сборка завершена: $(du -sh dist/ | cut -f1) → dist/"

# ── FTP-деплой через lftp ────────────────────────────────────────────────────
if ! command -v lftp &> /dev/null; then
  echo "✗ lftp не установлен. Установите: brew install lftp (macOS) или apt install lftp (Ubuntu)"
  exit 1
fi

echo "▶ Загрузка на FTP $FTP_HOST → $FTP_DIR ..."

lftp -c "
  set ftp:ssl-allow no;
  set net:timeout 30;
  set net:max-retries 3;
  open ftp://$FTP_USER:$FTP_PASS@$FTP_HOST;
  mirror --reverse --delete --verbose --parallel=4 \
    --exclude='.DS_Store' \
    --exclude='.env*' \
    dist/ $FTP_DIR;
  bye
"

echo "✓ Деплой завершён → https://rosa-zagrebin.ru"
