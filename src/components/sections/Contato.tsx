import { motion } from 'framer-motion'
import { useState, type FormEvent } from 'react'

import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { company, directContacts, projectTypes } from '@/data/site'
import { buildWhatsAppLink, cn } from '@/lib/utils'

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.896 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.945c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.652a11.94 11.94 0 005.71 1.454h.006c6.585 0 11.946-5.36 11.949-11.945a11.86 11.86 0 00-3.48-8.408" />
  </svg>
)

type Briefing = {
  nome: string
  telefone: string
  tipo: string
  medidas: string
  detalhes: string
}

const EMPTY: Briefing = { nome: '', telefone: '', tipo: '', medidas: '', detalhes: '' }

type BriefingErrors = Partial<Record<keyof Briefing, string>>

const validate = (values: Briefing): BriefingErrors => {
  const errors: BriefingErrors = {}

  if (values.nome.trim().length < 2) errors.nome = 'Informe o seu nome.'
  if (values.telefone.replace(/\D/g, '').length < 10) {
    errors.telefone = 'Informe um telefone com DDD.'
  }
  if (!values.tipo) errors.tipo = 'Escolha o tipo de peça.'
  if (values.detalhes.trim().length < 10) {
    errors.detalhes = 'Descreva um pouco mais o que você precisa.'
  }

  return errors
}

/** Máscara progressiva de telefone brasileiro: (16) 99755-3582. */
const maskPhone = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 11)

  if (digits.length <= 2) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

/**
 * Transforma o briefing em uma mensagem pronta de WhatsApp.
 *
 * É isto que substitui o banco de dados: nada fica guardado no site — o próprio
 * cliente envia as informações, e elas chegam organizadas no WhatsApp da
 * MadeirArt, já com nome e telefone para retorno.
 */
const buildBriefingMessage = (values: Briefing): string =>
  [
    '*Pedido de orçamento — site MadeirArt*',
    '',
    `*Nome:* ${values.nome.trim()}`,
    `*Telefone:* ${values.telefone.trim()}`,
    `*Tipo de peça:* ${values.tipo}`,
    values.medidas.trim() ? `*Medidas / lugares:* ${values.medidas.trim()}` : null,
    '',
    '*Detalhes do projeto:*',
    values.detalhes.trim(),
  ]
    .filter((line) => line !== null)
    .join('\n')

export const Contato = () => {
  const [values, setValues] = useState<Briefing>(EMPTY)
  const [errors, setErrors] = useState<BriefingErrors>({})
  const [isSent, setIsSent] = useState(false)

  const setField = (field: keyof Briefing) => (value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    window.open(
      buildWhatsAppLink(company.contact.whatsapp, buildBriefingMessage(values)),
      '_blank',
      'noopener',
    )

    setIsSent(true)
    setValues(EMPTY)
    window.setTimeout(() => setIsSent(false), 12000)
  }

  return (
    <section id="contato" className="surface-verniz-alt py-24 sm:py-32 lg:py-40">
      <div className="container-luxe">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Briefing que vira mensagem de WhatsApp */}
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Fale com o ateliê"
              title={
                <>
                  Monte o seu pedido —{' '}
                  <span className="italic text-teca-dark">nós recebemos no WhatsApp</span>
                </>
              }
              description="Preencha os campos e toque em enviar: abrimos o WhatsApp com tudo já escrito, organizado e pronto. Você confere, aperta enviar e a conversa começa direto com quem fabrica."
            />

            <form onSubmit={handleSubmit} noValidate className="mt-12 space-y-8">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <label htmlFor="nome" className="field-label">
                    Nome completo
                  </label>
                  <input
                    id="nome"
                    type="text"
                    autoComplete="name"
                    value={values.nome}
                    onChange={(event) => setField('nome')(event.target.value)}
                    aria-invalid={Boolean(errors.nome)}
                    aria-describedby={errors.nome ? 'erro-nome' : undefined}
                    className={cn('field-input', errors.nome && 'border-red-800/60')}
                    placeholder="Como podemos te chamar?"
                  />
                  {errors.nome && (
                    <p id="erro-nome" className="mt-2 text-[0.75rem] text-red-800">
                      {errors.nome}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="telefone" className="field-label">
                    Seu telefone / WhatsApp
                  </label>
                  <input
                    id="telefone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={values.telefone}
                    onChange={(event) => setField('telefone')(maskPhone(event.target.value))}
                    aria-invalid={Boolean(errors.telefone)}
                    aria-describedby={errors.telefone ? 'erro-telefone' : undefined}
                    className={cn('field-input', errors.telefone && 'border-red-800/60')}
                    placeholder="(16) 99999-0000"
                  />
                  {errors.telefone && (
                    <p id="erro-telefone" className="mt-2 text-[0.75rem] text-red-800">
                      {errors.telefone}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <label htmlFor="tipo" className="field-label">
                    Tipo de peça
                  </label>
                  <select
                    id="tipo"
                    value={values.tipo}
                    onChange={(event) => setField('tipo')(event.target.value)}
                    aria-invalid={Boolean(errors.tipo)}
                    aria-describedby={errors.tipo ? 'erro-tipo' : undefined}
                    className={cn(
                      'field-input cursor-pointer',
                      !values.tipo && 'text-varnish-400',
                      errors.tipo && 'border-red-800/60',
                    )}
                  >
                    <option value="">Selecione…</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type} className="text-varnish-900">
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.tipo && (
                    <p id="erro-tipo" className="mt-2 text-[0.75rem] text-red-800">
                      {errors.tipo}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="medidas" className="field-label">
                    Medidas ou nº de lugares{' '}
                    <span className="normal-case tracking-normal text-varnish-400">(opcional)</span>
                  </label>
                  <input
                    id="medidas"
                    type="text"
                    value={values.medidas}
                    onChange={(event) => setField('medidas')(event.target.value)}
                    className="field-input"
                    placeholder="Ex.: 2,40 m — 8 lugares"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="detalhes" className="field-label">
                  Detalhes do projeto
                </label>
                <textarea
                  id="detalhes"
                  rows={4}
                  value={values.detalhes}
                  onChange={(event) => setField('detalhes')(event.target.value)}
                  aria-invalid={Boolean(errors.detalhes)}
                  aria-describedby={errors.detalhes ? 'erro-detalhes' : undefined}
                  className={cn('field-input resize-none', errors.detalhes && 'border-red-800/60')}
                  placeholder="Ex.: mesa em teca com 8 cadeiras em corda areia, para varanda gourmet coberta. Cor da estrutura preta."
                />
                {errors.detalhes && (
                  <p id="erro-detalhes" className="mt-2 text-[0.75rem] text-red-800">
                    {errors.detalhes}
                  </p>
                )}
              </div>

              <div className="pt-2">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-flex w-full items-center justify-center gap-3 bg-[#25D366] px-8 py-5 text-varnish-50 shadow-[0_16px_34px_-18px_rgba(37,211,102,0.9)] sm:w-auto"
                >
                  <WhatsAppIcon className="h-5 w-5 shrink-0 fill-current" />
                  <span className="text-[0.72rem] font-medium uppercase tracking-widest">
                    Enviar pedido pelo WhatsApp
                  </span>
                </motion.button>

                {isSent ? (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="status"
                    className="mt-5 text-[0.85rem] leading-relaxed text-teca-dark"
                  >
                    Pronto — abrimos o WhatsApp com o seu pedido escrito. Confira a mensagem e
                    toque em enviar para ela chegar até nós.
                  </motion.p>
                ) : (
                  <p className="mt-5 text-[0.8rem] leading-relaxed text-varnish-500">
                    Nada é armazenado neste site: os dados vão direto para a conversa do WhatsApp,
                    no seu próprio aparelho.
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Atendimento direto */}
          <div className="lg:col-span-5 lg:pl-6">
            <Reveal direction="left" delay={0.12}>
              <div className="border border-varnish-800/12 bg-varnish-100 p-8 lg:p-10">
                <p className="eyebrow">Prefere falar agora?</p>

                <p className="mt-5 text-[0.95rem] leading-relaxed text-varnish-700">
                  Chame direto no WhatsApp do ateliê. Se puder, já mande foto do espaço e as
                  medidas aproximadas — assim adiantamos o orçamento na primeira resposta.
                </p>

                <ul className="mt-8 space-y-3">
                  {directContacts.map((contact) => (
                    <li key={contact.whatsapp}>
                      <a
                        href={buildWhatsAppLink(contact.whatsapp, company.whatsappMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 border border-varnish-800/15 bg-varnish-50 px-5 py-4 transition-all duration-500 ease-luxe hover:border-[#25D366] hover:bg-[#25D366]"
                      >
                        <WhatsAppIcon className="h-6 w-6 shrink-0 fill-[#25D366] transition-colors duration-500 group-hover:fill-varnish-50" />

                        <span className="flex flex-col leading-none">
                          <span className="text-[0.6rem] uppercase tracking-brand text-varnish-500 transition-colors duration-500 group-hover:text-varnish-50/80">
                            {contact.name}
                          </span>
                          <span className="mt-2 font-display text-[1.15rem] text-varnish-900 transition-colors duration-500 group-hover:text-varnish-50">
                            {contact.display}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-9 border-t border-varnish-800/12 pt-7">
                  <p className="eyebrow">Horário de atendimento</p>

                  <dl className="mt-4 space-y-2.5">
                    {company.hours.map((slot) => (
                      <div
                        key={slot.days}
                        className="flex items-baseline justify-between gap-4 text-[0.85rem]"
                      >
                        <dt className="text-varnish-600">{slot.days}</dt>
                        <dd className="text-varnish-900">{slot.time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
