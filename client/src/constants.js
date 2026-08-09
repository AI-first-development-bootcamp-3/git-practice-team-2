export const PRIORITY_LEVELS = {
  low: { label: 'Low', color: '#22c55e', icon: '▽' },
  medium: { label: 'Medium', color: '#f59e0b', icon: '◆' },
  high: { label: 'High', color: '#ef4444', icon: '▲' },
};

export const PRIORITY_OPTIONS = Object.keys(PRIORITY_LEVELS);

const TAG_PALETTE = [
  '#6366f1', '#8b5cf6', '#ec4899', '#14b8a6',
  '#f97316', '#06b6d4', '#84cc16', '#e11d48',
  '#0ea5e9', '#a855f7',
];

export function getTagColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0;
  }
  return TAG_PALETTE[Math.abs(hash) % TAG_PALETTE.length];
}
