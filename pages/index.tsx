import type { NextPage } from 'next';
import css from '../styles/index.module.css';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Head from 'next/head';
import { info } from '../module/auth';
import { logout } from '../features/user/userSlice';
import PageWrapper from '../component/PageWrapper';
import Header from '../component/Header';
import Login from '../component/Login';
import SignUp from '../component/SignUp';
import Today from '../component/Today';
import Todo from '../component/Todo';
import Banner from '../component/Banner';

const Home: NextPage = () => {
  const { user } = useAppSelector((state) => state.user);
  const { value: isLoginPage } = useAppSelector((state) => state.page);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (user) {
        const data = await info();
        if (!data) dispatch(logout());
      }
    })();
  }, [user]);

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
      {user ? (
        <>
          <Header />
          <PageWrapper>
            <h1 className={css.h1}>안녕하세요, {user.name}님!</h1>
            <div className={css.container}>
              <Today className={`${css.box} ${css.container_left}`} />
              <Todo className={`${css.box} ${css.container_right}`} />
            </div>
          </PageWrapper>
        </>
      ) : isLoginPage == 'login' ? (
        <div className={css.login_container}>
          <Login />
          <Banner />
        </div>
      ) : (
        <div className={css.login_container}>
          <SignUp />
          <Banner />
        </div>
      )}
    </>
  );
};

export default Home;
