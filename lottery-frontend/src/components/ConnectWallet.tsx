import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { Box, Button } from '@chakra-ui/react'
import { shortenAddress } from '../lib'

export const ConnectWallet = () => {
  const injectedConnector = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
  })
  const { chainId, account, activate, active, library } = useWeb3React<Web3Provider>()
  const onClick = () => {
    activate(injectedConnector)
  }

  useEffect(() => {})

  return (
    <Box color='white'>
      {/* <div>ChainId: {chainId}</div> */}
      {chainId != 4 && <>Change Network to Rinkeby</>}
      {/* <div>Account: {account}</div> */}
      {active ? (
        <Button disabled variant='outline' colorScheme='pink'>
          {shortenAddress(account!.toString())}
        </Button>
      ) : (
        <Button colorScheme='pink' onClick={onClick}>
          Connect Connect
        </Button>
      )}
    </Box>
  )
}
