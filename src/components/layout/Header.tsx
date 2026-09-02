import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import { Logo } from '@/components/ui/Logo'
import { company, navigation } from '@/data/site'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { cn } from '@/lib/utils'

/**
 * Além das seções do menu, rastreamos Depoimentos e Showroom: assim nenhum
 * item fica aceso indevidamente enquanto o leitor passa por elas.
 */
const sectionIds = [
  'inicio',
  'colecao',
  'sobre',
  'processo',
  'depoimentos',
  'showroom',
  'contato',
]

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isScrolled = useScrollPosition(40)
  const activeSection = useActiveSection(sectionIds)
  const { scrollTo, setScrollLocked } = useSmoothScroll()

  // Congela a rolagem enquanto o menu mobile em tela cheia está aberto.
  useEffect(() => {
    setScrollLocked(isMenuOpen)
    return () => setScrollLocked(false)
  }, [isMenuOpen, setScrollLocked])

  // Fecha o menu no Esc.
  useEffect(() => {
    if (!isMenuOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  const handleNavigate = (href: string) => {
    setIsMenuOpen(false)
    // Aguarda o fechamento do overlay para o Lenis medir a posição correta.
    window.setTimeout(() => scrollTo(href), isMenuOpen ? 260 : 0)
  }

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-luxe',
          isScrolled || isMenuOpen
            ? 'bg-varnish-100/92 shadow-[0_1px_0_0_rgba(51,38,26,0.10)] backdrop-blur-md'
            : 'bg-transparent',
        )}
      >
        <div className="container-luxe">
          <div
            className={cn(
              'flex items-center justify-between transition-all duration-700 ease-luxe',
              isScrolled || isMenuOpen ? 'h-[4.5rem]' : 'h-20 sm:h-24',
            )}
          >
            <a
              href="#inicio"
              onClick={(event) => {
                event.preventDefault()
                handleNavigate('#inicio')
              }}
              aria-label={`${company.name} — início`}
            >
              <Logo
                tone={isScrolled || isMenuOpen ? 'dark' : 'light'}
                markSize={isScrolled ? 32 : 38}
                showTagline={!isScrolled}
              />
            </a>

            {/* Menu desktop */}
            <nav className="hidden items-center gap-9 lg:flex" aria-label="Navegação principal">
              {navigation.map((item) => {
                const isActive = activeSection === item.id

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(event) => {
                      event.preventDefault()
                      handleNavigate(item.href)
                    }}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'group relative text-[0.72rem] font-medium uppercase tracking-widest transition-colors duration-400',
                      isScrolled
                        ? isActive
                          ? 'text-teca-dark'
                          : 'text-varnish-700 hover:text-varnish-900'
                        : isActive
                          ? 'text-teca-light'
                          : 'text-varnish-50/80 hover:text-varnish-50',
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        'absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-luxe group-hover:scale-x-100',
                        isScrolled ? 'bg-teca-dark' : 'bg-teca-light',
                        isActive && 'scale-x-100',
                      )}
                    />
                  </a>
                )
              })}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="#contato"
                onClick={(event) => {
                  event.preventDefault()
                  handleNavigate('#contato')
                }}
                className={cn(
                  'hidden lg:inline-flex',
                  isScrolled ? 'btn-primary' : 'btn-ghost-light',
                )}
              >
                Agende uma Visita
              </a>

              {/* Botão do menu mobile */}
              <button
                type="button"
                onClick={() => setIsMenuOpen((open) => !open)}
                aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={isMenuOpen}
                className={cn(
                  'flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden',
                  isScrolled || isMenuOpen ? 'text-varnish-900' : 'text-varnish-50',
                )}
              >
                <span
                  className={cn(
                    'block h-px w-6 bg-current transition-all duration-400 ease-luxe',
                    isMenuOpen && 'translate-y-[3px] rotate-45',
                  )}
                />
                <span
                  className={cn(
                    'block h-px w-6 bg-current transition-all duration-400 ease-luxe',
                    isMenuOpen && '-translate-y-[3px] -rotate-45',
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu mobile em tela cheia */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-varnish-100 lg:hidden"
            data-lenis-prevent
          >
            <div className="container-luxe flex h-full flex-col justify-center pt-20">
              <nav aria-label="Navegação principal (mobile)">
                <ul className="space-y-1">
                  {navigation.map((item, index) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, y: 22 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.55,
                        delay: 0.08 + index * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <a
                        href={item.href}
                        onClick={(event) => {
                          event.preventDefault()
                          handleNavigate(item.href)
                        }}
                        className="block border-b border-varnish-800/10 py-5 font-display text-[1.85rem] text-varnish-900 transition-colors duration-300 hover:text-teca-dark"
                      >
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10"
              >
                <a
                  href="#contato"
                  onClick={(event) => {
                    event.preventDefault()
                    handleNavigate('#contato')
                  }}
                  className="btn-primary w-full"
                >
                  Agende uma Visita
                </a>

                <p className="mt-8 text-[0.78rem] leading-relaxed text-varnish-600">
                  {company.address.street}
                  <br />
                  {company.city} — {company.state}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
