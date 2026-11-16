import { useTheme } from '../../context/ThemeContext'
import BladeRunnerBackground from './BladeRunnerBackground'
import PulpFictionBackground from './PulpFictionBackground'
import RegularBackground from './RegularBackground'

export default function BackgroundPattern() {
  const { theme } = useTheme()
  if (theme === 'blade-runner') return <BladeRunnerBackground />
  if (theme === 'pulp-fiction') return <PulpFictionBackground />
  return <RegularBackground />
}
