import type { Language } from '../i18n/translations'

export interface LanguageOption {
  code: Language
  label: string
}

export const languageOptions: readonly LanguageOption[] = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'pt', label: 'PT' },
]
