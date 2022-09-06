import type { NextPage } from 'next';
import css from '../styles/index.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { deleteCookie, getCookie } from 'cookies-next';
import Head from 'next/head';
import Header from '../component/Header';
import PageWrapper from '../component/PageWrapper';
import TodoList from '../component/TodoList';
import Today from '../component/Today';

const Home: NextPage = () => {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    created: new Date(),
    updated: new Date(),
  });
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (!getCookie('login')) return await router.push('/login');

      const data = await fetch('/api/auth', { method: 'POST' });
      if (data.status == 401) {
        deleteCookie('login');
        return router.push('/login');
      }

      const user = await data.json();
      user.created = new Date(user.created);
      user.updated = new Date(user.updated);

      setUser((prevState) => {
        return { ...prevState, ...user };
      });

      setLoading(false);
    })();
  }, []);

  return (
    <>
      <Head>
        <title>TO-DO</title>
        <meta charSet="utf-8" />
        <meta name="description" content="할 일들을 기록해보세요!" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="TO-DO" />
        <meta property="og:description" content="할 일들을 기록해보세요!" />
        <meta property="og:locale" content="ko_KR" />
        <meta name="twitter:card" content="website" />
        <meta name="twitter:title" content="TO-DO" />
        <meta name="twitter:description" content="할 일들을 기록해보세요!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!isLoading && (
        <>
          <Header logged={true} />
          <PageWrapper>
            <h1 className={css.title}>안녕하세요, {user.name}님!</h1>
            <Today />
            <TodoList />
          </PageWrapper>
        </>
      )}
    </>
  );
};

export default Home;
