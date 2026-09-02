import ambienteBistroVaranda from '@/assets/images/ambiente-bistro-varanda.webp'
import ambienteMesaRedondaPreta from '@/assets/images/ambiente-mesa-redonda-preta.webp'
import ambienteMesaTecaGiratoria from '@/assets/images/ambiente-mesa-teca-giratoria.webp'
import produtoOndaVerdeMusgo from '@/assets/images/produto-conjunto-onda-verde-musgo.webp'
import produtoBancoTeca from '@/assets/images/produto-banco-teca-aluminio.webp'
import produtoBaseMesaX from '@/assets/images/produto-base-mesa-x-aco.webp'
import produtoEspreguicadeira from '@/assets/images/produto-espreguicadeira-corda.webp'
import produtoJogoAreia from '@/assets/images/produto-jogo-areia-8-lugares.webp'
import produtoJogoFendi from '@/assets/images/produto-jogo-fendi-6-lugares-ombrelone.webp'
import produtoJogoMarinhoPuff from '@/assets/images/produto-jogo-marinho-8-lugares-puff.webp'
import produtoJogoMarinhoRetangular from '@/assets/images/produto-jogo-marinho-8-lugares-retangular.webp'

export const collectionCategories = [
  'Todos',
  'Conjuntos',
  'Poltronas & Lounge',
  'Bancos & Avulsos',
  'Estruturas',
] as const

export type CollectionCategory = (typeof collectionCategories)[number]

export type Product = {
  id: string
  name: string
  category: Exclude<CollectionCategory, 'Todos'>
  materials: string
  description: string
  /** Composição da peça — revelada no hover do card. */
  specs: string[]
  price: string
  image: string
  alt: string
}

/**
 * Catálogo real da MadeirArt: as fotografias são do acervo da empresa e os
 * nomes e composições seguem as fichas de produto originais.
 */
export const collection: Product[] = [
  {
    id: 'jogo-areia',
    name: 'Jogo Areia — 8 Lugares',
    category: 'Conjuntos',
    materials: 'Alumínio preto · Corda náutica areia',
    description:
      'Contraste absoluto entre a estrutura preta fosca e o trançado areia. Uma mesa que organiza a área gourmet inteira sem pedir licença.',
    specs: [
      '1 mesa retangular + 8 cadeiras',
      'Tampo em alumínio ripado preto',
      'Trançado em corda náutica areia',
    ],
    price: 'Preço sob consulta',
    image: produtoJogoAreia,
    alt: 'Jogo Areia com mesa retangular de alumínio preto e oito cadeiras em corda náutica bege',
  },
  {
    id: 'jogo-marinho-retangular',
    name: 'Jogo Marinho — 8 Lugares',
    category: 'Conjuntos',
    materials: 'Madeira ripada natural · Corda náutica azul',
    description:
      'Tampo em madeira ripada natural sobre pés de alumínio preto, com o azul-marinho do trançado fechado. O nosso conjunto mais pedido em varandas gourmet.',
    specs: [
      '1 mesa retangular + 8 cadeiras Roma',
      'Tampo em madeira ripada natural',
      'Pés em alumínio preto fosco',
    ],
    price: 'Preço sob consulta',
    image: produtoJogoMarinhoRetangular,
    alt: 'Jogo Marinho com mesa de madeira ripada natural e oito cadeiras em corda náutica azul-marinho',
  },
  {
    id: 'jogo-marinho-puff',
    name: 'Jogo Marinho — 8 Lugares + Puff',
    category: 'Conjuntos',
    materials: 'Madeira ripada · Corda náutica marinho',
    description:
      'A versão completa para áreas gourmet amplas: acrescenta o puff banqueta em corda marinho com almofada, para receber além dos oito lugares.',
    specs: [
      '1 mesa + 8 cadeiras + 1 puff banqueta',
      'Cadeiras modelo Roma, trançado fechado',
      'Puff em corda marinho com almofada cinza',
    ],
    price: 'Preço sob consulta',
    image: produtoJogoMarinhoPuff,
    alt: 'Jogo Marinho de oito lugares com puff banqueta em corda náutica marinho',
  },
  {
    id: 'jogo-fendi',
    name: 'Jogo Fendi — 6 Lugares com Ombrelone',
    category: 'Conjuntos',
    materials: 'Alumínio fendi · Ombrelone bege',
    description:
      'Conjunto redondo com sombra própria. A cartela fendi e capuccino conversa com piscinas e áreas de resort — e não esquenta ao sol.',
    specs: [
      '1 mesa redonda + 6 cadeiras + ombrelone',
      'Tampo em alumínio ripado fendi, base central',
      'Ombrelone em tecido bege, haste preta',
    ],
    price: 'Preço sob consulta',
    image: produtoJogoFendi,
    alt: 'Jogo Fendi com mesa redonda, seis cadeiras e ombrelone bege',
  },
  {
    id: 'onda-verde-musgo',
    name: 'Conjunto Onda — Verde Musgo',
    category: 'Poltronas & Lounge',
    materials: 'Corda náutica verde musgo · Alumínio preto',
    description:
      'Duas poltronas de desenho orgânico curvo, dois puffs e mesinha com furo para ombrelone. O lounge que transforma a beira da piscina em sala de estar.',
    specs: [
      '2 poltronas modelo Onda + 2 puffs + mesinha',
      'Trançado em corda náutica verde musgo',
      'Estrutura em alumínio preto, desenho orgânico',
    ],
    price: 'Preço sob consulta',
    image: produtoOndaVerdeMusgo,
    alt: 'Conjunto Onda em corda náutica verde musgo com duas poltronas, puffs e mesa de apoio',
  },
  {
    id: 'espreguicadeira',
    name: 'Espreguiçadeira em Corda Náutica',
    category: 'Poltronas & Lounge',
    materials: 'Corda náutica mesclada · Alumínio preto',
    description:
      'Encosto reclinável em trançado mesclado sobre estrutura preta de secção quadrada. Feita para ficar molhada, ao sol, o ano inteiro.',
    specs: [
      'Encosto reclinável em múltiplas posições',
      'Trançado em corda náutica mesclada',
      'Estrutura em alumínio preto para área externa',
    ],
    price: 'Preço sob consulta',
    image: produtoEspreguicadeira,
    alt: 'Espreguiçadeiras em corda náutica mesclada com estrutura de alumínio preto à beira da piscina',
  },
  {
    id: 'banco-teca',
    name: 'Banco 2 Lugares — Teca e Alumínio',
    category: 'Bancos & Avulsos',
    materials: 'Madeira teca ripada · Alumínio preto',
    description:
      'Assento e encosto em teca ripada sobre estrutura de alumínio preto com braço reto. Ideal para jardim, varanda e hall de entrada.',
    specs: [
      'Banco de 2 lugares',
      'Assento e encosto em madeira teca ripada',
      'Estrutura em alumínio preto, braço reto',
    ],
    price: 'Preço sob consulta',
    image: produtoBancoTeca,
    alt: 'Banco de dois lugares com assento em madeira teca ripada e estrutura de alumínio preto',
  },
  {
    id: 'mesa-teca-giratoria',
    name: 'Mesa Redonda Teca com Giratório',
    category: 'Conjuntos',
    materials: 'Teca maciça ripada · Base trançada',
    description:
      'Tampo redondo em teca ripada com prato giratório integrado e base escultórica trançada. Pensada para o almoço de domingo que não acaba.',
    specs: [
      'Tampo redondo em teca ripada',
      'Prato giratório central integrado',
      'Base escultórica em corda náutica',
    ],
    price: 'Preço sob consulta',
    image: ambienteMesaTecaGiratoria,
    alt: 'Mesa redonda de teca ripada com prato giratório central e base trançada',
  },
  {
    id: 'mesa-redonda-preta',
    name: 'Mesa Redonda Preta — 4 Lugares',
    category: 'Conjuntos',
    materials: 'Alumínio ripado preto · Corda náutica preta',
    description:
      'Conjunto compacto de quatro lugares com cadeiras de trançado aberto. A escolha certa para varandas e apartamentos com área gourmet.',
    specs: [
      '1 mesa redonda + 4 cadeiras',
      'Tampo em alumínio ripado preto',
      'Cadeiras em corda náutica preta, trançado aberto',
    ],
    price: 'Preço sob consulta',
    image: ambienteMesaRedondaPreta,
    alt: 'Mesa redonda preta com quatro cadeiras em corda náutica preta em varanda gourmet',
  },
  {
    id: 'bistro-varanda',
    name: 'Bistrô Varanda — 2 Lugares',
    category: 'Bancos & Avulsos',
    materials: 'Tampo em madeira · Trançado palha natural',
    description:
      'Mesa bistrô com duas poltronas de braço em trançado palha e estrutura clara. Cabe em qualquer sacada e resolve o café da manhã ao ar livre.',
    specs: [
      '1 mesa bistrô redonda + 2 poltronas com braço',
      'Trançado em tom palha natural',
      'Estrutura leve para sacadas e varandas',
    ],
    price: 'Preço sob consulta',
    image: ambienteBistroVaranda,
    alt: 'Conjunto bistrô de varanda com mesa redonda e duas poltronas em trançado palha',
  },
  {
    id: 'base-mesa-x',
    name: 'Base de Mesa X — Estrutura Metálica',
    category: 'Estruturas',
    materials: 'Alumínio e metal preto fosco',
    description:
      'A nossa serralheria também atende separadamente: base modelo X 90×90 em metal preto fosco, pronta para receber tampo de madeira, vidro ou alumínio.',
    specs: [
      'Base modelo X para mesa redonda ou quadrada',
      'Alumínio e metal preto fosco 90×90',
      'Suporta tampo de madeira, vidro ou alumínio',
    ],
    price: 'Preço sob consulta',
    image: produtoBaseMesaX,
    alt: 'Base de mesa modelo X em metal preto fosco para tampos de madeira ou vidro',
  },
]
