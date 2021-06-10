import { useForm } from 'react-hook-form';
import { Textarea, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface NounFormData {
  nouns: string;
}

const NounForm: React.FC = () => {
  const { register, handleSubmit } = useForm<NounFormData>();
  const router = useRouter();

  const handleEnter = ({ nouns }: NounFormData): void => {
    const separatedNouns = nouns.split('\n');
    const filteredNouns = separatedNouns.map((noun) => {
      const splitNoun = noun.split(' ');
      return splitNoun[splitNoun.length - 1];
    });
    const query = filteredNouns.slice(0, 20).join('+');
    router.push(`/result?q=${query}`);
  };

  return (
    <form onSubmit={handleSubmit(handleEnter)}>
      <Textarea {...register('nouns')} />
      <Button type="submit">Enter</Button>
    </form>
  );
};

export default NounForm;
