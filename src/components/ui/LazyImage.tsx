import { useState, type ImgHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

type LazyImageProps = {
  src: string
  alt: string
  className?: string
  wrapperClassName?: string
  /** Imagens acima da dobra (hero) devem carregar imediatamente. */
  priority?: boolean
  width?: number
  height?: number
  sizes?: string
}

/**
 * Imagem com carregamento preguiçoso e transição de entrada.
 * Enquanto o arquivo não chega, o contêiner exibe um tom de madeira claro,
 * evitando o "flash branco" e o deslocamento de layout.
 */
export const LazyImage = ({
  src,
  alt,
  className,
  wrapperClassName,
  priority = false,
  width,
  height,
  sizes,
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)

  // React 18 não mapeia a prop camelCase; o atributo precisa ir em minúsculas.
  const priorityAttrs = { fetchpriority: priority ? 'high' : 'auto' } as ImgHTMLAttributes<HTMLImageElement>

  return (
    <div className={cn('relative overflow-hidden bg-varnish-200', wrapperClassName)}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        {...priorityAttrs}
        onLoad={() => setIsLoaded(true)}
        className={cn(
          'h-full w-full object-cover transition-[opacity,transform] duration-[1200ms] ease-luxe',
          isLoaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0',
          className,
        )}
      />
    </div>
  )
}
