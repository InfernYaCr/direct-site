# Direct Site — Лендинг для стоматологических клиник

Лендинг для агентства Ростислава Кочерова — продаёт услугу настройки рекламы для стоматологических клиник. Генерирует заявки на бесплатную 30-минутную диагностику рекламного кабинета по методу «Умный навигатор».

**Живой сайт:** [rosa-zagrebin.ru](https://rosa-zagrebin.ru)

---

## Стек

| Слой | Технология |
|------|-----------|
| Фреймворк | [Astro 5](https://astro.build) — статическая генерация |
| Стили | Vanilla CSS (CSS Custom Properties, `clamp()`) |
| Изображения | `astro:assets` → WebP-оптимизация при сборке |
| Форма | PHP-обработчик (`send-lead.php`) |
| Уведомления | Email (`mail()`) + Telegram Bot API (через `curl`) |
| Деплой | FTP через `lftp` |

---

## Локальный запуск

```bash
npm install
npm run dev
```

Сайт откроется на `http://localhost:4321`.

---

## Сборка и деплой

```bash
# Только сборка
npm run build

# Сборка + деплой на FTP
bash deploy.sh
```

`deploy.sh` читает переменные из `.env.local`. Создайте файл по примеру:

```env
FTP_HOST=ftp.yourhoster.ru
FTP_USER=your_ftp_login
FTP_PASS=your_ftp_password
FTP_DIR=/public_html/
```

---

## Обработчик форм

Все формы отправляются на `send-lead.php`. Этот файл **не хранится в репозитории** — в нём реальные токены уведомлений.

**Настройка:**

1. Скопируйте шаблон:
   ```bash
   cp public/send-lead.example.php public/send-lead.php
   ```

2. Задайте переменные окружения на сервере (через панель хостинга или `.htaccess`):

   | Переменная | Описание |
   |------------|---------|
   | `LEAD_EMAIL` | Email для уведомлений о заявках |
   | `TG_BOT_TOKEN` | Токен Telegram-бота (получить у @BotFather) |
   | `TG_CHAT_IDS` | chat_id получателей через запятую: `111111,222222` |
   | `LEADS_CSV_PATH` | Путь к CSV-файлу для логирования (опционально) |

   Пример для `.htaccess`:
   ```apache
   SetEnv LEAD_EMAIL you@example.com
   SetEnv TG_BOT_TOKEN 123456789:AAxxxxxx
   SetEnv TG_CHAT_IDS 111111,222222
   ```

---

## Структура проекта

```
src/
├── assets/          # Исходники изображений (оптимизируются при сборке)
├── components/
│   └── landing/     # Секции лендинга
├── data/
│   └── site.ts      # Константы сайта (домен, email, тексты)
├── layouts/
│   └── BaseLayout.astro
├── pages/           # index.astro, thank-you.astro, 404.astro…
└── styles/
    └── global.css   # Все стили

public/
├── images/                    # Статические изображения
├── send-lead.example.php      # Шаблон обработчика форм
└── send-lead.php              # Реальный обработчик (не в git)

deploy.sh                      # FTP-деплой через lftp
```

---

## Секции лендинга

| Секция | Компонент | Описание |
|--------|-----------|---------|
| Hero | `HeroSection.astro` | Заголовок, подзаголовок, CTA-кнопка |
| Боли | `PainSection.astro` | Карточки с болями владельца клиники |
| Метод | `MethodSection.astro` | Описание подхода «Умный навигатор» |
| Результаты | `ResultsSection.astro` | Кейсы и цифры |
| Процесс | `ProcessSection.astro` | Шаги работы |
| Диагностика | `DiagnosticOfferSection.astro` | Форма заявки + скриншот разбора |
| Финальный CTA | `FinalCta.astro` | Финальная форма внизу страницы |

---

## Аналитика

Подключена Яндекс.Метрика. Цель `lead_submit` срабатывает на странице `/thank-you/` только при переходе с формы (параметр `?lead=` в URL). Прямое открытие страницы цель не считает.
