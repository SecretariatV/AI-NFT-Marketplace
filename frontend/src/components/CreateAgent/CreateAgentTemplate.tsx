import { Box, HStack, Tooltip, Text, Flex } from '@chakra-ui/react'
import { templates } from '@/utils/const'
import { useState } from 'react'

export default function CreateAgentTemplate() {
  const [selected, setSelected] = useState(0)
  const [showToolTip, setShowToolTip] = useState(false)

  return (
    <>
      <Flex mt={8} gap={8} w="100%" flexWrap={'wrap'}>
        {templates.map((item, i) => (
          <Tooltip
            opacity={selected === i ? 1 : 0}
            key={i}
            isOpen={selected === i && showToolTip}
            label="Coming soon"
          >
            <Box
              border={i === 0 ? '0.5px solid #db65c1' : 'none'}
              opacity={i === 0 ? 1 : 0.6}
              py={4}
              h={['230px', '230px', '300px']}
              bg="#181818"
              color={'white'}
              borderRadius={'18px'}
              w="100%"
              maxW={['150px', '270px']}
              minW={['150px', '270px']}
              cursor="pointer"
              position={'relative'}
              display={'flex'}
              flexDir={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              onClick={() => {
                if (i > 0) {
                  setShowToolTip(true)
                  setSelected(i)
                  setTimeout(() => {
                    setShowToolTip(false)
                  }, 1000)
                }
              }}
            >
              <Box
                as="img"
                src={item.icon}
                rounded={'full'}
                w={['80px', '80px', '150px']}
                h={['80px', '80px', '150px']}
              />

              <Text textAlign={'center'} maxW={['130px', '270px']} my={8}>
                {item.title}
              </Text>
            </Box>
          </Tooltip>
        ))}
      </Flex>
      <Box />
    </>
  )
}
