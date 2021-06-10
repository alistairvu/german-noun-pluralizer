import Head from 'next/head';
import { Heading, Box, Text } from '@chakra-ui/react';
import { AppContainer } from '../components/app';
import NounForm from '../components/forms/NounForm';

const Home: React.FC = () => (
  <>
    <Head>
      <title>German Noun Pluraliser</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <AppContainer py={4}>
      <Box mb={4}>
        <Heading size="lg">Welcome to the modern German pluralizer!</Heading>
        <Text size="md">
          Enter a list of German nouns separated by commas. (maximum: 20 at a
          time)
        </Text>
      </Box>

      <NounForm />
    </AppContainer>
  </>
);

export default Home;
