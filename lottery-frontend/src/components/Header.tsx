import { Box, Flex, Heading, Spacer, Text } from '@chakra-ui/react'
import { ConnectWallet } from './ConnectWallet'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { useEffect, useState } from 'react'
import ABI from '../../abi.json'

import { ethers } from 'ethers'
// なんでだろう？　https://momentjs.com/
import { moment } from 'moment'

export const Header = () => {
  const [provider, setProvider] = useState<Web3Provider>()
  const [lotIds, setLotIds] = useState<number>(0)
  const [restTime, setRestTime] = useState<number>(0)

  const { chainId, account, activate, active, library } = useWeb3React<Web3Provider>()

  // // Ethers

  const contractAddr = '0x7EeB1cFDDf98AD6F6b05629850F7a4a6002C4C7b' // updated 17:50
  const contractAbi = ABI.abi
  const lotContract = new ethers.Contract(contractAddr, contractAbi, provider)

  useEffect(() => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(tempProvider)

    getLotIds()
    getLotRestTime()
  }, [active])

  const getLotIds = async () => {
    const nowLotIds = await lotContract.getLotteryId()
    setLotIds(nowLotIds)
    console.log('lotIds[Header] ===', lotIds.toString())
  }
  const getLotRestTime = async () => {
    const nowLotRestBlockTime = await lotContract.getLotRestTime()
    const nowLotRestTime = await moment.unix(nowLotRestBlockTime)
    setRestTime(nowLotRestTime)
  }
  return (
    <Box>
      <Flex pt='12' pb='4' px='24'>
        <Spacer />
        <Spacer />
        <Heading color='white'>TomLot 🤑</Heading>
        <Spacer />
        <ConnectWallet />
      </Flex>
      <Flex px='36'>
        <Flex color='white' justifyContent='center'>
          <Text mt='6' mr='4'>
            Now
          </Text>
          <Text fontSize='4xl' as='u'>
            #{lotIds.toString()}
          </Text>
        </Flex>
        <Spacer />
        <Flex color='white' justifyContent='center'>
          <Text mt='6' mr='4'>
            Last
          </Text>
          <Text fontSize='4xl' as='u'>
            {restTime}
          </Text>
        </Flex>
      </Flex>
    </Box>
  )
}
