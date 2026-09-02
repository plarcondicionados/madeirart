import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

import detalheImage from '@/assets/images/detalhe-encaixe-teca-aluminio.webp'
import oficinaImage from '@/assets/images/sobre-oficina-madeirart.webp'
import { LazyImage } from '@/components/ui/LazyImage'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { brandStats } from '@/data/site'

export const Sobre = () => {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Parallax discreto entre as duas imagens sobrepostas.
  const mainY = useTransform(scrollYProgress, [0, 1], ['4%', '-4%'])
  const detailY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section
      ref={sectionRef}
      id="sobre"
      className="surface-verniz-alt relative overflow-hidden py-24 sm:py-32 lg:py-40"
    >
      <div className="container-luxe">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Composição de imagens */}
          <div className="relative">
            <motion.div style={{ y: mainY }}>
              <LazyImage
                src={oficinaImage}
                alt="Marceneiro da MadeirArt montando um tampo de teca sobre estrutura de alumínio preto no ateliê"
                sizes="(min-width: 1024px) 45vw, 100vw"
                wrapperClassName="aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]"
              />
            </motion.div>

            <motion.div
              style={{ y: detailY }}
              className="absolute -bottom-10 -right-4 hidden w-[46%] border-[10px] border-varnish-50 shadow-[0_20px_50px_-24px_rgba(51,38,26,0.55)] sm:block lg:-right-10"
            >
              <LazyImage
                src={detalheImage}
                alt="Detalhe do encaixe entre a madeira teca ripada e a estrutura de alumínio preto"
                sizes="25vw"
                wrapperClassName="aspect-[4/3]"
              />
            </motion.div>

            <Reveal direction="right" delay={0.3}>
              <div className="absolute -left-3 top-8 hidden bg-varnish-800 px-6 py-5 text-varnish-50 lg:block">
                <p className="font-display text-[2.1rem] leading-none">20</p>
                <p className="mt-2 text-[0.6rem] uppercase tracking-widest text-varnish-100/70">
                  anos de ofício
                </p>
              </div>
            </Reveal>
          </div>

          {/* Texto */}
          <div className="lg:pl-4">
            <SectionHeading
              eyebrow="Sobre a marca"
              title={
                <>
                  Duas oficinas, <span className="italic text-teca-dark">um só ofício</span>
                </>
              }
            />

            <div className="mt-8 space-y-5 text-[0.98rem] leading-relaxed text-varnish-700">
              <Reveal direction="up" delay={0.1}>
                <p>
                  A MadeirArt nasceu de uma marcenaria de bairro em Ribeirão Preto, daquelas em
                  que o cliente entrava para consertar uma cadeira e saía com uma mesa encomendada.
                  Duas décadas depois, somos marcenaria e serralheria sob o mesmo teto — e é essa
                  combinação que define tudo o que fazemos.
                </p>
              </Reveal>

              <Reveal direction="up" delay={0.18}>
                <p>
                  Enquanto a maioria dos fabricantes compra a estrutura pronta e apenas monta,
                  aqui a solda, a pintura eletrostática, o corte da madeira e o trançado da corda
                  acontecem no mesmo galpão, pelas mesmas mãos. Nada é terceirizado. Nada sai sem
                  passar pela conferência de quem fabricou.
                </p>
              </Reveal>

              <Reveal direction="up" delay={0.26}>
                <p>
                  O resultado é um móvel de área externa que não se comporta como móvel de área
                  externa: teca tratada que não racha, alumínio que não enferruja e corda náutica
                  que atravessa verões inteiros sem desbotar. Móveis para quem recebe — e para quem
                  pretende continuar recebendo daqui a quinze anos.
                </p>
              </Reveal>
            </div>

            {/* Indicadores da marca */}
            <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-varnish-800/12 pt-10">
              {brandStats.map((stat, index) => (
                <Reveal key={stat.label} direction="up" delay={0.1 + index * 0.08}>
                  <p className="font-display text-[1.9rem] leading-none text-varnish-900">
                    {stat.value}
                  </p>
                  <p className="mt-2.5 text-[0.72rem] leading-snug text-varnish-600">
                    {stat.label}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
