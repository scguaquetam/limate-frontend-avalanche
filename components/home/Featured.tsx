import React, { Fragment, useEffect, useState } from 'react'
import {
  Box,
  Text,
  Button,
  Grid,
  Center,
  Flex,
  useTheme,
  useColorModeValue,
} from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import Image from 'next/image'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useRouter } from 'next/router'
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'

const Featured = () => {
  const { isConnected, chainId } = useAccount()
  const router = useRouter()
  if (isConnected) {
    //go to limate page
    router.push('/home')
  }
  const onWalletCreate = async () => {
    try {
      const sdk = new CoinbaseWalletSDK({
        appName: process.env.NEXT_PUBLIC_COINBASE_APP_NAME,
        appLogoUrl: 'https://picsum.photos/200',
        appChainIds: [chainId ?? 84532],
      });
      const provider = sdk.makeWeb3Provider();
      const [address]: any = await provider.request({
        method: 'eth_requestAccounts',
      });
      handleSuccess(address);
    } catch (error) {
      console.log('Error on wallet create', error);
      handleError(error);
    }
  };
  
  const handleSuccess = (_address: string) => {
    localStorage.setItem('smartAddress', _address);
    window.location.reload();
  };
  const handleError = (error: any) => {
    console.error('Error connecting wallet', error);
  };
  return (
    <Fragment>
      <Box mt={'100px'} w={'100%'} h={'100%'}>
        <Center mb={10} justifyContent={'center'} w={'100%'}>
          <Image
            src={'images/logo.svg'}
            alt="happ3n logo"
            height={400}
            width={400}
          />
        </Center>
        <Center justifyContent={'center'}>
          <Text fontSize="60px" fontWeight="bold" textAlign="center" w={'50%'}>
            {'Join Limate! And engage your community'}
          </Text>
        </Center>
        <Center mt={16}>
          <Box mx={2}>
            <ConnectButton.Custom>
              {({ openConnectModal }) => (
                <Button
                  onClick={openConnectModal}
                  color={'textPrimary'}
                  bg="transparent"
                  border="1px"
                  borderColor={'gray.600'}
                  borderRadius="md"
                  _hover={{ bg: 'gray.600' }}
                >
                  <Box as="span" mr={6}>
                    <Image
                      src="/images/WalletIcon.svg"
                      alt="Wallet Icon"
                      width={24}
                      height={24}
                    />
                  </Box>
                  Connect Your Wallet
                </Button>
              )}
            </ConnectButton.Custom>
          </Box>
          <Box mx={2}>

                <Button
                  onClick={onWalletCreate}
                  color={'textPrimary'}
                  bg="transparent"
                  border="1px"
                  borderColor={'gray.600'}
                  borderRadius="md"
                  _hover={{ bg: 'gray.600' }}
                >
                  <Box as="span" mr={6}>
                    <Image
                      src="/images/SmartWalletIcon.svg"
                      alt="Wallet Icon"
                      width={24}
                      height={24}
                    />
                  </Box>
                  Create Smart Wallet
                </Button>
          </Box>
        </Center>
      </Box>
    </Fragment>
  )
}

export default Featured
