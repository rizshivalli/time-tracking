import React, { useEffect, useState } from 'react';
import { getRandomQuote } from '@/pages/Time/service';
import { Empty, Result, Skeleton } from 'antd';

const RandomQuote = () => {
  const [randomQuote, setRandomQuote] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const getQuote = async () => {
    setLoading(true);
    await getRandomQuote()
      .then((response) => {
        setRandomQuote(response);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getQuote();
  }, []);
  return (
    <Skeleton loading={loading}>
      <Result
        status="error"
        icon={<Empty />}
        title={randomQuote.content}
        extra={randomQuote.author}
      />
    </Skeleton>
  );
};

export default RandomQuote;
