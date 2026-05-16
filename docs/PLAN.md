# PLAN — лендинг по референсу nkorytin.ru

## Цель

Два шаблона на стеке **Astro + TypeScript**:
1. **Главная (hub-лендинг)** — `src/pages/index.astro` — многосекционный хаб эксперта (референс: `nkorytin.ru/`).
2. **Продуктовая страница** — `src/pages/product.astro` — длинный sales page одного курса (референс: `nkorytin.ru/autofunnel`).

Контент — плейсхолдеры. Замена = правка `src/content/site.ts`.

---

## Зафиксированные решения

| Вопрос | Решение |
|---|---|
| Стек | Astro 5.18.1 + TypeScript strict, статика, near-zero JS |
| Шрифт | Onest Variable (OFL, самохост) — замена платного Qanelas |
| Формы | UI-заглушки (preventDefault, success-state, без сети) |
| Контент | Единый `src/content/site.ts`, все компоненты контент-агностичны |
| Стилизация | CSS custom properties в `src/styles/tokens.css`, без хардкода |

## Не-цели (вне объёма)

- Реальная отправка форм / бэкенд / CRM.
- CMS, мультиязычность, блог, личный кабинет, оплата.
- Копирование текстов/фото Корытина дословно.

---

## Статус по фазам

| Фаза | Статус | Ветка | Коммит |
|---|---|---|---|
| 0 — Scaffold | ✅ Done | `phase/0-scaffold` | `762f8b0` |
| 1 — UI Primitives | ✅ Done | `phase/1-ui-primitives` | `b7d5653` |
| 2 — Sections (index) | ✅ Done | `phase/2-sections` | `33dfc0b` |
| 3 — Adaptive polish | ✅ Done | `phase/3-adaptive` | `633a605` |
| 4 — Lighthouse audit | ✅ Done | `phase/4-lighthouse` | `3693c9a` |
| 5 — Product page | 🔄 In progress | `phase/5-product-page` | — |

### Что готово (Phase 0–4)

**Главная страница (`index.astro`)** — 11 секций:
`Hero → Bridge → Magazine → Donate → Club → Services → Cases → Reviews → Channels → Affiliate → Footer`

**Метрики:**
- JS: 0 байт · CSS: 7.9 KB gzip · font-display:swap на 4 subset'ах
- Все гриды проверены: 320/375/768/1024/1280px без overflow
- A11y: H1→H2→H3, aria-labelledby, alt, lang="ru", theme-color
- `astro check`: 0 errors, 0 warnings, 0 hints
- `astro build`: ✅

---

## Phase 5 — Продуктовая страница (текущая задача)

### Референс

`https://nkorytin.ru/autofunnel` — длинный sales page курса "Система автопродаж".

### Новые файлы

```
src/
├── pages/product.astro                       ← точка входа
└── components/product/
    ├── ProductHero.astro                     ← USP + headline + CTA + 4-col benefits
    ├── ProductFeaturedCases.astro            ← 4 карточки до/после
    ├── ProductPains.astro                    ← 13 болей с иконками
    ├── ProductSolutions.astro               ← "кому поможет" 4 блока + подпункты
    ├── ProductNotFor.astro                  ← 3 пункта "кому не подойдёт"
    ├── ProductTransformation.astro          ← 5–7 карточек до/после в 2-col grid
    ├── ProductAuthor.astro                  ← об авторе: фото-сетка + цифры
    ├── ProductFormat.astro                  ← 6 нумерованных блоков формата
    ├── ProductCurriculum.astro              ← 8 модулей программы
    ├── ProductResults.astro                 ← 12 кейсов учеников
    └── ProductCTA.astro                     ← финальный CTA + форма (stub) + бонус
```

### Дополнение `site.ts`

Добавить экспорт `product` с типизированными интерфейсами и плейсхолдерами для:
`hero`, `featuredCases[4]`, `pains[13]`, `solutions`, `notFor[3]`,
`transformation[6]`, `author`, `format[6]`, `curriculum[8]`, `results[12]`, `cta`

### Дизайн продуктовой страницы

Те же дизайн-токены. Ключевые отличия от главной:
- **Акцент**: оранжевый (`--color-accent`) — не синий как в референсе
- **CTA кнопка** повторяется 4–5 раз (sticky не нужен — stub)
- **Боли**: чёрные bullet-кружки слева, жирный заголовок + описание
- **До/После карточки**: серый фон "до", белый с зелёным акцентом "после"
- **Автор**: SVG-заглушка 2×2 сетки портретов + stats-chips
- **Модули**: нумерованные карточки `01–08` с оранжевым номером

### Критерии готовности Phase 5

- [ ] `astro check` 0 errors после добавления нового кода
- [ ] `astro build` зелёный
- [ ] Все компоненты рендерятся из `site.ts` (нет зашитого контента)
- [ ] Адаптив: 375/768/1280 без overflow
- [ ] Семантика: H1 (один), правильная иерархия H2→H3
- [ ] Коммиты атомарные: `feat(product): ProductHero`, `feat(product): ProductPains` и т.д.
- [ ] Мерж в `main` после завершения

---

## Архитектура (итоговая)

```
src/content/site.ts          ← единый источник контента
src/layouts/Base.astro       ← head, шрифты, токены, slot
src/components/
├── sections/                ← 11 секций главной страницы
├── product/                 ← 11 секций продуктовой страницы  [NEW]
└── ui/                      ← Button, Card, SectionHeading, LeadForm, CookieBanner
src/styles/                  ← tokens.css, typography.css, global.css
src/pages/
├── index.astro              ← главная (hub-лендинг)
└── product.astro            ← продуктовая страница [NEW]
public/placeholder/          ← SVG-плейсхолдеры
```

---

## Дизайн-токены (canonical)

```
--color-bg #ffffff       --color-bg-alt #f5f5f5     --color-bg-alt-2 #f9f9f9
--color-text #1c1c1c     --color-text-strong #000    --color-text-muted rgba(0,0,0,0.55)
--color-accent #eb4100   --color-accent-hover #d1290e --color-accent-2 #ffc029
```

## Команды

```bash
npm run dev          # дев-сервер
npm run build        # прод-сборка
npx astro check      # проверка типов и шаблонов
```

## Git

Conventional commits: `feat(product): ...`, `fix(product): ...`
Ветка: `phase/5-product-page` → мерж в `main` атомарными PR.
