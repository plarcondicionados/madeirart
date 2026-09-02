import showroomImage from '@/assets/images/showroom-madeirart.webp'
import { LazyImage } from '@/components/ui/LazyImage'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { company } from '@/data/site'

const { address, hours, mapsEmbedUrl, mapsLink } = company

export const Showroom = () => (
  <section id="showroom" className="surface-verniz overflow-x-hidden py-24 sm:py-32 lg:py-40">
    <div className="container-luxe">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Showroom · Ribeirão Preto"
            title={
              <>
                Venha sentar <span className="italic text-teca-dark">antes de decidir</span>
              </>
            }
            description="Foto nenhuma transmite a firmeza de um trançado bem tensionado. No nosso showroom você senta em cada modelo, sente a madeira e escolhe a cor da corda com a peça na frente."
          />

          <Reveal direction="up" delay={0.15}>
            <div className="mt-10 space-y-8">
              <div>
                <p className="eyebrow">Endereço</p>
                <address className="mt-3 text-[0.98rem] not-italic leading-relaxed text-varnish-800">
                  {address.street}
                  <br />
                  {address.city} — {address.state}
                </address>

                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-4 inline-flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-widest text-varnish-900 transition-colors duration-300 hover:text-teca-dark"
                >
                  Traçar rota
                  <span className="block h-px w-5 bg-current transition-all duration-500 ease-luxe group-hover:w-9" />
                </a>
              </div>

              <div className="hairline" />

              <div>
                <p className="eyebrow">Horário de funcionamento</p>
                <dl className="mt-4 space-y-3">
                  {hours.map((slot) => (
                    <div
                      key={slot.days}
                      className="flex items-baseline justify-between gap-4 text-[0.92rem]"
                    >
                      <dt className="text-varnish-700">{slot.days}</dt>
                      <span
                        aria-hidden="true"
                        className="h-px flex-1 translate-y-[-3px] bg-varnish-800/15"
                      />
                      <dd className="text-varnish-900">{slot.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal direction="left" delay={0.1}>
            <LazyImage
              src={showroomImage}
              alt="Interior do showroom da MadeirArt em Ribeirão Preto com conjuntos de mesa em teca e cadeiras em corda náutica"
              sizes="(min-width: 1024px) 58vw, 100vw"
              wrapperClassName="aspect-[16/10]"
            />
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            {/* Mapa do showroom. Para o pin exato, troque mapsEmbedUrl pelo embed gerado
                no Google Maps (Compartilhar → Incorporar um mapa). */}
            <div className="mt-6 aspect-[16/9] w-full overflow-hidden border border-varnish-800/12 bg-varnish-200 sm:aspect-[21/9]">
              <iframe
                src={mapsEmbedUrl}
                title={`Localização do showroom da ${company.name} em ${company.city}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="h-full w-full grayscale-[35%] transition-[filter] duration-700 hover:grayscale-0"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
)
