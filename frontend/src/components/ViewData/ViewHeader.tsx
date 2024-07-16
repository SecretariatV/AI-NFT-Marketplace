import { Box, Button, Flex, Spinner, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { BiStore } from 'react-icons/bi'
import { FaInfo, FaInfoCircle } from 'react-icons/fa'

export default function ViewHeader({ checking }: { checking: boolean }) {
  const router = useRouter()

  return (
    <>
      <Flex gap={10}>
        <Button
          bg="#181818"
          _hover={{
            bg: '#181818',
            color: 'white',
          }}
          _focus={{
            bg: '#181818',
            color: 'white',
          }}
          color="white"
          leftIcon={<BiStore />}
          h="50px"
          colorScheme="gray"
          onClick={() => {
            router.push('/')
          }}
        >
          Return
        </Button>
      </Flex>

      <Flex align={'center'} mt={8}>
        {checking ? <Spinner /> : <FaInfoCircle />}

        <Text ml={4}>About this document</Text>
      </Flex>
    </>
  )
}
