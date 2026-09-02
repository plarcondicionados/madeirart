import { motion, type Variants } from 'framer-motion'
import type { ElementType, ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  /** Direção da entrada da peça. */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  delay?: number
  duration?: number
  distance?: number
  className?: string
  as?: ElementType
  once?: boolean
}

const offsetFor = (direction: RevealProps['direction'], distance: number) => {
  switch (direction) {
    case 'down':
      return { y: -distance, x: 0 }
    case 'left':
      return { x: distance, y: 0 }
    case 'right':
      return { x: -distance, y: 0 }
    case 'none':
      return { x: 0, y: 0 }
    default:
      return { y: distance, x: 0 }
  }
}

/**
 * Animação de entrada ao entrar na viewport (fade + deslocamento).
 * O easing acompanha a curva do Lenis para que o elemento pareça "carregado"
 * pela própria rolagem.
 *
 * Atenção: `direction` "left"/"right" desloca o elemento no eixo X antes de
 * animar. Se o elemento encostar na borda da tela, isso cria rolagem
 * horizontal na página — por isso a seção que o contém precisa de
 * `overflow-x-hidden`.
 */
export const Reveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.9,
  distance = 32,
  className,
  as = 'div',
  once = true,
}: RevealProps) => {
  const offset = offsetFor(direction, distance)

  const variants: Variants = {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.25, margin: '0px 0px -80px 0px' }}
    >
      {children}
    </MotionTag>
  )
}
