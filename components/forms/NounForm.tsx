import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Textarea, Button, FormControl, FormLabel } from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface NounFormData {
  nouns: string;
}

const NounForm: React.FC = () => {
  const { register, handleSubmit } = useForm<NounFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleEnter = ({ nouns }: NounFormData): void => {
    setIsSubmitting(true);
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
      <FormControl id="nouns">
        <FormLabel>German Nouns</FormLabel>
        <Textarea {...register('nouns')} size="lg" rows={20} />
      </FormControl>
      <Button type="submit" isLoading={isSubmitting} loadingText="Loading">
        Enter
      </Button>
    </form>
  );
};

export default NounForm;
