import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export { gsap, ScrollTrigger }

export const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

let lenis = null

export function startSmooth() {
  if (prefersReduced) return () => {}
  if (lenis) return () => {}

  lenis = new Lenis({
    lerp: 0.08,
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.2,
    syncTouch: false,
  })
  lenis.on('scroll', ScrollTrigger.update)

  const tick = (time) => lenis?.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  document.documentElement.classList.add('lenis', 'lenis-smooth')

  return () => {
    gsap.ticker.remove(tick)
    document.documentElement.classList.remove('lenis', 'lenis-smooth')
    lenis?.destroy()
    lenis = null
  }
}

export function scrollToTarget(target) {
  const el = target === '#top' ? 0 : document.querySelector(target)
  if (el === null) return
  if (lenis) {
    lenis.scrollTo(el, {
      offset: 0,
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      force: true,
      lock: true,
    })
  } else if (el === 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

export function lockScroll(locked) {
  if (lenis) {
    if (locked) lenis.stop()
    else lenis.start()
  }
  document.documentElement.classList.toggle('is-locked', locked)
}

function animateScope(root) {
  const q = (sel) => Array.from(root.querySelectorAll(sel))

  q('[data-split]').forEach((el) => {
    gsap.from(el.querySelectorAll('.wi'), {
      yPercent: 120,
      rotate: 3,
      duration: 1.4,
      ease: 'expo.out',
      stagger: 0.05,
      scrollTrigger: { trigger: el, start: 'top 88%' },
    })
  })

  q('[data-fade]').forEach((el) => {
    gsap.from(el, {
      y: 48,
      autoAlpha: 0,
      duration: 1.5,
      ease: 'power3.out',
      delay: parseFloat(el.dataset.fade) || 0,
      scrollTrigger: { trigger: el, start: 'top 92%' },
    })
  })

  q('[data-clip]').forEach((el) => {
    const media = el.querySelector('img, video')
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 88%' } })
    tl.fromTo(
      el,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.7, ease: 'expo.inOut' },
    )
    if (media) tl.from(media, { scale: 1.4, duration: 2.2, ease: 'expo.out' }, 0.25)
  })

  q('[data-line]').forEach((el) => {
    gsap.from(el, {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1.6,
      ease: 'expo.inOut',
      scrollTrigger: { trigger: el, start: 'top 94%' },
    })
  })

  q('[data-parallax]').forEach((el) => {
    const amount = parseFloat(el.dataset.parallax) || 10
    gsap.fromTo(
      el,
      { yPercent: -amount },
      {
        yPercent: amount,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    )
  })

  q('[data-scrub]').forEach((el) => {
    gsap.fromTo(
      el.querySelectorAll('.wi'),
      { opacity: 0.22 },
      {
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 50%', scrub: true },
      },
    )
  })
}

/**
 * Runs the shared data-attribute animations inside `ref`, plus an optional
 * section-specific setup. Everything is reverted on unmount.
 */
export function useMotion(ref, setup, dependencies = []) {
  useGSAP(
    () => {
      if (prefersReduced || !ref.current) return
      animateScope(ref.current)
      setup?.(ref.current)
    },
    { scope: ref, dependencies },
  )
}
