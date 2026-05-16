// Single source of truth for all site content.
// To replace placeholders with real content, edit this file only.
// Components are content-agnostic: they only render data from here.

export interface Product {
  id: string;
  title: string;
  blurb: string;
  cta: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  formCta: string;
}

export interface CaseItem {
  id: string;
  result: string;
  thumb?: string; // path in public/
}

export interface Review {
  id: string;
  thumb?: string; // path in public/
  alt: string;
}

export interface Channel {
  id: string;
  title: string;
  cta: string;
  href: string;
  thumb?: string;
}

export interface ChannelGroup {
  heading: string;
  channels: Channel[];
}

export interface NavLink {
  label: string;
  href: string;
}

// ─── Metadata ───────────────────────────────────────────────────────────────

export const meta = {
  title: 'Официальный сайт [Имя Эксперта]',
  description:
    'Продающий лендинг эксперта. Программы, материалы, кейсы, консультации.',
  lang: 'ru',
  ogImage: '/placeholder/og.png',
} as const;

// ─── Hero ────────────────────────────────────────────────────────────────────

export const hero = {
  brandName: '[Имя Эксперта]',
  tagline: 'Первый проект в нише, который работает по стратегии, а не по тактикам',
  programLabel: 'Открыт набор в программу',
  programTitle: 'Флагманская программа по системным продажам',
  cta: { label: 'Подробнее', href: '#' },
} as const;

// ─── Bridge ──────────────────────────────────────────────────────────────────

export const bridge = {
  heading: 'Давай по порядку',
} as const;

// ─── Magazine (lead magnet) ───────────────────────────────────────────────────

export const magazine = {
  heading: 'Бесплатный журнал — печатный + электронный',
  body: 'Доставляем по России. Электронная версия доступна везде.',
  formCta: 'Забрать журнал',
  formPlaceholder: 'Ваш email',
} as const;

// ─── Donate products ─────────────────────────────────────────────────────────

export const donate = {
  heading: 'Продукты за донат',
  products: [
    {
      id: 'product-1',
      title: 'Как запускать фильмы в голове у читающего',
      blurb:
        'Почему блогеры делают запуски на десятки миллионов, а другие нет — и как это исправить.',
      cta: 'Забрать за донат',
    },
    {
      id: 'product-2',
      title: 'Увеличь чек в 2 раза за один вечер',
      blurb:
        'Навык продажи идеи и донесения ценности. Уже завтра сможешь заработать вдвое больше.',
      cta: 'Забрать за донат',
    },
    {
      id: 'product-3',
      title: '13 постов, каждый из которых продал на 100–800 тыс.',
      blurb:
        'Как продавать, ничего не обещая аудитории, — и чтобы не возникало возражений.',
      cta: 'Забрать за донат',
    },
  ] satisfies Product[],
} as const;

// ─── Club ────────────────────────────────────────────────────────────────────

export const club = {
  heading: 'Закрытый клуб для экспертов и продюсеров',
  body: 'Как в 2026 году эксперту выйти на системный доход без выгорания.',
  cta: { label: 'Зайти в клуб', href: '#' },
} as const;

// ─── Services ────────────────────────────────────────────────────────────────

export const services = {
  heading: 'Услуги',
  note: 'На консалтинг/личную работу можно попасть ТОЛЬКО через консультацию',
  items: [
    {
      id: 'consultation',
      title: 'Консультация',
      description: 'Персональная консультация с владельцем продюсерского центра.',
      formCta: 'Записаться на консультацию',
    },
    {
      id: 'audit',
      title: 'Аудит воронки',
      description: 'Аудит воронки или запуска в вашем проекте.',
      formCta: 'Записаться на аудит',
    },
  ] satisfies Service[],
} as const;

// ─── Cases ───────────────────────────────────────────────────────────────────

export const cases = {
  heading: 'Кейсы',
  items: Array.from({ length: 12 }, (_, i) => ({
    id: `case-${i + 1}`,
    result: `Результат клиента ${i + 1}`,
    thumb: undefined,
  })) satisfies CaseItem[],
} as const;

// ─── Reviews ─────────────────────────────────────────────────────────────────

export const reviews = {
  heading: 'Что люди говорят о продуктах',
  items: Array.from({ length: 9 }, (_, i) => ({
    id: `review-${i + 1}`,
    alt: `Отзыв ${i + 1}`,
    thumb: undefined,
  })) satisfies Review[],
} as const;

// ─── Channels ────────────────────────────────────────────────────────────────

export const channels = {
  groups: [
    {
      heading: 'Каналы автора',
      channels: [
        { id: 'ch-1', title: 'Главный канал (стратегия и продажи)', cta: 'Подписаться', href: '#' },
        { id: 'ch-2', title: 'О личном', cta: 'Подписаться', href: '#' },
        { id: 'ch-3', title: 'Физический журнал', cta: 'Подписаться', href: '#' },
        { id: 'ch-4', title: 'Работа с базой', cta: 'Подписаться', href: '#' },
      ],
    },
    {
      heading: 'Каналы с отзывами',
      channels: [
        { id: 'rev-1', title: 'Отзывы о флагманской программе', cta: 'Смотреть', href: '#' },
        { id: 'rev-2', title: 'Отзывы о клубе', cta: 'Смотреть', href: '#' },
        { id: 'rev-3', title: 'Отзывы о личной работе', cta: 'Смотреть', href: '#' },
      ],
    },
  ] satisfies ChannelGroup[],
} as const;

// ─── Affiliate ───────────────────────────────────────────────────────────────

export const affiliate = {
  heading: 'Партнёрская программа',
  body: 'Зарабатывай до 10% от стоимости курса, рекомендуя его друзьям. И давай им скидку.',
  cta: { label: 'Зарегистрироваться', href: '#' },
} as const;

// ─── Footer ──────────────────────────────────────────────────────────────────

export const footer = {
  email: 'info@example.com',
  telegram: 'https://t.me/username',
  telegramLabel: 'Личный Telegram',
  policies: [
    { label: 'Политика обработки персональных данных', href: '#' },
    { label: 'Политика конфиденциальности', href: '#' },
  ] satisfies NavLink[],
  offers: Array.from({ length: 7 }, (_, i) => ({
    label: `Публичная оферта ${i + 1}`,
    href: '#',
  })) satisfies NavLink[],
} as const;

// ─── Cookie banner ───────────────────────────────────────────────────────────

export const cookie = {
  text: 'Мы используем файлы cookie. Продолжая пользоваться сайтом, вы соглашаетесь с нашей',
  policyLabel: 'политикой конфиденциальности',
  policyHref: '#',
  acceptLabel: 'Принять',
} as const;
