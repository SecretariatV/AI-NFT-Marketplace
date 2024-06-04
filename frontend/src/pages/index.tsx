import { useGlobalContext } from '@/contexts/GlobalContext'
import Layout from '@/layout'
import HomeView from '@/components/Home'
import Marketplace from '@/components/MarketPlace'

export default function Home() {
  const { index } = useGlobalContext()

  return (
    <Layout>
      {index === 0 && <HomeView />}
      {index === 1 && <Marketplace />}
    </Layout>
  )
}
