import axios from 'axios';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Heading, Box, Text, SimpleGrid } from '@chakra-ui/react';
import { AppContainer } from '../components/app';
import ResultTable from '../components/result/ResultTable';
import getArticle from '../lib/getArticle';

interface ResultPageProps {
  results: [
    {
      original: string;
      plural: string;
    }
  ];
  query: string;
}

const ResultPage: React.FC<ResultPageProps> = ({ results, query }) => (
  <>
    <Head>
      <title>German Noun Pluraliser Results</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <AppContainer py={4}>
      <Box mb={4}>
        <Heading size="lg">Results</Heading>
        <Text>The words you entered are: {query}</Text>
      </Box>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing="40px">
        <ResultTable
          title="Singular"
          words={results.map((result) => result.original)}
        />
        <ResultTable
          title="Plural"
          words={results.map((result) => result.plural)}
        />
      </SimpleGrid>
    </AppContainer>
  </>
);

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const wordString = query.q as string;
  const wordList = wordString.split(' ');
  const wordPromises = [];

  wordList.forEach((word) => {
    const searchPromise = axios.get(
      `https://dictapi.lexicala.com/search-entries?source=global&language=de&text=${word}&pos=noun`,
      {
        auth: {
          username: process.env.DICT_USERNAME,
          password: process.env.DICT_PASSWORD,
        },
      }
    );
    wordPromises.push(searchPromise);
  });

  const promiseResults = await Promise.all(wordPromises);
  const results = [];

  promiseResults.forEach((res) => {
    const { data } = res;

    if (data.results.length > 0) {
      const result = data.results[0];
      const { headword } = result;
      const originalWord = `${getArticle(headword.gender)} ${headword.text}`;

      const pluralObject = headword.inflections.find(
        (entry: { number: string; case: string }) =>
          entry.number === 'plural' && entry.case === 'nominative'
      );
      const pluralWord = `die ${pluralObject.text}`;

      results.push({
        original: originalWord,
        plural: pluralWord,
      });
    }
  });

  return {
    props: {
      results,
      query: wordList.join(', '),
    },
  };
};

export default ResultPage;
