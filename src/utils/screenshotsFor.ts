import type { Theme } from '../context/ThemeContext'
import type { ScreenshotSet } from '../data/projects'

const DARK_THEMES: Theme[] = ['dark', 'blade-runner']

export function screenshotsFor(set: ScreenshotSet, theme: Theme): string[] {
  return DARK_THEMES.includes(theme) ? (set.dark ?? set.light) : set.light
}
