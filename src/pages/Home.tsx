import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Colecao } from '@/components/sections/Colecao'
import { Contato } from '@/components/sections/Contato'
import { Depoimentos } from '@/components/sections/Depoimentos'
import { Hero } from '@/components/sections/Hero'
import { Processo } from '@/components/sections/Processo'
import { Showroom } from '@/components/sections/Showroom'
import { Sobre } from '@/components/sections/Sobre'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'

/** Landing page única da MadeirArt, navegada por âncoras no header fixo. */
export const Home = () => (
  <>
    <Header />

    <main>
      <Hero />
      <Colecao />
      <Sobre />
      <Processo />
      <Depoimentos />
      <Showroom />
      <Contato />
    </main>

    <Footer />
    <WhatsAppButton />
  </>
)
