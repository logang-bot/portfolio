import './index.css'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import BackgroundPattern from './components/BackgroundPattern'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Contact from './sections/Contact'

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BackgroundPattern />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
