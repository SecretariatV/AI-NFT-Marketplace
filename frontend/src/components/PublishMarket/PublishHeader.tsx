import { Button, HStack, Text } from '@chakra-ui/react'
import { FaChevronLeft } from 'react-icons/fa'
import { useRouter } from 'next/router'

export default function PublishHeader({ success }: { success?: boolean }) {
  const router = useRouter()

  return (
    <>
      <HStack alignItems={'center'} spacing={5}>
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
          leftIcon={<FaChevronLeft />}
          h="50px"
          colorScheme="gray"
          onClick={() => {
            router.back()
          }}
        >
          Return
        </Button>
        {!success && (
          <>
            <Text
              fontSize={['xl', 'xl', '4xl']}
              fontWeight={'light'}
              letterSpacing={'1.25px'}
            >
              Publish to Marketplace
            </Text>
          </>
        )}
      </HStack>
    </>
  )
}
