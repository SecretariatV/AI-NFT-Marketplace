import React from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Box,
} from '@chakra-ui/react'

const PreviewDocumentModal = ({
  isOpen,
  onClose,
  content,
}: {
  isOpen: boolean
  onClose: () => void
  content: string
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={'full'}>
        <ModalOverlay bg={'blackAlpha.900'} />
        <ModalContent
          position={'fixed'}
          minH="100vh"
          top={0}
          py={4}
          mt={32}
          bg="#1f2022"
          color="white"
        >
          <ModalHeader
            maxW="67%"
            letterSpacing={'1.25px'}
            fontSize={'xl'}
            fontWeight={'bold'}
          >
            Preview
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              h="100%"
              maxH="400px"
              w="100%"
              overflowY={'auto'}
              bg="gray.700"
              border={'1px solid gray'}
            >
              <Box position="relative">
                <pre
                  style={{
                    maxWidth: '400px',
                  }}
                >
                  {content}
                </pre>
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button h="60px" mr={3} onClick={onClose}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default PreviewDocumentModal
