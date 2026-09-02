import monograma from '@/assets/images/madeirart-monograma.webp'
import { cn } from '@/lib/utils'

type LogoProps = {
  className?: string
  tone?: 'dark' | 'light'
  showTagline?: boolean
  /** Altura do monograma em px. */
  markSize?: number
}

/**
 * Assinatura da marca: monograma original da MadeirArt (moldura metálica da
 * serralheria abraçando a cadeira de madeira) ao lado do logotipo tipográfico.
 */
export const Logo = ({
  className,
  tone = 'dark',
  showTagline = false,
  markSize = 38,
}: LogoProps) => (
  <span className={cn('flex items-center gap-3', className)}>
    <img
      src={monograma}
      alt=""
      aria-hidden="true"
      style={{ height: markSize }}
      className={cn('w-auto shrink-0', tone === 'light' && 'brightness-[1.18]')}
    />

    <span className="flex flex-col leading-none">
      <span
        className={cn(
          'font-display text-[1.35rem] tracking-[0.04em] sm:text-[1.5rem]',
          tone === 'light' ? 'text-varnish-50' : 'text-varnish-900',
        )}
      >
        Madeir<span className="text-teca">Art</span>
      </span>

      {showTagline && (
        <span
          className={cn(
            'mt-1.5 text-[0.5rem] uppercase tracking-brand sm:text-[0.55rem]',
            tone === 'light' ? 'text-varnish-50/55' : 'text-varnish-600',
          )}
        >
          Ribeirão Preto
        </span>
      )}
    </span>
  </span>
)
