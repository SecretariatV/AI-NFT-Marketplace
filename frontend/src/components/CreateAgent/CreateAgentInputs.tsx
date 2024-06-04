import {
  Box,
  useMediaQuery,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputRightAddon,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react'
import { FaExternalLinkAlt } from 'react-icons/fa'

export default function CreateAgentInputs({
  name,
  setName,
  nameError,
  description: descripiton,
  setDescription: setDescripiton,
  ensSubName,
  setSubName,
  ensName,
}: {
  name: string
  setName: (name: string) => void
  nameError: any
  description: string
  setDescription: (description: string) => void
  ensSubName: string
  setSubName: (ensSubName: string) => void
  ensName: string
}) {
  const [isMobile] = useMediaQuery('(max-width: 768px)')

  return (
    <>
      <Stack
        w="100%"
        alignItems={'flex-start'}
        direction={['column', 'row']}
        justifyContent={'space-between'}
        spacing={8}
      >
        <Box w="100%">
          <FormControl mt={4} id="name" isInvalid={!!nameError}>
            <Box position={'relative'} w="100%">
              <Input
                w="100%"
                borderRadius={'8px'}
                border={'0.5px solid #3d3d3d'}
                focusBorderColor="#3d3d3d"
                h="60px"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
              />
              {nameError && (
                <Text color="red.200" mt={2} fontSize="xs">
                  {nameError}
                </Text>
              )}
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
                AI Agent
              </Box>
            </Box>
          </FormControl>

          <FormControl id="descripiton" mt={12}>
            <Box position={'relative'} w="100%">
              <Input
                border={'0.5px solid #3d3d3d'}
                focusBorderColor="#3d3d3d"
                placeholder=""
                w="100%"
                borderRadius={'8px'}
                h="60px"
                value={descripiton}
                onChange={(e) => setDescripiton(e.target.value)}
              />
              <Text fontSize="xs" textAlign="right" color={'gray'}>
                Optional
              </Text>

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
                Short description
              </Box>
            </Box>
          </FormControl>

          <FormControl id="model" mt={12}>
            <Box position={'relative'} w="100%">
              <Select
                border={'0.5px solid #3d3d3d'}
                focusBorderColor="#3d3d3d"
                placeholder=""
                w="100%"
                borderRadius={'8px'}
                h="60px"
              >
                <option value="gpt-3">GPT-3</option>
              </Select>

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
                Model
              </Box>
            </Box>
          </FormControl>
        </Box>

        <Box w="100%">
          <FormControl mt={4} id="ens">
            <Box position={'relative'} w="100%">
              <InputGroup h="60px">
                <Input
                  w="100%"
                  borderRadius={'8px'}
                  border={'0.5px solid #3d3d3d'}
                  focusBorderColor="#3d3d3d"
                  h="60px"
                  type="text"
                  value={ensSubName}
                  onChange={(e) => setSubName(e.target.value)}
                  placeholder="Enter wrapped sub-name"
                />

                <InputRightAddon
                  border={'1px solid #1f2022'}
                  cursor={'pointer'}
                  fontWeight={'bold'}
                  letterSpacing={'1.5px'}
                  borderRightRadius={'8px'}
                  h="60px"
                  bg="gray.700"
                >
                  {ensName ? ensName : 'not found'}
                </InputRightAddon>
              </InputGroup>
              <Flex
                mt={2}
                align={'center'}
                justifyContent={'flex-end'}
                cursor={'pointer'}
              >
                <Text mr={2} fontSize="xs" textAlign="right" color={'pink'}>
                  Register{' '}
                </Text>

                <FaExternalLinkAlt color={'pink'} />
              </Flex>

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
                ENS Subdomain
              </Box>
            </Box>
          </FormControl>

          <FormControl mt={12} id="chain">
            <Box position={'relative'} w="100%">
              <Input
                readOnly
                value={'sepolia'}
                w="100%"
                borderRadius={'8px'}
                border={'0.5px solid #3d3d3d'}
                focusBorderColor="#3d3d3d"
                h="60px"
                type="text"
                placeholder="Choose a name"
              />

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
                Default chain
              </Box>
            </Box>
          </FormControl>
        </Box>
      </Stack>
    </>
  )
}
