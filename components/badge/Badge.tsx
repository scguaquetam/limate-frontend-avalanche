import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { Badge } from '../../src/models/Badge'

type Props = {
  badge: Badge
}

const BadgeCard = ({ badge }: Props) => {
  return (
    <Box
      textAlign="center"
      p={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Image
        src={badge.profilePicture ?? "https://picsum.photos/200"}
        alt="Badge 1"
        boxSize="80px"
        borderRadius="20px"
      />

      <Text
        mt={2}
        color="white"
        fontWeight="bold"
        maxW="80%"
        mx="auto"
      >
        {badge.username}
      </Text>

      {badge.username && (
        <Text color="gray.400" mx="auto">
          @{badge.username}
        </Text>
      )}
    </Box>
  )
}

export default BadgeCard
