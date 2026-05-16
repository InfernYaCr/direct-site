# Continuation Prompt — Phase 5: Product Page

> Скопируй этот текст в новую сессию Claude Code в директории проекта.

---

## Контекст

Это Astro 5 + TypeScript проект — два шаблона продающих лендингов.

**Главная страница (`index.astro`)** уже готова (Phases 0–4 ✅):
11 секций: Hero → Bridge → Magazine → Donate → Club → Services → Cases → Reviews → Channels → Affiliate → Footer.
JS = 0 байт, CSS = 7.9 KB gzip, astro check 0 errors.

**Текущая задача (Phase 5)**: построить продуктовую страницу по референсу `https://nkorytin.ru/autofunnel` — длинный sales page одного курса/продукта.
Активная ветка: `phase/5-product-page`.

---

## Правила проекта (обязательно соблюдать)

1. **Контент только в `src/content/site.ts`** — добавить экспорт `product` с типизированными интерфейсами. Никакого текста прямо в компонентах.
2. **Токены, не хардкод** — все цвета/отступы через CSS vars из `src/styles/tokens.css`.
3. **Surgical changes** — не трогать существующие компоненты и секции главной страницы.
4. **Атомарные коммиты** — после каждого нового компонента: `feat(product): ProductHero`, `feat(product): ProductPains` и т.д.
5. **astro check** после каждого коммита — 0 errors обязательно.
6. **Адаптив** — breakpoints 375/768/1280, grid items с `min-width: 0`.

---

## Что нужно создать

### 1. Добавить в `src/content/site.ts` экспорт `product`

Типизированные интерфейсы + placeholder-контент для:
- `hero` — заголовок, подзаголовок, CTA href/label, 4 benefit-блока
- `featuredCases[4]` — до/после карточки: `{ niche, before, after, quote }`
- `pains[13]` — `{ title, body }` — боли целевой аудитории
- `solutions` — заголовок + 4 outcome-блока + subpoints
- `notFor[3]` — `{ text }` — кому не подойдёт
- `transformation[6]` — `{ label, before, after }` — карточки до/после
- `author` — `{ name, role, stats: [{n, label}], bio: string[] }`
- `format[6]` — `{ num, title, body }` — пронумерованные 01–06
- `curriculum[8]` — `{ num, title, body }` — модули 01–08
- `results[12]` — `{ title, cta }` — карточки кейсов учеников
- `cta` — `{ heading, body, href, label, bonusTitle, bonusBody }`

### 2. Создать `src/pages/product.astro`

Импортирует `Base.astro` + все компоненты из `src/components/product/` + `Footer` из sections.

### 3. Создать компоненты в `src/components/product/`

| Компонент | Описание |
|---|---|
| `ProductHero.astro` | H1 + подзаголовок + CTA кнопка + 4-col benefits row |
| `ProductFeaturedCases.astro` | 4 карточки до/после в 2-col grid (niche + quote + кнопка) |
| `ProductPains.astro` | Список 13 болей: bullet-кружок + жирный title + описание |
| `ProductSolutions.astro` | "Кому поможет" — 4 outcome-блока + subpoints-список |
| `ProductNotFor.astro` | 3 пункта с иконкой ✗ "кому не подойдёт" |
| `ProductTransformation.astro` | До/после карточки в 2-col grid: серый "до", белый "после" |
| `ProductAuthor.astro` | SVG 2×2 портрет-сетка + stats-chips + bio текст + CTA |
| `ProductFormat.astro` | 6 нумерованных блоков 01–06 в 2-col или 3-col grid |
| `ProductCurriculum.astro` | 8 модулей 01–08: оранжевый номер + title + body |
| `ProductResults.astro` | 12 кейс-карточек в 3-col→2-col→1-col grid |
| `ProductCTA.astro` | Финальный блок: заголовок + body + CTA кнопка + bonus |

---

## Дизайн-детали

**Цвета** (из `tokens.css`):
```
--color-accent: #eb4100       /* CTA кнопки (оранжевый, не синий) */
--color-accent-2: #ffc029     /* нумерация модулей / выделения */
--color-bg-alt: #f5f5f5       /* фон чётных секций */
--color-text-strong: #000000  /* заголовки */
```

**ProductHero**: тёмный фон (`--color-text-strong`), белый текст, оранжевая кнопка.
**ProductPains**: белый фон, каждый пункт — `display: flex`, слева SVG bullet-circle (чёрный), справа `<strong>` + `<p>`.
**ProductTransformation**: 2-col grid. "До" — `background: var(--color-bg-alt)`, сверху метка "ДО" muted. "После" — белый фон, зелёная метка "ПОСЛЕ" (`#22c55e`).
**ProductAuthor**: тёмный фон, SVG 2×2 портрет-сетка (placeholder), stats-chips оранжевые.
**ProductFormat**: сетка 2 col, каждый блок — большой оранжевый номер `01` + title + body.
**ProductCurriculum**: сетка 2-col→1-col, оранжевый номер, жирный title, muted body.
**ProductResults**: 3-col→2-col→1-col, каждая карточка — тёмный заголовок + кнопка "ЧИТАТЬ" (ghost variant).

---

## Порядок выполнения

1. Прочитай `src/content/site.ts` (весь файл).
2. Добавь экспорт `product` с интерфейсами и placeholder-контентом.
3. Создай `src/pages/product.astro` (импорты без содержимого секций пока).
4. Строй компоненты по одному в порядке: Hero → FeaturedCases → Pains → Solutions → NotFor → Transformation → Author → Format → Curriculum → Results → CTA.
5. После каждого компонента: добавь его в `product.astro`, запусти `npx astro check`, коммит.
6. После всех: `npm run build`, проверь 375/768/1280 через preview MCP.
7. Мерж `phase/5-product-page` в `main`.

---

## Ссылки на ключевые файлы

- `src/content/site.ts` — добавить `product` экспорт
- `src/styles/tokens.css` — все CSS vars
- `src/components/ui/Button.astro` — переиспользовать для CTA
- `src/components/sections/Footer.astro` — переиспользовать в product.astro
- `docs/PLAN.md` — полный план с критериями готовности
- `CLAUDE.md` — правила проекта
