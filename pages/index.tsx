import type { NextPage } from 'next';
import css from '../styles/index.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';

const Home: NextPage = () => {
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (!getCookie('login')) return await router.push('/login');
      setLoading(false);
    })();
  }, []);

  return (
    <>
      {!isLoading && (
        <>
          <h1>Hello!</h1>
          <h1>Hello!</h1>
        </>
      )}
    </>
  );
};

export default Home;
