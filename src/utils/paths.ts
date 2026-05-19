const base = import.meta.env.BASE_URL;
const normalizedBase = base.endsWith('/') ? base : `${base}/`;

export function withBase(path: string | undefined): string | undefined {
  if (!path) return path;
  if (
    path.startsWith('#') ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:') ||
    path.startsWith('http://') ||
    path.startsWith('https://')
  ) {
    return path;
  }

  return `${normalizedBase}${path.replace(/^\/+/, '')}`;
}
