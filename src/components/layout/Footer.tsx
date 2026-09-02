import { Logo } from '@/components/ui/Logo'
import { company, directContacts, navigation } from '@/data/site'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { buildWhatsAppLink } from '@/lib/utils'

const WHATSAPP_PATH =
  'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.896 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.945c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.652a11.94 11.94 0 005.71 1.454h.006c6.585 0 11.946-5.36 11.949-11.945a11.86 11.86 0 00-3.48-8.408'

export const Footer = () => {
  const { scrollTo } = useSmoothScroll()
  const year = new Date().getFullYear()

  const quickLinks = [...navigation, { label: 'Showroom', href: '#showroom', id: 'showroom' }]

  return (
    <footer className="bg-varnish-900 pt-20 text-varnish-100 sm:pt-24">
      <div className="container-luxe">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Marca */}
          <div className="lg:col-span-5">
            <Logo tone="light" markSize={46} />

            <p className="mt-7 max-w-sm text-[0.92rem] leading-relaxed text-varnish-100/60">
              Marcenaria, serralheria e mesas artesanais em {company.city} — {company.state}.
              Móveis de área gourmet produzidos sob medida, do corte da madeira ao trançado da
              corda.
            </p>

            <ul className="mt-8 flex flex-wrap gap-2.5">
              {directContacts.map((contact) => (
                <li key={contact.whatsapp}>
                  <a
                    href={buildWhatsAppLink(contact.whatsapp, company.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 border border-varnish-100/20 px-4 py-3 transition-all duration-500 ease-luxe hover:border-teca-light hover:bg-teca-light hover:text-varnish-900"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 fill-current">
                      <path d={WHATSAPP_PATH} />
                    </svg>
                    <span className="flex flex-col leading-none">
                      <span className="text-[0.55rem] uppercase tracking-brand opacity-60">
                        {contact.name}
                      </span>
                      <span className="mt-1.5 text-[0.72rem] font-medium tracking-wide">
                        {contact.display}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links rápidos */}
          <div className="lg:col-span-3">
            <p className="text-[0.62rem] uppercase tracking-brand text-teca-light">Navegação</p>

            <ul className="mt-6 space-y-3.5">
              {quickLinks.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(event) => {
                      event.preventDefault()
                      scrollTo(item.href)
                    }}
                    className="group inline-flex items-center gap-2 text-[0.9rem] text-varnish-100/65 transition-colors duration-300 hover:text-varnish-50"
                  >
                    <span className="block h-px w-0 bg-teca-light transition-all duration-500 ease-luxe group-hover:w-4" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Showroom */}
          <div className="lg:col-span-4">
            <p className="text-[0.62rem] uppercase tracking-brand text-teca-light">Showroom</p>

            <address className="mt-6 text-[0.9rem] not-italic leading-relaxed text-varnish-100/65">
              {company.address.street}
              <br />
              {company.address.city} — {company.address.state}
            </address>

            <dl className="mt-6 space-y-2 text-[0.82rem] text-varnish-100/55">
              {company.hours.map((slot) => (
                <div key={slot.days} className="flex justify-between gap-4">
                  <dt>{slot.days}</dt>
                  <dd className="text-varnish-100/75">{slot.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-varnish-100/12 py-8 text-[0.75rem] text-varnish-100/45 sm:flex-row sm:items-center">
          <p>
            © {year} {company.name}. Todos os direitos reservados.
          </p>

          <p className="uppercase tracking-widest">
            {company.city} — {company.state}
          </p>
        </div>
      </div>
    </footer>
  )
}
