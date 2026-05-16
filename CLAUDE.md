# CLAUDE.md — direct site

## Что это

Два шаблона продающих лендингов на **Astro + TypeScript**:

1. **Главная (`index.astro`)** — многосекционный хаб эксперта.
   Референс: `https://nkorytin.ru/` ✅ **Готово (Phases 0–4)**
2. **Продуктовая (`product.astro`)** — длинный sales page одного курса.
   Референс: `https://nkorytin.ru/autofunnel` 🔄 **В работе (Phase 5)**

Контент — **плейсхолдеры**; реальные тексты/ассеты заменяются правкой
`src/content/site.ts`.

Ключевые документы: `docs/PLAN.md` (статус, фазы, критерии),
`docs/PROMPT_CONTINUE.md` (prompt для продолжения Phase 5),
`docs/RESEARCH.md` (анализ референса), `docs/CONTENT.md` (модель контента).

## Стек и решения (зафиксированы)

- Astro + TypeScript (strict), статика, near-zero JS.
- Стилизация: CSS + дизайн-токены в `src/styles/tokens.css`. Без хардкода палитры.
- Шрифт: **Onest** (self-host, свободная замена платного Qanelas).
- Формы — **UI-заглушки** без сети (`preventDefault`, локальный success-state).
- Контент-агностичные компоненты: рендер только из `src/content/site.ts`.

## Дизайн-токены (canonical)

```
--color-bg #ffffff  --color-bg-alt #f5f5f5  --color-bg-alt-2 #f9f9f9
--color-text #1c1c1c  --color-text-strong #000000
--color-accent #eb4100  --color-accent-hover #d1290e  --color-accent-2 #ffc029
--color-overlay rgba(0,0,0,0.30)
```
Тема светлая. Не вводить тёмную тему без запроса.

## Архитектура

```
src/content/site.ts        — единственный источник контента (index + product)
src/layouts/Base.astro     — head, шрифты, токены, cookie, slot
src/components/
├── sections/              — 11 секций главной (Hero…Footer)
├── product/               — 11 компонентов продуктовой страницы [Phase 5]
└── ui/                    — Button, Card, SectionHeading, LeadForm, CookieBanner
src/styles/                — tokens.css, typography.css, global.css
src/pages/
├── index.astro            — главная (hub-лендинг) ✅
└── product.astro          — продуктовый sales page 🔄
```

Секции главной: Hero → Bridge → Magazine → Donate → Club →
Services → Cases → Reviews → Channels → Affiliate → Footer.

Секции продуктовой: ProductHero → ProductFeaturedCases → ProductPains →
ProductSolutions → ProductNotFor → ProductTransformation → ProductAuthor →
ProductFormat → ProductCurriculum → ProductResults → ProductCTA → Footer.

## Правила работы

- **Surgical changes.** Меняй только то, что требует задача. Не рефактори
  соседний код, не «улучшай» то, что не просили.
- **Simplicity first.** Минимум кода под задачу. Никаких абстракций ради
  гибкости, которую не просили. Лендинг — не фреймворк.
- **Контент только в `site.ts`.** Никакого текста-плейсхолдера, зашитого в
  разметку секций. Замена контента должна сводиться к правке одного файла.
- **Токены, не магические значения.** Цвета/типошкала/отступы — через CSS-vars
  и `clamp()`. Хардкод `#eb4100` в компоненте = ошибка.
- **Анимируем только compositor-friendly** свойства (`transform`, `opacity`).
  Никаких анимаций `width/height/top/left/margin`.
- **Семантика и a11y.** `header/main/section/footer`, видимый focus,
  `prefers-reduced-motion`, alt-тексты, контраст AA.
- **Производительность.** JS-бюджет лендинга < 80 KB gzip. Картинки через
  Astro `<Image>` с явными размерами. Шрифт — preload только основного веса.
- **Не копировать** платный Qanelas, изображения с tildacdn, тексты/бренд
  Корытина дословно. Контент референса = временный плейсхолдер.

## Definition of Done для секции

1. Рендерится из `site.ts`, ноль зашитого контента.
2. Адаптив 320/375/768/1024/1440 без горизонтального скролла.
3. Состояния hover/focus/active у интерактива, доступны с клавиатуры.
4. Визуально сверена со скриншотом соответствующей секции референса.
5. `astro check` чистый, атомарный коммит `feat(<section>): ...`.

## Команды

```
npm run dev          # дев-сервер
npm run build        # прод-сборка (должна быть зелёной)
npx astro check      # строгая проверка типов/шаблонов
```

## Git

- Ветка под работу, не прямой коммит в `main`.
- Conventional commits: `feat(hero): ...`, `fix(forms): ...`, `chore: ...`.
- Атрибуция в коммитах отключена (глобальный конфиг). Коммитить только по
  явной просьбе пользователя.

## Язык

Общение с пользователем — на русском. Код, идентификаторы, коммиты — англ.
