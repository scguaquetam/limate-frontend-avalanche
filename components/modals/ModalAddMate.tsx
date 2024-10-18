import {
  Box,
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  Image,
} from '@chakra-ui/react'
import React from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
  username: string
  code: string
  handleConfirm: () => void
  modalState: 'confirm' | 'loading' | 'verified'
  txHash: string
  profileImageUrl: string
  about: string
}

const ModalAddMate = ({
  isOpen,
  onClose,
  username,
  code,
  handleConfirm,
  modalState,
  txHash,
  profileImageUrl,
  about,
}: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="rgba(0, 0, 0, 0.6)" backdropFilter="blur(10px)" />
      <ModalContent bg={'gray.800'} color={'white'} borderRadius="10px" p={4}>
        <ModalHeader
          textAlign="center"
          fontSize="xl"
          fontWeight="bold"
          color="textBrand"
        >
          Confirmation
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {modalState === 'confirm' && (
            <Box>
              <Text color="gray.400" fontWeight="medium">
                Do you confirm to add a new mate:
              </Text>
              <Text mt={2} color="gray.500" fontWeight="bold">
                Username:
              </Text>
              <Text color="white" fontSize="lg">
                {username}
              </Text>

              <Text mt={4} color="gray.500" fontWeight="bold">
                Pin:
              </Text>
              <Text color="white" fontSize="lg">
                {code}
              </Text>

              <Button
                bg="buttonPrimary.bg"
                color="buttonPrimary.color"
                mt={6}
                mb={4}
                _hover={{ bg: 'buttonPrimary.hover' }}
                onClick={handleConfirm}
                width="100%"
              >
                Confirm
              </Button>
            </Box>
          )}
          {modalState === 'loading' && (
            <Center>
              <Spinner size="xl" color="cyan.500" />
            </Center>
          )}
          {modalState === 'verified' && (
            <>
              <Text
                color="green.400"
                fontSize="lg"
                fontWeight="bold"
                textAlign="center"
              >
                Attestation Complete!
              </Text>

              <Center mt={4}>
                <Image
                  borderRadius="full"
                  boxSize="100px"
                  src={profileImageUrl ?? 'https://picsum.photos/200'}
                  alt={username}
                />
              </Center>

              <Text
                mt={4}
                textAlign="center"
                fontSize="lg"
                fontWeight="bold"
                color="white"
              >
                {username}
              </Text>

              <Text
                mt={2}
                textAlign="center"
                fontSize="md"
                color="gray.400"
                maxW="80%"
                mx="auto"
              >
                {about}
              </Text>
              <Button
                colorScheme="green"
                mt={6}
                onClick={() => { window.open(`${process.env.NEXT_PUBLIC_EAS_ATTESTATION_EXPLORER_URL}${txHash}`) }} 
                width="100%"
              >
                View Attestation
              </Button>

              <Button colorScheme="green" mt={6} onClick={onClose} width="100%">
                Close
              </Button>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalAddMate
