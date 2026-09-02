/** Junta classes condicionais sem dependências externas. */
export const cn = (...classes: Array<string | false | null | undefined>): string =>
  classes.filter(Boolean).join(' ')

/** Formata o número da empresa no padrão exigido pela API do WhatsApp (somente dígitos). */
export const toWhatsAppNumber = (raw: string): string => raw.replace(/\D/g, '')

/** Monta o link do WhatsApp com mensagem pré-preenchida. */
export const buildWhatsAppLink = (phone: string, message: string): string =>
  `https://wa.me/${toWhatsAppNumber(phone)}?text=${encodeURIComponent(message)}`
