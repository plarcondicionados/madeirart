import Lenis from 'lenis'
import { cancelFrame, frame } from 'framer-motion'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

type ScrollToOptions = {
  offset?: number
  duration?: number
  immediate?: boolean
}

type SmoothScrollContextValue = {
  /** Instância ativa do Lenis (null enquanto não montada ou com movimento reduzido). */
  lenis: Lenis | null
  /** Rola suavemente até um seletor, elemento ou posição absoluta. */
  scrollTo: (target: string | HTMLElement | number, options?: ScrollToOptions) => void
  /** Congela/retoma a rolagem — usado pelo menu mobile em tela cheia. */
  setScrollLocked: (locked: boolean) => void
}

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null)

/** Altura do header fixo, para o âncora não parar embaixo dele. */
const HEADER_OFFSET = -88

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

type SmoothScrollProviderProps = {
  children: ReactNode
}

/**
 * Provider do Lenis.
 *
 * O `raf` do Lenis é executado dentro do loop de frames do Framer Motion
 * (`frame.update`) em vez de um `requestAnimationFrame` próprio. Isso garante
 * que a leitura de scroll do Framer (`useScroll`, `useTransform`) aconteça no
 * mesmo tick da interpolação do Lenis — sem isso, o parallax "treme" um frame
 * atrás da rolagem.
 */
export const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
  const lenisRef = useRef<Lenis | null>(null)
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    // Quem pediu menos movimento fica com a rolagem nativa do navegador.
    if (prefersReducedMotion()) return

    const instance = new Lenis({
      duration: 1.15,
      // Curva exponencial: rápida no início, com desaceleração longa — o
      // "peso" característico de sites de luxo.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      // Em telas de toque o scroll nativo já é suave e interceptá-lo prejudica
      // a resposta — deixamos o Lenis apenas no wheel.
      syncTouch: false,
    })

    lenisRef.current = instance
    setLenis(instance)

    const update = (data: { timestamp: number }) => {
      instance.raf(data.timestamp)
    }

    frame.update(update, true)

    return () => {
      cancelFrame(update)
      instance.destroy()
      lenisRef.current = null
      setLenis(null)
    }
  }, [])

  const scrollTo = useCallback<SmoothScrollContextValue['scrollTo']>((target, options = {}) => {
    const { offset = HEADER_OFFSET, duration = 1.4, immediate = false } = options
    const instance = lenisRef.current

    if (instance) {
      instance.scrollTo(target, { offset, duration, immediate })
      return
    }

    // Fallback sem Lenis (movimento reduzido / SSR): rolagem nativa.
    const element =
      typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target

    if (typeof element === 'number') {
      window.scrollTo({ top: element, behavior: immediate ? 'auto' : 'smooth' })
      return
    }

    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY + offset
      window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' })
    }
  }, [])

  const setScrollLocked = useCallback((locked: boolean) => {
    const instance = lenisRef.current

    if (instance) {
      if (locked) instance.stop()
      else instance.start()
      return
    }

    document.body.style.overflow = locked ? 'hidden' : ''
  }, [])

  const value = useMemo(
    () => ({ lenis, scrollTo, setScrollLocked }),
    [lenis, scrollTo, setScrollLocked],
  )

  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>
}

export const useSmoothScroll = (): SmoothScrollContextValue => {
  const context = useContext(SmoothScrollContext)

  if (!context) {
    throw new Error('useSmoothScroll precisa estar dentro de <SmoothScrollProvider>.')
  }

  return context
}
