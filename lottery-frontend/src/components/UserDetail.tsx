import { Box, Button, Center, Flex, Grid, GridItem, Input, Text } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { useEffect, useState } from 'react'
import ABI from '../../abi.json'

import { ethers } from 'ethers'

export const UserDetail = () => {
  type CheckNums = number[]
  const { chainId, account, activate, active, library } = useWeb3React<Web3Provider>()
  const [provider, setProvider] = useState<Web3Provider>()
  const [userNum, setUserNum] = useState([0])
  // Ethers
  const contractAddr = '0x7EeB1cFDDf98AD6F6b05629850F7a4a6002C4C7b' // updated 17:50
  const contractAbi = ABI.abi
  const lotContract = new ethers.Contract(contractAddr, contractAbi, provider)

  useEffect(() => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(tempProvider)
  }, [active])

  const onCheck = async () => {
    const checkedNum = await lotContract.getPurchasedNumber()
    const userNum = await cutZero(checkedNum)
    setUserNum(userNum)
  }

  const cutZero = async (nums: CheckNums) => {
    let userNums: CheckNums = new Array()
    for (let i = 0; i < nums.length; i++) {
      if (i != 0) {
        userNums.push(i)
      }
    }
    return userNums
  }

  return (
    <Grid color='white' bg='#181B1E' mt='4' borderRadius='18' p='4' templateColumns='repeat(2, 1fr)' gap={4} textAlign='center'>
      <GridItem py='4' colSpan={1}>
        <Text fontSize='sm' py='2'>
          You can check your bought Number from here👇
        </Text>
        <Center>
          <Button colorScheme='yellow' color='white' onClick={onCheck}>
            Check Now
          </Button>
        </Center>
      </GridItem>
      <GridItem py='4' colSpan={1}>
        <Text fontSize='sm' py='2'>
          <b> Your Bought Number</b>
        </Text>
        <Box>{userNum}</Box>
      </GridItem>
    </Grid>
  )
}
