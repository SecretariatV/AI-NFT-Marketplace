import { useGlobalContext } from '@/contexts/GlobalContext'
import Layout from '@/layout'
import { useEffect } from 'react'
import ViewData from '@/components/ViewData'

export default function ViewPage() {
  const { setIndex } = useGlobalContext()

  useEffect(() => {
    setIndex(1)
  }, [])

  return (
    <Layout>
      <ViewData />
    </Layout>
  )
}
