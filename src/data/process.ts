import processoAcabamento from '@/assets/images/processo-04-acabamento-verniz.webp'
import processoCorda from '@/assets/images/processo-03-trancado-corda.webp'
import processoMadeira from '@/assets/images/processo-01-selecao-madeira.webp'
import processoSerralheria from '@/assets/images/processo-02-serralheria.webp'

export type ProcessStep = {
  step: string
  title: string
  duration: string
  description: string
  image: string
  alt: string
}

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Seleção da madeira',
    duration: 'teca tratada para exterior',
    description:
      'Trabalhamos com teca e madeiras nobres de manejo certificado, escolhidas prancha a prancha pelo desenho do veio e pela densidade. Só entra no ateliê a madeira que aguenta sol e chuva de Ribeirão Preto sem se render.',
    image: processoMadeira,
    alt: 'Marceneiro selecionando pranchas de madeira teca em estoque climatizado',
  },
  {
    step: '02',
    title: 'Serralheria e estrutura',
    duration: 'solda e pintura eletrostática',
    description:
      'A estrutura nasce na nossa própria serralheria: perfis de alumínio cortados em esquadria, soldados e finalizados em pintura preta fosca. É o esqueleto que garante décadas de uso ao ar livre.',
    image: processoSerralheria,
    alt: 'Serralheiro soldando estrutura de alumínio preto para móvel de área externa',
  },
  {
    step: '03',
    title: 'Trançado à mão',
    duration: 'de 6 a 12 horas por peça',
    description:
      'Cada assento é trançado manualmente em corda náutica, fio a fio, com tensão controlada. É a etapa mais lenta do processo — e a que separa uma peça artesanal de um móvel de linha.',
    image: processoCorda,
    alt: 'Mãos de artesão trançando corda náutica sobre estrutura de alumínio preto',
  },
  {
    step: '04',
    title: 'Acabamento e proteção',
    duration: 'múltiplas demãos de verniz marítimo',
    description:
      'Lixamento progressivo e aplicação manual de verniz marítimo em demãos sucessivas, até o brilho acetinado do verniz curado. O acabamento que dá nome à casa: madeira protegida, veio à mostra.',
    image: processoAcabamento,
    alt: 'Artesão aplicando verniz marítimo sobre tampo de madeira teca ripada',
  },
]
