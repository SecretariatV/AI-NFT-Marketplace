import {
  Avatar,
  Box,
  Button,
  Center,
  HStack,
  Text,
  Divider,
  Flex,
} from '@chakra-ui/react'
import { FaRobot } from 'react-icons/fa'
import { MdPublic } from 'react-icons/md'

export default function Headers({
  icon,
  title,
  bg,
}: {
  icon?: any
  title: string
  bg: string
}) {
  return (
    <>
      <HStack py={3} px={2} borderRadius={'12px'} mb={4} cursor={'pointer'}>
        {icon && (
          <Avatar
            icon={icon}
            rounded={'full'}
            w="30px"
            bg={bg}
            color={'#7c8693'}
          />
        )}
        <Text
          ml={1}
          fontSize={'md'}
          fontWeight={'bold'}
          letterSpacing={'1.25px'}
        >
          {title}
        </Text>
      </HStack>
    </>
  )
}
