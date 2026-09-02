import { LazyImage } from '@/components/ui/LazyImage'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { processSteps } from '@/data/process'

export const Processo = () => (
  <section id="processo" className="bg-varnish-900 py-24 sm:py-32 lg:py-40">
    <div className="container-luxe">
      <SectionHeading
        tone="light"
        align="center"
        eyebrow="Processo artesanal"
        title={
          <>
            Da prancha bruta ao <span className="italic text-teca-light">verniz curado</span>
          </>
        }
        description="Quatro etapas, todas executadas dentro do nosso ateliê em Ribeirão Preto. Nenhuma delas é acelerada — é por isso que o prazo de produção é honesto e o móvel dura."
      />

      <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-7">
        {processSteps.map((step, index) => (
          <Reveal key={step.step} direction="up" delay={index * 0.1} className="group">
            <article className="flex h-full flex-col">
              <div className="relative overflow-hidden">
                <LazyImage
                  src={step.image}
                  alt={step.alt}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  wrapperClassName="aspect-[4/3]"
                  className="transition-transform duration-[1400ms] ease-luxe group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-varnish-900/25 transition-opacity duration-700 group-hover:opacity-0" />

                <span className="absolute bottom-0 left-0 bg-varnish-900 px-4 py-2 font-display text-[0.95rem] text-teca-light">
                  {step.step}
                </span>
              </div>

              <h3 className="mt-6 font-display text-[1.3rem] leading-tight text-varnish-50">
                {step.title}
              </h3>

              <p className="mt-2 text-[0.66rem] uppercase tracking-widest text-teca-light">
                {step.duration}
              </p>

              <p className="mt-4 text-[0.9rem] leading-relaxed text-varnish-100/70">
                {step.description}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)
