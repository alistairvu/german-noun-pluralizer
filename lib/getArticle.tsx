const getArticle = (word: string): string => {
  switch (word) {
    case 'm': {
      return 'der';
    }
    case 'f': {
      return 'die';
    }
    case 'n': {
      return 'das';
    }
    default: {
      return '';
    }
  }
};

export default getArticle;
