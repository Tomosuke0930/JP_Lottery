import { Box, Button, Center, Flex, Grid, GridItem, Input, Text } from '@chakra-ui/react'

export const UserDetail = () => {
  return (
    <Grid color='white' bg='#181B1E' mt='4' borderRadius='18' p={4} templateColumns='repeat(2, 1fr)' gap={4} textAlign='center'>
      <GridItem py={4} colSpan={1}>
        <Text fontSize='sm' py={2}>
          You can check your bought Number from here👇
        </Text>
        <Center>
          <Button colorScheme='yellow'>Check Now</Button>
        </Center>
      </GridItem>
      <GridItem py={4} colSpan={1}>
        <Text fontSize='sm' py={2}>
          <b> Your Bought Number</b>
        </Text>
        <Box>1,2,3,4,5</Box>
      </GridItem>
    </Grid>
  )
}
