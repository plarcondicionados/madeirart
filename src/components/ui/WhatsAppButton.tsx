import { AnimatePresence, motion } from 'framer-motion'

import { company } from '@/data/site'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { buildWhatsAppLink } from '@/lib/utils'

/** Botão flutuante de WhatsApp — aparece assim que o usuário passa do hero. */
export const WhatsAppButton = () => {
  const isVisible = useScrollPosition(420)
  const href = buildWhatsAppLink(company.contact.whatsapp, company.whatsappMessage)

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar com a MadeirArt no WhatsApp"
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] sm:bottom-8 sm:right-8"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-7 w-7 fill-white transition-transform duration-500 ease-luxe group-hover:rotate-6"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.896 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.945c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.652a11.94 11.94 0 005.71 1.454h.006c6.585 0 11.946-5.36 11.949-11.945a11.86 11.86 0 00-3.48-8.408" />
          </svg>

          <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-sm bg-varnish-900 px-3 py-2 text-[0.68rem] uppercase tracking-widest text-varnish-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:block">
            Fale conosco
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
