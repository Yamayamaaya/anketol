import React from 'react'
import { Flex, Spinner } from '@chakra-ui/react'

interface CustomSpinnerProps {
  caption?: String
}

export const CustomSpinner: React.FC<CustomSpinnerProps> = ({
  caption = 'Loading...',
}) => {
  return (
    <Flex
      flexDirection="column"
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
      gap="10px"
      position="fixed"
      left="0"
      top="0"
      z-index="1000"
      background="#AAA3"
    >
      <Spinner
        size="xl"
        className="mt-8"
        color="blue.500"
        emptyColor="gray.200"
        speed="1.0s"
      />
      <span>{caption}</span>
    </Flex>
  )
}

export default CustomSpinner
