/**
 * Fonte única de conteúdo do site MadeirArt.
 * Centralizar aqui mantém os componentes puramente visuais e permite que a
 * equipe da marca atualize textos sem tocar em JSX.
 */

export const company = {
  name: 'MadeirArt',
  tagline: 'Marcenaria · Serralheria · Mesas Artesanais',
  city: 'Ribeirão Preto',
  state: 'SP',
  address: {
    street: 'Rua Doutor João Guião, 133',
    city: 'Ribeirão Preto',
    state: 'SP',
  },
  hours: [
    { days: 'Segunda a sexta', time: '08h — 18h' },
    { days: 'Sábado', time: '09h — 13h' },
    { days: 'Domingo e feriados', time: 'Visitas com hora marcada' },
  ],
  /**
   * O site é estático e não guarda dados de quem entra em contato — por isso
   * todo o atendimento acontece diretamente no WhatsApp da empresa.
   *
   * Este é o número principal: recebe o briefing do formulário, o botão
   * flutuante e os pedidos de orçamento vindos dos cards da coleção.
   */
  contact: {
    whatsapp: '5516997553582',
    whatsappDisplay: '(16) 99755-3582',
  },
  whatsappMessage:
    'Olá! Vim pelo site da MadeirArt e gostaria de um orçamento para móveis de área gourmet.',
  mapsEmbedUrl:
    'https://www.google.com/maps?q=Rua+Doutor+Jo%C3%A3o+Gui%C3%A3o,+133,+Ribeir%C3%A3o+Preto+-+SP&output=embed',
  mapsLink:
    'https://www.google.com/maps/search/?api=1&query=Rua+Doutor+Jo%C3%A3o+Gui%C3%A3o,+133,+Ribeir%C3%A3o+Preto+-+SP',
} as const

export type NavItem = {
  label: string
  href: string
  /** id da seção correspondente, usado para destacar o item ativo no menu */
  id: string
}

export const navigation: NavItem[] = [
  { label: 'Início', href: '#inicio', id: 'inicio' },
  { label: 'Coleção', href: '#colecao', id: 'colecao' },
  { label: 'Sobre', href: '#sobre', id: 'sobre' },
  { label: 'Processo Artesanal', href: '#processo', id: 'processo' },
  { label: 'Contato', href: '#contato', id: 'contato' },
]

/** Números de apoio exibidos na seção Sobre. */
export const brandStats = [
  { value: '20+', label: 'anos de marcenaria e serralheria' },
  { value: '100%', label: 'peças produzidas sob medida' },
  { value: 'Teca', label: 'madeira nobre tratada para exterior' },
  { value: 'RP', label: 'ateliê e showroom em Ribeirão Preto' },
]

/**
 * Contatos diretos do ateliê, exibidos na seção Contato e no rodapé.
 * O primeiro da lista é o mesmo número de `company.contact`.
 */
export type DirectContact = {
  name: string
  whatsapp: string
  display: string
}

export const directContacts: DirectContact[] = [
  {
    name: 'Atendimento',
    whatsapp: '5516997553582',
    display: '(16) 99755-3582',
  },
  {
    name: 'Edilson',
    whatsapp: '5516997153724',
    display: '(16) 99715-3724',
  },
  {
    name: 'Werley Alencar',
    whatsapp: '5516997153971',
    display: '(16) 99715-3971',
  },
]

/** Opções do campo "tipo de peça" no briefing da seção de contato. */
export const projectTypes = [
  'Conjunto de mesa + cadeiras',
  'Poltronas / lounge',
  'Espreguiçadeira',
  'Banco ou peça avulsa',
  'Mesa sob medida',
  'Estrutura metálica (serralheria)',
  'Outro / não sei ainda',
]
