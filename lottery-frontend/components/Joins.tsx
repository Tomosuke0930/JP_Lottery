import { Box, Button, Center, Flex, Grid, GridItem, Input, Text } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { useEffect, useState } from 'react'
import ABI from '../abi.json'
import { ethers } from 'ethers'
export const Joins = () => {
  const { chainId, account, activate, active, library } = useWeb3React<Web3Provider>()
  const [provider, setProvider] = useState<Web3Provider>()
  const [value, setValue] = useState<number>(0)
  const handleChange = (event: any) => setValue(event.target.value)
  // const [signer, setSigner] = useState({})

  // Ethers
  const contractAddr = '0xf338801BB41B73b23b6A0e1Ee8016d6c7122A881' // updated 17:50
  const contractAbi = ABI.abi
  const lotContract = new ethers.Contract(contractAddr, contractAbi, provider)

  useEffect(() => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(tempProvider)
    // let nowSigner = lotContract.connect(provider?.getSigner())
    // これだとエラー出る！
    // setSigner(nowSigner)
  }, [active])

  const onPayWinner = async () => {
    const signer = lotContract.connect(library!.getSigner())
    // ここでエラーだったのはuseEffectで更新された時に、providerないじゃねえかよとなったから！！！
    const paywinner = await signer.Keccahappyoooooo()
    console.log(paywinner)
  }

  const onBuy = async () => {
    const signer = lotContract.connect(library!.getSigner())
    // const buy = await signer.enter(value * 0.01)
    const buy = await signer.enter(value, { value: ethers.utils.parseUnits((value * 0.01).toString(), 'ether') })

    console.log(buy)
  }
  return (
    <Grid color='white' bg='#181B1E' mt='4' borderRadius='18' p={4} templateColumns='repeat(2, 1fr)' textAlign='center'>
      <GridItem py={4} ml='8'>
        <Text fontSize='sm' py={2}>
          Buy the lot 0.01 Ether per 1 number
        </Text>
        <Center>
          <Box>
            <Input htmlSize={4} width='auto' mr='6' placeholder='0' value={value} onChange={handleChange} />
            <Text fontSize='xs' mr='6'>
              Lot Number
            </Text>
          </Box>
          <Button colorScheme='blue' onClick={onBuy}>
            Buy Now
          </Button>
        </Center>
      </GridItem>
      {/* <GridItem py={4}>
        <Text fontSize='sm' py={2}>
          <b> Admin only:</b> Pick Winner
        </Text>
        <Button colorScheme='teal'>Pick Winner</Button>
      </GridItem> */}
      <GridItem py={4} mr='8'>
        <Text fontSize='sm' py={2}>
          <b> Admin only:</b> Pay Winner
        </Text>
        <Button colorScheme='green' onClick={onPayWinner}>
          Pay Winner
        </Button>
      </GridItem>
    </Grid>
  )
}
