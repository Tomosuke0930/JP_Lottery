import { Box, Container, ContainerProps } from '@chakra-ui/react'
import { ReactNode, VFC } from 'react'

type Props = ContainerProps & {
  children: ReactNode
}

export const Layout: VFC<Props> = ({ children, maxW = '6xl' }) => {
  return (
    <>
      <Container maxW={maxW} px='16' py='4'>
        {children}
        <Box h='16' />
      </Container>
    </>
  )
}
