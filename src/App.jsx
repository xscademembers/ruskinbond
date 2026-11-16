import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, prefersReduced, scrollToTarget, startSmooth, lockScroll } from './lib/motion'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Header from './components/Header'
import Hero from './components/Hero'
import Mission from './components/Mission'
import About from './components/About'
import Work from './components/Work'
import Band from './components/Band'
import Timeline from './components/Timeline'
import Leadership from './components/Leadership'
import Gallery from './components/Gallery'
import Stories from './components/Stories'
import Press from './components/Press'
import Support from './components/Support'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [ready, setReady] = useState(false)
  const progressRef = useRef(null)

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    return startSmooth()
  }, [])

  useEffect(() => {
    lockScroll(!ready)
    if (ready) ScrollTrigger.refresh()
  }, [ready])

  useEffect(() => {
    const onClick = (e) => {
      const link = e.target.closest('a[href^="#"]')
      if (!link) return
      const href = link.getAttribute('href')
      if (href.length < 2) return
      e.preventDefault()
      // Let the menu close (and unlock scrolling) before scrolling.
      setTimeout(() => scrollToTarget(href), 60)
    }
    document.addEventListener('click', onClick)
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('load', onLoad)
    }
  }, [])

  useEffect(() => {
    const bar = progressRef.current
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => gsap.set(bar, { scaleX: self.progress }),
    })
    return () => st.kill()
  }, [])

  useEffect(() => {
    if (prefersReduced || window.matchMedia('(pointer: coarse)').matches) return undefined
    const cleanups = Array.from(document.querySelectorAll('[data-magnetic]')).map((el) => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })
      const move = (e) => {
        const r = el.getBoundingClientRect()
        xTo((e.clientX - (r.left + r.width / 2)) * 0.35)
        yTo((e.clientY - (r.top + r.height / 2)) * 0.35)
      }
      const leave = () => {
        xTo(0)
        yTo(0)
      }
      el.addEventListener('mousemove', move)
      el.addEventListener('mouseleave', leave)
      return () => {
        el.removeEventListener('mousemove', move)
        el.removeEventListener('mouseleave', leave)
      }
    })
    return () => cleanups.forEach((fn) => fn())
  }, [])

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="progress" aria-hidden="true">
        <span ref={progressRef} />
      </div>
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <Header />
      <main id="main">
        <Hero ready={ready} />
        <Mission />
        <About />
        <Work />
        <Band />
        <Timeline />
        <Leadership />
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
