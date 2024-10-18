import React, { useEffect, useState } from 'react'
import { Box, Image, Text, Grid, Center, Flex } from '@chakra-ui/react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { PrivateGet } from '../../src/utils/DataManagement'

type Props = {
  user: User
}

const ProfileCard = ({ user }: Props) => {
  const [privateCode, setPrivateCode] = useState<number | null>(null)

  useEffect(() => {
    const getPrivateCode = async () => {
      try {
        console.log('getting private code');
        const response = await PrivateGet('/users/code')
        console.log('user code is',response);
        setPrivateCode(response.code)
      } catch (error) {
        console.log(error)
        toast.error('Failed to get private code')
      }
    }
    getPrivateCode()
  }, [])

  return (
    <Center justifyContent={'center'}>
      <Box
        w={{ base: '60%', md: '45%' }}
        h="auto"
        bg="transparent"
        borderRadius={'30px'}
        borderColor={'card.border'}
        borderWidth={0.5}
        p={4}
        boxShadow="lg"
      >
        <Grid
          templateColumns={{ base: '1fr', md: '120px 1fr' }}
          gap={4}
          alignItems="center"
        >
          <Box w="100px" h="100px" overflow="hidden" borderRadius="md">
            <Image
              src={user.user?.profilePicture ?? 'https://picsum.photos/200'}
              alt="Profile Image"
              w="100%"
              h="100%"
              objectFit="cover"
            />
          </Box>
          <Box color="white">
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontSize="xl" fontWeight="bold">
                {user.user?.username}
              </Text>
              <Flex>
                <Image
                  src="/images/home/LInlogo.png"
                  alt="Linkedin Logo"
                  boxSize="15px"
                  mx={2}
                />
                <Image
                  src="/images/home/xLogo.png"
                  alt="X Logo"
                  boxSize="15px"
                  mx={2}
                />
                <Image
                  src="/images/home/githubLogo.png"
                  alt="Github Logo"
                  boxSize="15px"
                  mx={2}
                />
              </Flex>
            </Flex>

            <Text fontSize="md" color="gray.400">
              {user.user?.about ?? 'This is the bio of the user'}
            </Text>

            <Text fontWeight="bold" mt={2}>
              <Text as="span" color="textBrand" fontSize={12}>
                Secret Pin:
              </Text>{' '}
              <span style={{ fontSize: '25px' }}>
                {privateCode ?? 'Loading . . .'}
              </span>
            </Text>
          </Box>
        </Grid>
      </Box>
    </Center>
  )
}

export default ProfileCard
