import type { Language, Translations } from './types'
import { en } from './en'
import { es } from './es'
import { pt } from './pt'

export type { Language, Translations }

export const translations: Record<Language, Translations> = { en, es, pt }
