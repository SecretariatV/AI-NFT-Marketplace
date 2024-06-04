import { useGlobalContext } from '@/contexts/GlobalContext'
import {
  Text,
  Button,
  Box,
  Center,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Spinner,
  VStack,
  useClipboard,
  Tooltip,
} from '@chakra-ui/react'
import { FaCopy, FaExternalLinkAlt, FaAddressBook } from 'react-icons/fa'

import { useEffect } from 'react'

export default function CreateAgentStatus({
  isLoading,
  name,
  agent,
  progress,
  close,
}: {
  isLoading: boolean
  isSuccess: boolean
  name: string
  agent: any
  progress: string
  close?: any
}) {
  const { setIndex } = useGlobalContext()
  const { onCopy, value, setValue, hasCopied } = useClipboard(
    agent ? agent.agentAddress ?? 'manner' : '',
  )

  //   useEffect(() => {
  // if(hasCopied) {

  // }
  //   }, [hasCopied])

  return (
    <>
      <Box
        display={'flex'}
        flexDir={'column'}
        justifyContent={'center'}
        minH="60vh"
      >
        {isLoading && (
          <Center>
            <Spinner size={'xl'} />
          </Center>
        )}

        {isLoading && progress && (
          <Center mt={4}>
            <Text
              fontSize="xl"
              fontWeight={'semibold'}
              letterSpacing={'1.25px'}
            >
              {progress}
            </Text>
          </Center>
        )}

        {!isLoading && agent && (
          <>
            <VStack>
              <Box textAlign={'center'} maxW={'500px'}>
                <Heading mt={4}>
                  Congratulations, {name} is Live on Zero!
                </Heading>

                <Box mt={8} position={'relative'} w="100%">
                  <InputGroup h="60px">
                    <Input
                      w="100%"
                      borderRadius={'8px'}
                      border={'0.5px solid #3d3d3d'}
                      focusBorderColor="#3d3d3d"
                      bg="#181818"
                      type="text"
                      placeholder={agent ? agent.agentAddress : ''}
                      readOnly={true}
                    />
                    <Tooltip
                      bg="white"
                      color={'green.500'}
                      isOpen={hasCopied}
                      label={'✓ copied'}
                    >
                      <InputRightAddon
                        border={'1px solid #1f2022'}
                        cursor={'pointer'}
                        fontWeight={'light'}
                        letterSpacing={'1.5px'}
                        borderRightRadius={'8px'}
                        bg="gray.700"
                        onClick={onCopy}
                      >
                        <FaCopy color={'white'} />
                      </InputRightAddon>
                    </Tooltip>
                  </InputGroup>
                  <Box
                    zIndex={1}
                    mt={-2}
                    ml={3}
                    bg="#1f2022"
                    px={2}
                    top={0}
                    position={'absolute'}
                    fontSize={'xs'}
                  >
                    Adrress
                  </Box>
                </Box>

                <Box mt={8} position={'relative'} w="100%">
                  <InputGroup h="60px">
                    <Input
                      w="100%"
                      borderRadius={'8px'}
                      border={'0.5px solid #db65c1'}
                      focusBorderColor="#3d3d3d"
                      bg="#181818"
                      type="text"
                      placeholder={agent ? agent.indexName : ''}
                      readOnly={true}
                    />

                    <InputRightAddon
                      border={'1px solid #1f2022'}
                      cursor={'pointer'}
                      fontWeight={'light'}
                      letterSpacing={'1.5px'}
                      borderRightRadius={'8px'}
                      bg="gray.700"
                      onClick={() => {
                        const url = `https://gateway.lighthouse.storage/ipns/${agent.indexName}`
                        window.open(url, '_blank')
                      }}
                    >
                      <FaExternalLinkAlt color={'white'} />
                    </InputRightAddon>
                  </InputGroup>
                  <Box
                    zIndex={1}
                    mt={-2}
                    ml={3}
                    bg="#1f2022"
                    px={2}
                    top={0}
                    position={'absolute'}
                    fontSize={'xs'}
                  >
                    Index ID
                  </Box>
                </Box>

                <Box mt={4} position={'relative'} w="100%">
                  <InputGroup h="60px">
                    <Input
                      w="100%"
                      borderRadius={'8px'}
                      border={'0.5px solid #3d3d3d'}
                      focusBorderColor="#3d3d3d"
                      bg="#181818"
                      type="text"
                      placeholder="Phone Number"
                      readOnly={true}
                    />

                    <InputRightAddon
                      border={'1px solid #1f2022'}
                      cursor={'pointer'}
                      fontWeight={'light'}
                      letterSpacing={'1.5px'}
                      borderRightRadius={'8px'}
                      bg="gray.700"
                    >
                      <FaAddressBook color={'white'} />
                    </InputRightAddon>
                  </InputGroup>
                  <Box
                    zIndex={1}
                    mt={-2}
                    ml={3}
                    bg="#1f2022"
                    px={2}
                    top={0}
                    position={'absolute'}
                    fontSize={'xs'}
                  >
                    SMS Number
                  </Box>
                </Box>
              </Box>

              <Button
                mt={12}
                _hover={{
                  bgGradient: 'linear(to-r, #c5ff49, #04b670)',
                  color: 'white',
                  border: 'none',
                }}
                sx={{
                  bgGradient: 'linear(to-r, #c5ff49, #04b670)',
                  color: 'white',
                  border: 'none',
                }}
                _active={{
                  bgGradient: 'linear(to-r, #c5ff49, #04b670)',
                  color: 'white',
                  border: 'none',
                }}
                h="60px"
                fontSize={'xl'}
                borderRadius={'25px'}
                colorScheme="purple"
                onClick={() => setIndex(1)}
              >
                Start Shopping for Knoweldge
              </Button>
            </VStack>
          </>
        )}
      </Box>
    </>
  )
}
