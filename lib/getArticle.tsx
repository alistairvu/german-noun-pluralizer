const getArticle = (word: string): string => {
  switch (word) {
    case 'masculine': {
      return 'der';
    }
    case 'feminine': {
      return 'die';
    }
    case 'neuter': {
      return 'das';
    }
    default: {
      return '';
    }
  }
};

export default getArticle;
