import type { ReactNode } from 'react'

import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  className?: string
}

/** Cabeçalho padrão das seções: sobretítulo, filete, título serifado e apoio. */
export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'dark',
  className,
}: SectionHeadingProps) => (
  <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
    <Reveal direction="up" distance={16}>
      <div className={cn('flex items-center gap-4', align === 'center' && 'justify-center')}>
        <span className={cn('h-px w-10', tone === 'light' ? 'bg-teca-light' : 'bg-teca')} />
        <span className={cn('eyebrow', tone === 'light' && 'text-teca-light')}>{eyebrow}</span>
      </div>
    </Reveal>

    <Reveal direction="up" delay={0.08}>
      <h2
        className={cn(
          'heading-display mt-6 text-balance text-[2rem] sm:text-[2.6rem] lg:text-[3.1rem]',
          tone === 'light' && 'text-varnish-50',
        )}
      >
        {title}
      </h2>
    </Reveal>

    {description && (
      <Reveal direction="up" delay={0.16}>
        <p
          className={cn(
            'mt-6 text-[1rem] leading-relaxed text-varnish-700 sm:text-[1.05rem]',
            tone === 'light' && 'text-varnish-100/75',
          )}
        >
          {description}
        </p>
      </Reveal>
    )}
  </div>
)
