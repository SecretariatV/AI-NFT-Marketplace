import {
  Box,
  Text,
  Flex,
  Stack,
  HStack,
  Center,
  Skeleton,
} from '@chakra-ui/react'
import { FaPlay, FaUser } from 'react-icons/fa'
import Headers from '@/components/Headers'
import { MdTrendingUp } from 'react-icons/md'
import { useRouter } from 'next/router'
import { useGlobalContext } from '@/contexts/GlobalContext'
import PreviewCard from './PreviewCard'
import { useEffect, useState } from 'react'

export default function Overview() {
  const { index, nftData, agents, loadingMarket, setNftData } =
    useGlobalContext()
  const [nft, setNft] = useState()
  // const [searching, setSearching] = useState(false)
  const router = useRouter()

  useEffect(() => {
    function filter() {
      const filter = agents.filter((agent: any) => agent.count > 0)

      if (filter && filter.length > 0) {
        const length = filter.length
        const lastViewed = filter[length - 1]
        // console.log("this is the chosen agent", lastViewed);
        setNft(lastViewed)
      }
    }
    if (agents) {
      filter()
    }
  }, [])

  return (
    <>
      <Box
        // py={4}
        px={nftData && nftData.length > 0 ? 8 : 0}
        py={nftData && nftData.length > 0 ? 4 : 0}
        minH="270px"
        bg="#1f2022"
        color={'lightgreen'}
        borderRadius={'18px'}
        position={'relative'}
      >
        {!loadingMarket && nftData && nftData.length > 0 && (
          <>
            <Headers
              icon={<MdTrendingUp size={'lg'} />}
              title="Recently created"
              bg="#1e1f23"
            />

            <HStack w="100%" spacing={5}
            
          overflowX={"auto"}

            >
              {nftData
                .filter((item: any) => item.cid.length > 0)
                .map((nft: any, i: number) => (
        <Box>
                    <PreviewCard key={i} nft={nft} />
          </Box>
                ))}
            </HStack>
          </>
        )}

        {!nftData && (
          <Skeleton
            borderRadius={'18px'}
            startColor={'#1f2022'}
            endColor={'#181818'}
            w="100%"
            position={'absolute'}
            height="100%"
          />
        )}
      </Box>

      <Stack mt={4} spacing={4} direction={['column', 'row', 'row']}>
        <Box
          py={4}
          px={8}
          minH="370px"
          bg={!nftData ? '#1f2022' : "url('/start-selling.png')"}
          backgroundSize={'cover'}
          backgroundPosition={'center'}
          color={'white'}
          borderRadius={'18px'}
          w={['100%', '100%', '55%']}
          onClick={() => router.push('/creators')}
          cursor="pointer"
        />

        <Box
          py={4}
          px={8}
          minH="370px"
          bg="#1f2022"
          color={'white'}
          borderRadius={'18px'}
          w="100%"
          position={'relative'}
        >
          <Flex align={'center'} justifyContent={'space-between'}>
            <Headers
              icon={<FaPlay size={'lg'} />}
              title="Recently Viewed"
              bg="#1e1f23"
            />

            <Text
              ml={1}
              fontSize={'sm'}
              color={'#7c8693'}
              fontWeight={'bold'}
              letterSpacing={'1.25px'}
              as="button"
              _hover={{
                color: '#c5ff49',
              }}
              // onClick={() => router.push("views")}
            >
              Show All
            </Text>
          </Flex>

          <Center mt={12}>
            <Box h="120px" w="auto" as="img" src="/empty.svg" />
          </Center>
        </Box>
      </Stack>
    </>
  )
}
