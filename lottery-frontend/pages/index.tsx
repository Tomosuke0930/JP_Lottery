import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spacer,
  Text,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import { Layout } from '../layout'

const Home: NextPage = () => {
  return (
    <Layout>
      <Flex>
        <Heading color='base.dark'>JP Lottery</Heading>
        <Spacer />
        <Button
          colorScheme='pink'
          // onClick={connectWalletHandler}
        >
          Connect Wallet
        </Button>
      </Flex>
      <Grid h='200px' templateColumns='repeat(3, 1fr)' gap={4} py={12}>
        <GridItem colSpan={2}>
          <Box py={4}>
            <Text fontSize='sm' color='base.dark' py={2}>
              Enter the lottery by sending 0.01 Ether
            </Text>
            <Button colorScheme='blue' variant='outline'>
              Play Now
            </Button>
          </Box>
          <Box py={4}>
            <Text fontSize='sm' color='base.dark' py={2}>
              <b> Admin only:</b> Pick Winner
            </Text>
            <Button colorScheme='teal' variant='outline'>
              Pick Winner
            </Button>
          </Box>
          <Box py={4}>
            <Text fontSize='sm' color='base.dark' py={2}>
              <b> Admin only:</b> Pay Winner
            </Text>
            <Button colorScheme='green' variant='outline'>
              Pay Winner
            </Button>
          </Box>
        </GridItem>
        <GridItem colSpan={1}>
          <Box
            borderWidth='1px'
            borderRadius='md'
            overflow='hidden'
            my={4}
            pt={4}
            px={4}
            pb={6}
            boxShadow='lg'
          >
            <Text fontSize='2xl' fontWeight='bold'>
              Lottery History
            </Text>
          </Box>
          <Box
            borderWidth='1px'
            borderRadius='md'
            overflow='hidden'
            my={4}
            pt={4}
            px={4}
            pb={6}
            boxShadow='lg'
          >
            <Text fontSize='2xl' fontWeight='bold'>
              Players
            </Text>
          </Box>
          <Box
            borderWidth='1px'
            borderRadius='md'
            overflow='hidden'
            my={4}
            pt={4}
            px={4}
            pb={6}
            boxShadow='lg'
          >
            <Text fontSize='2xl' fontWeight='bold'>
              Pot
            </Text>
          </Box>
        </GridItem>
      </Grid>
    </Layout>
  )
}

export default Home
