import { Box, Button, Flex, Grid, GridItem, Heading, Spacer, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { Layout } from '../layout'
import { ConnectWallet } from '../components/ConnectWallet'
import { Histories } from '../components/Histories'
import { Header } from '../components/Header'
import { Joins } from '../components/Joins'
import { UserDetail } from '../components/UserDetail'

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
