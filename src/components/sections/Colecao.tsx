import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'

import { LazyImage } from '@/components/ui/LazyImage'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import {
  collection,
  collectionCategories,
  type CollectionCategory,
  type Product,
} from '@/data/collection'
import { company } from '@/data/site'
import { buildWhatsAppLink, cn } from '@/lib/utils'

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const orcamentoLink = buildWhatsAppLink(
    company.contact.whatsapp,
    `Olá! Gostaria de um orçamento para o modelo "${product.name}" que vi no site da MadeirArt.`,
  )

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col"
    >
      <div className="relative overflow-hidden bg-varnish-200">
        <LazyImage
          src={product.image}
          alt={product.alt}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          wrapperClassName="aspect-[4/5]"
          className="transition-transform duration-[1400ms] ease-luxe group-hover:scale-[1.05]"
        />

        {/* Painel de composição revelado no hover */}
        <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-varnish-900/92 via-varnish-900/25 to-transparent opacity-0 transition-opacity duration-700 ease-luxe group-hover:opacity-100">
          <ul className="w-full space-y-2 p-6 lg:p-7">
            {product.specs.map((spec) => (
              <li
                key={spec}
                className="flex items-start gap-2.5 text-[0.78rem] leading-snug text-varnish-100"
              >
                <span className="mt-[7px] block h-px w-3 shrink-0 bg-teca-light" />
                {spec}
              </li>
            ))}
          </ul>
        </div>

        <span className="absolute left-0 top-5 bg-varnish-100/95 px-4 py-1.5 text-[0.6rem] uppercase tracking-widest text-varnish-700">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col pt-6">
        <p className="text-[0.66rem] uppercase tracking-widest text-teca-dark">
          {product.materials}
        </p>

        <h3 className="mt-3 font-display text-[1.35rem] leading-tight text-varnish-900">
          {product.name}
        </h3>

        <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-varnish-700">
          {product.description}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-varnish-800/12 pt-4">
          <span className="text-[0.72rem] uppercase tracking-widest text-varnish-600">
            {product.price}
          </span>

          <a
            href={orcamentoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-widest text-varnish-900 transition-colors duration-300 hover:text-teca-dark"
          >
            Solicitar
            <span className="block h-px w-5 bg-current transition-all duration-500 ease-luxe group-hover/link:w-8" />
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export const Colecao = () => {
  const [activeCategory, setActiveCategory] = useState<CollectionCategory>('Todos')

  const filtered = useMemo(
    () =>
      activeCategory === 'Todos'
        ? collection
        : collection.filter((product) => product.category === activeCategory),
    [activeCategory],
  )

  return (
    <section id="colecao" className="surface-verniz py-24 sm:py-32 lg:py-40">
      <div className="container-luxe">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Coleção MadeirArt"
            title={
              <>
                Peças feitas para viver <span className="italic text-teca-dark">ao ar livre</span>
              </>
            }
            description="Cada conjunto sai do nosso ateliê em Ribeirão Preto com estrutura soldada, madeira tratada e trançado feito à mão. Produzimos sob medida — cor da corda, dimensão do tampo e altura da mesa são escolhas suas."
          />

          <Reveal direction="up" delay={0.2} className="lg:pb-2">
            <p className="max-w-xs text-[0.85rem] leading-relaxed text-varnish-600">
              {collection.length} modelos em linha. Projetos exclusivos sob encomenda para
              arquitetos e construtoras.
            </p>
          </Reveal>
        </div>

        {/* Filtros por categoria */}
        <Reveal direction="up" delay={0.1}>
          <div className="no-scrollbar mt-12 flex gap-2 overflow-x-auto border-b border-varnish-800/12 pb-4 sm:mt-14">
            {collectionCategories.map((category) => {
              const isActive = activeCategory === category

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={isActive}
                  className={cn(
                    'whitespace-nowrap px-4 py-2 text-[0.7rem] font-medium uppercase tracking-widest transition-all duration-400 ease-luxe',
                    isActive
                      ? 'bg-varnish-800 text-varnish-50'
                      : 'text-varnish-600 hover:bg-varnish-200/70 hover:text-varnish-900',
                  )}
                >
                  {category}
                </button>
              )
            })}
          </div>
        </Reveal>

        <motion.div
          layout
          className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 sm:mt-14 lg:grid-cols-3 lg:gap-x-10"
        >
          <AnimatePresence>
            {filtered.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
