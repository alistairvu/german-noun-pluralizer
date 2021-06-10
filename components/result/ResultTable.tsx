import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

interface ResultTableProps {
  title: 'Singular' | 'Plural';
  words: string[];
}

const ResultTable: React.FC<ResultTableProps> = ({ title, words }) => (
  <Table variant="simple">
    <Thead>
      <Tr>
        <Th>{title}</Th>
      </Tr>
    </Thead>
    <Tbody>
      {words.map((word) => (
        <Tr key={word}>
          <Td>{word}</Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
);

export default ResultTable;
