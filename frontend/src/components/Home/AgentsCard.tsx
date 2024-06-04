import {
  Avatar,
  Box,
  Center,
  HStack,
  Text,
  Divider,
  Flex,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import { MdDescription, MdFolder, MdPublic } from 'react-icons/md'
import { shortenAddress } from '@/utils/helpers'
import { useRef, useState } from 'react'

export default function AgentsCard({
  title,
  description,
  address,
  files,
}: {
  title: string
  description: string
  address: string
  files: number
}) {
  const [showToolTip, setShowToolTip] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const titleRef = useRef(null)

  const handleMouseEnter = () => {
    setShowToolTip(true)
  }

  const handleMouseLeave = () => {
    setShowToolTip(false)
  }

  const handleCopy = () => {
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <>
      <Box
        display={'flex'}
        flexDir={'column'}
        bg="#181818"
        h="380px"
        alignItems={'space-between'}
        color={'white'}
        borderRadius={'18px'}
        w="100%"
        maxW="280px"
      >
        <Box h="80%">
          <VStack h="100%" justify={'center'}>
            <Box>
              <Center mt={5}>
                <Avatar size="2xl" bg="lightblue" src="/pirate.svg" />
              </Center>
              <Box mt={4} fontWeight={'semibold'}>
                <Tooltip isOpen={showToolTip} label={description}>
                  <Text
                    cursor={'pointer'}
                    fontSize={'normal'}
                    textAlign={'center'}
                    ref={titleRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {title}
                  </Text>
                </Tooltip>
              </Box>
            </Box>
          </VStack>
        </Box>

        <Box borderTop={'0.6px solid gray'} h="20%">
          <HStack
            py={2}
            h="100%"
            justifyContent={'space-between'}
            alignItems={'center'}
            color={'#7a7a7a'}
            px={3}
          >
            <Flex>
              {' '}
              <MdFolder />
              <Text ml={2} fontSize={'xs'} fontWeight={'bold'}>
                {files}
              </Text>
            </Flex>
            <Flex>
              <Tooltip isOpen={isCopied} label={'✓ copied'}>
                <Text
                  as="button"
                  px={2}
                  py={1}
                  _hover={{
                    bg: '#1e1f23',
                    borderRadius: '8px',
                  }}
                  onClick={handleCopy}
                  fontSize={'xs'}
                >
                  {shortenAddress(address)}
                </Text>
              </Tooltip>
            </Flex>
          </HStack>
        </Box>
      </Box>
    </>
  )
}
