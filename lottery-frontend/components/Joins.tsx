import { Box, Button, Center, Flex, Grid, GridItem, Input, Text } from '@chakra-ui/react'

export const Joins = () => {
  return (
    <Grid color='white' bg='#181B1E' mt='4' borderRadius='18' p={4} templateColumns='repeat(3, 1fr)' gap={4} textAlign='center'>
      <GridItem py={4}>
        <Text fontSize='sm' py={2}>
          Buy the lot 0.01 Ether per 1 number
        </Text>
        <Center>
          <Box>
            <Input htmlSize={4} width='auto' mr='6' placeholder='0' />
            <Text fontSize='xs' mr='6'>
              Lot Number
            </Text>
          </Box>
          <Button colorScheme='blue'>Buy Now</Button>
        </Center>
      </GridItem>
      <GridItem py={4}>
        <Text fontSize='sm' py={2}>
          <b> Admin only:</b> Pick Winner
        </Text>
        <Button colorScheme='teal'>Pick Winner</Button>
      </GridItem>
      <GridItem py={4}>
        <Text fontSize='sm' py={2}>
          <b> Admin only:</b> Pay Winner
        </Text>
        <Button colorScheme='green'>Pay Winner</Button>
      </GridItem>
    </Grid>
  )
}
