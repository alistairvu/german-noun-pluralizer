import { Flex, Heading } from '@chakra-ui/react';
import Link from 'next/link';

const AppHeader: React.FC = () => (
  <Flex justify="between" align="center" py={2} px={4} shadow="base">
    <Link href="/" passHref>
      <a>
        <Heading size="xl">Pluraliser</Heading>
      </a>
    </Link>
  </Flex>
);
export default AppHeader;
