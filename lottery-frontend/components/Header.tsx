import { Box, Flex, Heading, Spacer, Text } from '@chakra-ui/react'
import { ConnectWallet } from './ConnectWallet'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { useEffect, useState } from 'react'
import ABI from '../abi.json'
import { ethers } from 'ethers'
// import { moment } from 'moment'

export const Header = () => {
  // const [userNumber, setUserNumber] = useState<number>(0)
  // // const [lotContract, setLotContract] = useState()
  const [provider, setProvider] = useState<Web3Provider>()
  const [lotIds, setLotIds] = useState<number>(0)
  const [restTime, setRestTime] = useState<number>(0)

  const { chainId, account, activate, active, library } = useWeb3React<Web3Provider>()

  // // Ethers

  const contractAddr = '0xf338801BB41B73b23b6A0e1Ee8016d6c7122A881' // updated 17:50
  const contractAbi = ABI.abi
  const lotContract = new ethers.Contract(contractAddr, contractAbi, provider)

  useEffect(() => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(tempProvider)

    getLotIds()
    // getLotRestTime()
  }, [active])

  // const getPlayersNumber = async () => {
  //   // const signer = lotContract.connect(library?.getSigner())
  //   const nowNumber = await lotContract.getPlayersLength()
  //   console.log('lotNumber === ', nowNumber.toString())
  //   // console.log('SUCCESS!!!!')
  //   // console.log('lotContract.getPlayersLength === ', await lotContract.getPlayersLength())
  //   // const userNumber = await lotContract.getLotteryLength()
  //   // const userNumber = await lotContract.getPlayersLength()
  //   // console.log(userNumber.toString())
  //   setUserNumber(nowNumber)
  //   console.log('userNumber ===', userNumber)
  // }
  const getLotIds = async () => {
    const nowLotIds = await lotContract.getLotteryId()
    setLotIds(nowLotIds)
    console.log('lotIds[Header] ===', lotIds.toString())
  }
  // const getLotRestTime = async () => {
  //   const nowLotRestBlockTime = await lotContract.getLotRestTime()
  //   //コントラクト更新したら！
  //   const nowLotRestTime = await moment.unix(nowLotRestBlockTime)
  //   setRestTime(nowLotRestTime)

  //   // block.timestampで帰ってくる！始まった時間
  //   // 始まった時間 + 1days = finish
  //   // 残りの時間 = finish - block.timestamp
  // }
  return (
    <Box>
      <Flex pt={12} pb='4' px={24}>
        <Spacer />
        <Spacer />
        <Heading color='white'>TomLot 🤑</Heading>
        <Spacer />
        <ConnectWallet />
      </Flex>
      <Flex px={36}>
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
