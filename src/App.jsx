import { useReveal } from './hooks/useReveal'
import { useScrollProgress } from './hooks/useScrollProgress'
import Header from './components/Header'
import Hero from './components/Hero'
import Mission from './components/Mission'
import About from './components/About'
import Leadership from './components/Leadership'
import Work from './components/Work'
import Band from './components/Band'
import Timeline from './components/Timeline'
import Gallery from './components/Gallery'
import Stories from './components/Stories'
import Press from './components/Press'
import Support from './components/Support'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useReveal()
  const progress = useScrollProgress()

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
      <Header />
      <main id="main">
        <Hero />
        <Mission />
        <About />
        <Leadership />
        <Work />
        <Band />
        <Timeline />
        <Gallery />
        <Stories />
        <Press />
        <Support />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
