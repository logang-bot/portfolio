export type IconName =
  | 'mail'
  | 'github'
  | 'linkedin'
  | 'sun'
  | 'moon'
  | 'chevronLeft'
  | 'chevronRight'
  | 'close'
  | 'check'
  | 'cornerLeftUp'
  | 'hamburger'
  | 'cupSoda'
  | 'cigarette'
  | 'keyRound'
  | 'briefcase'
  | 'banknote'
  | 'watch'
  | 'cassetteTape'
  | 'glasses'
  | 'car'
  | 'motorbike'
  | 'sparkles'
  | 'layers'
  | 'workflow'
  | 'smartphone'

export type IconShape =
  | { kind: 'path'; d: string }
  | { kind: 'rect'; x: number; y: number; width: number; height: number; rx?: number }
  | { kind: 'circle'; cx: number; cy: number; r: number }

export const iconShapes: Record<IconName, IconShape[]> = {
  mail: [
    { kind: 'path', d: 'm22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7' },
    { kind: 'rect', x: 2, y: 4, width: 20, height: 16, rx: 2 },
  ],
  github: [
    {
      kind: 'path',
      d: 'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4',
    },
    { kind: 'path', d: 'M9 18c-4.51 2-5-2-7-2' },
  ],
  linkedin: [
    { kind: 'path', d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' },
    { kind: 'rect', x: 2, y: 9, width: 4, height: 12 },
    { kind: 'circle', cx: 4, cy: 4, r: 2 },
  ],
  sun: [
    { kind: 'circle', cx: 12, cy: 12, r: 4 },
    { kind: 'path', d: 'M12 2v2M12 20v2m-7.07-17.07 1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41' },
  ],
  moon: [{ kind: 'path', d: 'M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' }],
  chevronLeft: [{ kind: 'path', d: 'm15 18-6-6 6-6' }],
  chevronRight: [{ kind: 'path', d: 'm9 18 6-6-6-6' }],
  close: [{ kind: 'path', d: 'M18 6 6 18M6 6l12 12' }],
  check: [{ kind: 'path', d: 'M20 6 9 17l-5-5' }],
  cornerLeftUp: [{ kind: 'path', d: 'M14 9 9 4 4 9' }, { kind: 'path', d: 'M20 20h-7a4 4 0 0 1-4-4V4' }],
  hamburger: [
    { kind: 'path', d: 'M12 16H4a2 2 0 1 1 0-4h16a2 2 0 1 1 0 4h-4.25' },
    { kind: 'path', d: 'M5 12a2 2 0 0 1-2-2 9 7 0 0 1 18 0 2 2 0 0 1-2 2' },
    { kind: 'path', d: 'M5 16a2 2 0 0 0-2 2 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 2 2 0 0 0-2-2q0 0 0 0' },
    { kind: 'path', d: 'm6.67 12 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2' },
  ],
  cupSoda: [
    { kind: 'path', d: 'm6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8' },
    { kind: 'path', d: 'M5 8h14' },
    { kind: 'path', d: 'M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0' },
    { kind: 'path', d: 'm12 8 1-6h2' },
  ],
  cigarette: [
    { kind: 'path', d: 'M17 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14' },
    { kind: 'path', d: 'M18 8c0-2.5-2-2.5-2-5' },
    { kind: 'path', d: 'M21 16a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1' },
    { kind: 'path', d: 'M22 8c0-2.5-2-2.5-2-5' },
    { kind: 'path', d: 'M7 12v4' },
  ],
  keyRound: [
    { kind: 'path', d: 'M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z' },
    { kind: 'circle', cx: 16.5, cy: 7.5, r: .5 },
  ],
  briefcase: [
    { kind: 'path', d: 'M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16' },
    { kind: 'rect', x: 2, y: 6, width: 20, height: 14, rx: 2 },
  ],
  banknote: [
    { kind: 'rect', x: 2, y: 6, width: 20, height: 12, rx: 2 },
    { kind: 'circle', cx: 12, cy: 12, r: 2 },
    { kind: 'path', d: 'M6 12h.01M18 12h.01' },
  ],
  watch: [
    { kind: 'path', d: 'M12 10v2.2l1.6 1' },
    { kind: 'path', d: 'm16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05' },
    { kind: 'path', d: 'm7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05' },
    { kind: 'circle', cx: 12, cy: 12, r: 6 },
  ],
  cassetteTape: [
    { kind: 'rect', x: 2, y: 4, width: 20, height: 16, rx: 2 },
    { kind: 'circle', cx: 8, cy: 10, r: 2 },
    { kind: 'path', d: 'M8 12h8' },
    { kind: 'circle', cx: 16, cy: 10, r: 2 },
    { kind: 'path', d: 'm6 20 .7-2.9A1.4 1.4 0 0 1 8.1 16h7.8a1.4 1.4 0 0 1 1.4 1l.7 3' },
  ],
  glasses: [
    { kind: 'circle', cx: 6, cy: 15, r: 4 },
    { kind: 'circle', cx: 18, cy: 15, r: 4 },
    { kind: 'path', d: 'M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2' },
    { kind: 'path', d: 'M2.5 13 5 7c.7-1.3 1.4-2 3-2' },
    { kind: 'path', d: 'M21.5 13 19 7c-.7-1.3-1.5-2-3-2' },
  ],
  car: [
    { kind: 'path', d: 'M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2' },
    { kind: 'circle', cx: 7, cy: 17, r: 2 },
    { kind: 'path', d: 'M9 17h6' },
    { kind: 'circle', cx: 17, cy: 17, r: 2 },
  ],
  motorbike: [
    { kind: 'path', d: 'm18 14-1-3' },
    { kind: 'path', d: 'm3 9 6 2a2 2 0 0 1 2-2h2a2 2 0 0 1 1.99 1.81' },
    { kind: 'path', d: 'M8 17h3a1 1 0 0 0 1-1 6 6 0 0 1 6-6 1 1 0 0 0 1-1v-.75A5 5 0 0 0 17 5' },
    { kind: 'circle', cx: 19, cy: 17, r: 3 },
    { kind: 'circle', cx: 5, cy: 17, r: 3 },
  ],
  sparkles: [
    { kind: 'path', d: 'M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z' },
    { kind: 'path', d: 'M20 3v4' },
    { kind: 'path', d: 'M22 5h-4' },
    { kind: 'path', d: 'M4 17v2' },
    { kind: 'path', d: 'M5 18H3' },
  ],
  layers: [
    { kind: 'path', d: 'M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z' },
    { kind: 'path', d: 'M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12' },
    { kind: 'path', d: 'M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17' },
  ],
  workflow: [
    { kind: 'rect', x: 3, y: 3, width: 8, height: 8, rx: 2 },
    { kind: 'path', d: 'M7 11v4a2 2 0 0 0 2 2h4' },
    { kind: 'rect', x: 13, y: 13, width: 8, height: 8, rx: 2 },
  ],
  smartphone: [
    { kind: 'rect', x: 5, y: 2, width: 14, height: 20, rx: 2 },
    { kind: 'path', d: 'M12 18h.01' },
  ],
}
