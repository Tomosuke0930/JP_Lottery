import { Box, Flex, Grid, GridItem, Spacer, Text, Link, Center } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { useEffect, useState } from 'react'
import ABI from '../abi.json'
import { ethers } from 'ethers'
import { shortenAddress } from '../lib'

export const Histories = () => {
  const [userNumber, setUserNumber] = useState<number>(0)
  const [lotNumber, setLotNumber] = useState<number>(0)
  const [lotIds, setLotIds] = useState<number>(0)
  const [provider, setProvider] = useState<Web3Provider>()
  const [luckyPerson, setLuckyPerson] = useState('')
  const [lastLotId, setLastLotId] = useState(0)
  const { chainId, account, activate, active, library } = useWeb3React<Web3Provider>()

  const contractAddr = '0xf338801BB41B73b23b6A0e1Ee8016d6c7122A881' // updated 17:50
  const contractAbi = ABI.abi
  const lotContract = new ethers.Contract(contractAddr, contractAbi, provider)

  useEffect(() => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(tempProvider)

    getPlayersNumber()
    getPotsNumbers()
    getLotIds() // ここが問題だった

    /**
     * getPlayersNumber done!
     * getBoughtNumber
     * getHistory
     * getLotTimetoCalRestTime
     */
  }, [active])

  const getPlayersNumber = async () => {
    // const signer = lotContract.connect(library?.getSigner())
    const nowNumber = await lotContract.getPlayersLength()
    setUserNumber(nowNumber)
    console.log('userNumber ===', userNumber.toString())
  }

  const getPotsNumbers = async () => {
    const nowLotNumber = await lotContract.getLotChancesLength()
    setLotNumber(nowLotNumber)
    console.log('lotNumber ===', lotNumber.toString())
  }

  const getLotIds = async () => {
    const nowLotIds = await lotContract.getLotteryId()
    //ここで現状のlotIdを得ている
    console.log('nowLotIds1 ===', nowLotIds)
    console.log('nowLotIds2 ===', nowLotIds.toString())
    console.log('nowLotIds3 ===', parseInt(nowLotIds.toString()))
    await setLotIds(parseInt(nowLotIds.toString()))
    // console.log('lotIds[Histories] ===', lotIds.toString())
    // console.log('lotIds[Header in Histories] ===', lotIds.toString())
    // setLastLotId(parseFloat(lotIds.toString()) - 1)
    const nowLuckyPerson = await lotContract.getLuckyPerson(parseFloat(lotIds.toString()))
    console.log('nowLuckyPerson ===', nowLuckyPerson)
    setLuckyPerson(nowLuckyPerson)
  }

  //ここでlotIdsが0>だったらみたいな感じで条件分岐してもいいかもね

  return (
    <div>
      <Grid color='white' bg='#181B1E' my='4' borderRadius='18' p={4} templateColumns='repeat(3, 1fr)' gap={4} textAlign='center'>
        <GridItem borderRadius='md' overflow='hidden' bg='#212429' p={4}>
          <Text fontSize='2xl' fontWeight='bold'>
            History
          </Text>
          <Box>
            <Flex mt='4'>
              <Box>{lotIds > 0 ? lotIds - 1 : <></>}</Box>
              <Spacer />
              <Box> {shortenAddress(luckyPerson!.toString())}</Box>
            </Flex>
            {/* <Flex>
              <Box># 1043</Box>
              <Spacer />
              <Box>0x792...3F</Box>
            </Flex>
            <Flex>
              <Box># 1042</Box>
              <Spacer />
              <Box>0x792...3F</Box>
            </Flex> */}
            {/* <Flex>
              <Link href='https://twitter.com/manabubannai' isExternal color='blue.500'>
                <Text fontSize='sm'>» See more</Text>
              </Link>
            </Flex> */}
          </Box>
        </GridItem>
        <GridItem borderRadius='md' overflow='hidden' bg='#212429' p={4} textAlign='center'>
          <Text fontSize='2xl' fontWeight='bold'>
            Players
          </Text>
          <Text mt='4' fontSize='4xl'>
            {userNumber.toString()}
          </Text>
        </GridItem>
        <GridItem borderRadius='md' overflow='hidden' bg='#212429' p={4}>
          <Text fontSize='2xl' fontWeight='bold'>
            Total Lot
          </Text>
          <Flex mx='4' mt='4'>
            <Spacer />
            <Text fontSize='4xl'>{lotNumber.toString()}</Text>
            <Spacer />
            <Text fontSize='4xl' pr='2'>
              {(lotNumber * 0.01).toString()}
            </Text>
            <Text pt='7' fontSize='xs'>
              ETH
            </Text>
          </Flex>
        </GridItem>
      </Grid>
    </div>
  )
}
