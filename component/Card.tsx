import { Flex, Box, Center, Image, Text, Heading, VStack } from "@chakra-ui/react";
import styles from "../styles/Card.module.css";
import { useState } from "react";
import classnames from 'classnames'
import { Link } from '@chakra-ui/react'

interface CardProps {
  cardData: {
    ensName?: string,
    email?: string,
    twitter?: string,
    github?: string,
    avatarUrl?: string,
    websiteUrl?: string
  }
}
const Card = ({ cardData }: CardProps) => {
  let [isFlipped, setIsFlipped] = useState(false);
  return <>
    <Text>Hello</Text>
    <Box w={300} h={500}
      className={classnames(styles['flip-card'])}
      onClick={() => setIsFlipped(!isFlipped)}>

      <Box className={classnames(styles['flip-card-inner'], { [styles['flipped']]: isFlipped })} >
        <Box className={styles['flip-card-front']}
          backgroundColor='#333'
          backgroundImage={cardData.avatarUrl}
          backgroundSize="cover"
          backgroundPosition="center"

          overflow='hidden'
          borderRadius="xl"
          shadow="xl"
        >

        </Box>
        <Box className={styles['flip-card-back']}
          backgroundColor='black'
          borderRadius="xl"
          overflow='hidden'
          align="left"
          p={5}>
          <Box w="100%" h="100%" boxShadow='2xl'

            color="white">
            <Text>Boss Coding Please</Text>
            <Image my='5' boxSize="120px" src={cardData.avatarUrl}></Image>
            <Heading>{cardData.ensName}</Heading>
            <Text>{cardData.email}</Text>
            <p>Architect & Engineer</p>
            <p>We love that guy</p>
            <VStack mt={5} textDecoration="underline" spacing="0" align="flex-start">

              <Link href={cardData.websiteUrl} isExternal>
                Website: {cardData.websiteUrl}
              </Link>
              <Link href={`https://twitter.com/${cardData.twitter}`} isExternal>
                Twitter
              </Link>
              <Link href={`https://github.com/${cardData.github}`} isExternal>
                Github
              </Link>
            </VStack>
          </Box>
        </Box>
      </Box>
    </Box>
  </>



}
export default Card