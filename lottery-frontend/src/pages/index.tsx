import type { NextPage } from 'next'
import { Layout } from '../layout'
import { Header, Histories, Joins, UserDetail } from 'components'

const Home: NextPage = () => {
  return (
    <Layout>
      <Header />
      <Histories />
      <Joins />
      <UserDetail />
    </Layout>
  )
}

export default Home
