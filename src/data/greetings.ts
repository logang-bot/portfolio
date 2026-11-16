import type { Language } from '../i18n/types'

export interface Greeting {
  text: string
  emoji: string
}

export const greetings: Record<Language, Greeting[]> = {
  en: [
    { text: 'Hi', emoji: '👋' },
    { text: 'Hey', emoji: '🤙' },
    { text: 'Hello', emoji: '✌️' },
    { text: 'Hi there', emoji: '😊' },
    { text: 'Howdy', emoji: '🤠' },
    { text: 'Hey there', emoji: '🖐️' },
  ],
  es: [
    { text: 'Hola', emoji: '👋' },
    { text: 'Hey', emoji: '🤙' },
    { text: 'Qué tal', emoji: '✌️' },
    { text: 'Buenas', emoji: '😊' },
    { text: 'Hola', emoji: '🖐️' },
    { text: 'Hey', emoji: '🤠' },
  ],
  pt: [
    { text: 'Olá', emoji: '👋' },
    { text: 'E aí', emoji: '🤙' },
    { text: 'Oi', emoji: '✌️' },
    { text: 'Hey', emoji: '😊' },
    { text: 'Olá', emoji: '🖐️' },
    { text: 'Oi', emoji: '🤠' },
  ],
}

export const greetingConnectors: Record<Language, string> = {
  en: ", I'm",
  es: ', soy',
  pt: ', eu sou',
}
