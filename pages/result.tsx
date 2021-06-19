import axios from 'axios';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Heading, Box, Text, SimpleGrid, Button } from '@chakra-ui/react';
import capitalize from 'capitalize';
import parse from 'de-noun-parser';
import { AppContainer } from '@components/app';
import ResultTable from '@components/result/ResultTable';
import getArticle from '@lib/getArticle';

interface ResultPageProps {
  results: [
    {
      original: string;
      plural: string;
    }
  ];
  query: string[];
  notFound: string[];
}

const ResultPage: React.FC<ResultPageProps> = ({
  results,
  query,
  notFound,
}) => (
  <>
    <Head>
      <title>German Noun Pluraliser Results</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <AppContainer py={4}>
      <Box mb={4}>
        <Heading size="lg">Results</Heading>
        <Text>
          The {query.length === 1 ? 'word' : 'words'} you entered{' '}
          {query.length === 1 ? 'is' : 'are'}:{' '}
          {query.map((word) => capitalize(word)).join(', ')}.
        </Text>
      </Box>

      <SimpleGrid columns={2} spacing={{ base: 0, sm: '20px', md: '40px' }}>
        <ResultTable
          title="Singular"
          words={results.map((result) => result.original)}
        />
        <ResultTable
          title="Plural"
          words={results.map((result) => result.plural)}
        />
      </SimpleGrid>

      <Box mt={4}>
        {notFound.length > 0 && (
          <Text>We could not find results for: {notFound.join(', ')}.</Text>
        )}
        <Link href="/" passHref>
          <Button mt={2}>Return</Button>
        </Link>
      </Box>
    </AppContainer>
  </>
);

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const wordString = query.q as string;
  const wordList = wordString
    .split(' ')
    .map((word) => word.trim())
    .filter((word) => word.length > 0);
  const wordPromises = [];
  const notFound = [];

  wordList.forEach((word) => {
    const url = `https://en.wiktionary.org/w/api.php`;
    const searchPromise = axios.get(url, {
      headers: { 'Content-type': 'application/json' },
      params: {
        titles: capitalize(word),
        format: 'json',
        action: 'query',
        rvprop: 'content',
        prop: 'revisions',
        redirects: '1',
      },
    });
    wordPromises.push(searchPromise);
  });

  const promiseResults = await Promise.all(wordPromises);
  const results = [];

  promiseResults.forEach((res) => {
    try {
      const { data } = res;
      if (data.query) {
        const { pages } = data.query;

        const pageKey = Object.keys(pages)[0];

        if (Number(pageKey) === -1) {
          notFound.push(capitalize(pages[pageKey].title));
        } else {
          const pageData = pages[pageKey];
          const wikiTextString = pageData.revisions[0]['*'];

          const parsed = parse(wikiTextString);
          const { gender, plural } = parsed;

          const originalWord = `${getArticle(gender)} ${pageData.title}`;
          const pluralWord = `die ${
            plural.startsWith('-')
              ? pageData.title + plural.substring(1)
              : plural
          }`;

          results.push({
            original: originalWord,
            plural: pluralWord,
          });
        }
      }
    } catch (err) {
      console.log(err.response);
    }
  });

  return {
    props: {
      results,
      query: wordList,
      notFound,
    },
  };
};

export default ResultPage;
