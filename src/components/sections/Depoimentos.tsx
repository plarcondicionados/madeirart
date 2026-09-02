import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'

import { SectionHeading } from '@/components/ui/SectionHeading'
import { testimonials } from '@/data/testimonials'
import { cn } from '@/lib/utils'

const AUTOPLAY_MS = 7000

export const Depoimentos = () => {
  const [[index, direction], setState] = useState<[number, number]>([0, 0])
  const [isPaused, setIsPaused] = useState(false)

  const paginate = useCallback((step: number) => {
    setState(([current]) => [
      (current + step + testimonials.length) % testimonials.length,
      step,
    ])
  }, [])

  const goTo = useCallback(
    (next: number) => setState(([current]) => [next, next > current ? 1 : -1]),
    [],
  )

  // Avanço automático, pausado no hover/foco e quando a aba perde visibilidade.
  useEffect(() => {
    if (isPaused) return

    const timer = window.setInterval(() => paginate(1), AUTOPLAY_MS)
    return () => window.clearInterval(timer)
  }, [isPaused, paginate])

  const active = testimonials[index]

  return (
    <section
      id="depoimentos"
      className="surface-verniz-alt py-24 sm:py-32 lg:py-36"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="container-luxe">
        <SectionHeading
          align="center"
          eyebrow="Quem já recebeu em casa"
          title="A prova está na varanda dos nossos clientes"
        />

        <div className="relative mx-auto mt-14 max-w-3xl lg:mt-16">
          {/* Aspas decorativas */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 font-display text-[7rem] leading-none text-teca/20 sm:text-[9rem]"
          >
            &ldquo;
          </span>

          <div
            className="relative min-h-[19rem] sm:min-h-[16rem]"
            aria-live="polite"
            aria-atomic="true"
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.blockquote
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction >= 0 ? 46 : -46 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction >= 0 ? -46 : 46 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="relative text-center"
              >
                <p className="font-display text-[1.2rem] italic leading-relaxed text-varnish-800 sm:text-[1.45rem]">
                  {active.quote}
                </p>

                <footer className="mt-9">
                  <p className="text-[0.85rem] font-medium uppercase tracking-widest text-varnish-900">
                    {active.author}
                  </p>
                  <p className="mt-2 text-[0.8rem] text-varnish-600">{active.role}</p>
                  <p className="mt-1 text-[0.72rem] uppercase tracking-widest text-teca-dark">
                    {active.location}
                  </p>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Controles */}
          <div className="mt-10 flex items-center justify-center gap-8">
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Depoimento anterior"
              className="flex h-11 w-11 items-center justify-center border border-varnish-800/20 text-varnish-800 transition-all duration-400 ease-luxe hover:border-varnish-800 hover:bg-varnish-800 hover:text-varnish-50"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor">
                <path d="M15 5l-7 7 7 7" strokeWidth="1.4" strokeLinecap="square" />
              </svg>
            </button>

            <div className="flex items-center gap-2.5" role="tablist" aria-label="Depoimentos">
              {testimonials.map((testimonial, dotIndex) => (
                <button
                  key={testimonial.author}
                  type="button"
                  role="tab"
                  aria-selected={dotIndex === index}
                  aria-label={`Depoimento de ${testimonial.author}`}
                  onClick={() => goTo(dotIndex)}
                  className={cn(
                    'h-1.5 transition-all duration-500 ease-luxe',
                    dotIndex === index
                      ? 'w-8 bg-teca-dark'
                      : 'w-1.5 bg-varnish-800/25 hover:bg-varnish-800/50',
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Próximo depoimento"
              className="flex h-11 w-11 items-center justify-center border border-varnish-800/20 text-varnish-800 transition-all duration-400 ease-luxe hover:border-varnish-800 hover:bg-varnish-800 hover:text-varnish-50"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor">
                <path d="M9 5l7 7-7 7" strokeWidth="1.4" strokeLinecap="square" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
