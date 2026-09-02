import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ImgHTMLAttributes } from 'react'

import heroImage from '@/assets/images/ambiente-area-gourmet-entardecer.webp'
import { company } from '@/data/site'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

const easeLuxe = [0.22, 1, 0.36, 1] as const

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollTo } = useSmoothScroll()

  /**
   * Parallax leve: como o Lenis roda dentro do loop de frames do Framer Motion,
   * `useScroll` lê a mesma posição interpolada e a imagem acompanha a rolagem
   * suave sem atraso de um frame.
   */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.16])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '38%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-varnish-900"
    >
      {/* Camada de imagem com parallax */}
      <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0">
        <img
          src={heroImage}
          alt="Área gourmet ao entardecer com mesa de teca maciça e cadeiras em corda náutica da MadeirArt"
          {...({ fetchpriority: 'high' } as ImgHTMLAttributes<HTMLImageElement>)}
          decoding="sync"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Véus para garantir a leitura do texto sobre a foto */}
      <div className="absolute inset-0 bg-gradient-to-t from-varnish-900/92 via-varnish-900/45 to-varnish-900/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-varnish-900/70 via-transparent to-transparent" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-luxe relative z-10 pb-20 pt-32 sm:pb-24 lg:pb-28"
      >
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: easeLuxe }}
            className="flex items-center gap-4"
          >
            <span className="h-px w-12 bg-teca-light" />
            <span className="eyebrow text-teca-light">{company.tagline}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.28, ease: easeLuxe }}
            className="heading-display mt-7 text-balance text-[2.6rem] text-varnish-50 sm:text-[3.6rem] lg:text-[4.6rem]"
          >
            A madeira que <span className="italic text-teca-light">resiste</span> ao tempo.
            <br className="hidden sm:block" /> O trançado que resiste ao uso.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: easeLuxe }}
            className="mt-8 max-w-xl text-[1rem] leading-relaxed text-varnish-100/85 sm:text-[1.1rem]"
          >
            Marcenaria, serralheria e mesas artesanais produzidas sob medida em{' '}
            <span className="text-varnish-50">Ribeirão Preto — SP</span>. Móveis de área gourmet
            em teca maciça, alumínio preto e corda náutica trançada à mão, peça por peça.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: easeLuxe }}
            className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <button
              type="button"
              onClick={() => scrollTo('#colecao')}
              className="btn bg-varnish-50 px-8 py-4 text-varnish-900 hover:bg-teca-light"
            >
              Conheça a coleção
            </button>

            <button
              type="button"
              onClick={() => scrollTo('#contato')}
              className="btn-ghost-light px-8"
            >
              Agende uma visita
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Indicador de rolagem */}
      <motion.button
        type="button"
        onClick={() => scrollTo('#colecao')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        aria-label="Rolar para a coleção"
        className="absolute bottom-8 right-6 z-10 hidden items-center gap-3 text-varnish-50/60 transition-colors duration-500 hover:text-varnish-50 lg:flex lg:right-12"
      >
        <span className="text-[0.62rem] uppercase tracking-brand">Role</span>
        <span className="relative block h-12 w-px overflow-hidden bg-varnish-50/25">
          <motion.span
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-x-0 block h-1/2 bg-teca-light"
          />
        </span>
      </motion.button>
    </section>
  )
}
