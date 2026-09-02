import { useEffect, useState } from 'react'

/**
 * Devolve o id da seção em foco para destacar o item correspondente no menu.
 *
 * Em vez de IntersectionObserver — que depende da ordem em que os eventos
 * chegam e erra depois de saltos de âncora — a leitura é feita direto da
 * posição de rolagem: vale a última seção cujo topo já passou da "linha de
 * leitura", situada no primeiro terço da viewport.
 */
export const useActiveSection = (sectionIds: string[], readingLine = 0.35): string => {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '')

  useEffect(() => {
    if (sectionIds.length === 0) return

    let frame = 0

    const measure = () => {
      frame = 0

      const line = window.innerHeight * readingLine
      let current = sectionIds[0]

      for (const id of sectionIds) {
        const element = document.getElementById(id)
        if (!element) continue

        if (element.getBoundingClientRect().top <= line) current = id
      }

      // No fim da página, a última seção é sempre a ativa — senão âncoras
      // curtas no rodapé nunca chegam a cruzar a linha de leitura.
      const reachedBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2

      if (reachedBottom) current = sectionIds[sectionIds.length - 1]

      setActiveId((previous) => (previous === current ? previous : current))
    }

    const handleScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [sectionIds, readingLine])

  return activeId
}
