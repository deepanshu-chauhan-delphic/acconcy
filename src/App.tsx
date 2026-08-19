import { Cta } from "./components/Cta"
import { Footer } from "./components/Footer"
import { Hero } from "./components/Hero"
import { Leadership } from "./components/Leadership"
import { Navbar } from "./components/Navbar"
import { Services } from "./components/Services"
import { StatBar } from "./components/StatBar"
import { Story } from "./components/Story"
import { useLenis } from "./hooks/useLenis"

function App() {
  useLenis()

  return (
    <div className="site-shell bg-primary text-secondary">
      <Navbar />
      <main>
        <Hero />
        <StatBar />
        <Story />
        <Services />
        <Leadership />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}

export default App
