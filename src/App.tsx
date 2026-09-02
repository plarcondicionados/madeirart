import { SmoothScrollProvider } from '@/hooks/useSmoothScroll'
import { Home } from '@/pages/Home'

const App = () => (
  <SmoothScrollProvider>
    <Home />
  </SmoothScrollProvider>
)

export default App
