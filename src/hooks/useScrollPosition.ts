import { useEffect, useState } from 'react'

/** true assim que a página passa do limiar informado — usado para condensar o header. */
export const useScrollPosition = (threshold = 40): boolean => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > threshold)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return isScrolled
}
