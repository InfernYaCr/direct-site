# Direct Site

Astro + TypeScript шаблон продающего сайта эксперта с двумя страницами:

- `/` — главная страница-хаб с офферами, кейсами, отзывами и футером.
- `/product` — продуктовая sales page по структуре референса с hero, кейсами, болями, программой, бонусом и CTA.

Контент сейчас плейсхолдерный. Все тексты, ссылки и данные секций меняются в одном файле: `src/content/site.ts`.

## Стек

- Astro 5
- TypeScript
- CSS custom properties
- Onest Variable через `@fontsource-variable/onest`
- Статическая сборка без клиентского JS для страниц

## Установка

```bash
npm install
```

## Локальный запуск

```bash
npm run dev -- --host 127.0.0.1
```

После запуска Astro покажет локальный адрес, обычно:

```text
http://127.0.0.1:4321/
```

Основные страницы:

```text
http://127.0.0.1:4321/
http://127.0.0.1:4321/product
```

Если порт `4321` занят, Astro автоматически предложит следующий порт, например `4322`.

## Проверка и сборка

Проверка Astro/TypeScript:

```bash
npm run check
```

Production build:

```bash
npm run build
```

Локальный просмотр production-сборки:

```bash
npm run preview -- --host 127.0.0.1
```

## Структура проекта

```text
src/
  content/site.ts              # единый источник контента
  layouts/Base.astro           # базовый layout, head, стили
  pages/index.astro            # главная страница
  pages/product.astro          # продуктовая страница
  components/
    sections/                  # секции главной страницы
    product/                   # секции продуктовой страницы
    ui/                        # UI-примитивы
  styles/
    tokens.css                 # дизайн-токены
    typography.css
    global.css
```

## Где менять контент

Основной файл:

```text
src/content/site.ts
```

В нём находятся:

- `meta` — title, description, язык, OG.
- `hero`, `bridge`, `magazine`, `donate`, `club`, `services`, `cases`, `reviews`, `channels`, `affiliate`, `footer`, `cookie` — контент главной.
- `product` — весь контент продуктовой страницы `/product`.

Компоненты рассчитаны на то, что финальные тексты и ссылки заменяются в `site.ts`, без правки вёрстки.

## Деплой на GitHub

Проект подготовлен для GitHub Pages через GitHub Actions.

После успешного workflow сайт будет доступен по адресу:

```text
https://infernyacr.github.io/direct-site/
```

Основные страницы на хостинге:

```text
https://infernyacr.github.io/direct-site/
https://infernyacr.github.io/direct-site/product
https://infernyacr.github.io/direct-site/privacy
https://infernyacr.github.io/direct-site/policyopd
https://infernyacr.github.io/direct-site/oferta/avtovoronki
```

В настройках репозитория GitHub нужно открыть `Settings → Pages` и выбрать `Source: GitHub Actions`.

Если remote ещё не настроен:

```bash
git remote add origin https://github.com/InfernYaCr/direct-site.git
```

Проверить remote:

```bash
git remote -v
```

После коммита отправить ветку:

```bash
git push -u origin phase/5-product-page
```

Для публикации статической сборки используйте содержимое папки `dist/`, которая создаётся командой:

```bash
npm run build
```
