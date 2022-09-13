import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { info } from '../module/auth';
import { logout } from '../features/user/userSlice';
import css from '../styles/index.module.css';
import Head from 'next/head';
import Header from '../component/Header';
import PageWrapper from '../component/PageWrapper';
import RecentTodo from '../component/RecentTodo';
import YesterdayTodo from '../component/YesterdayTodo';

const Statistics: NextPage = () => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [yesterdayPercent, setYesterdayPercent] = useState(0);

  useEffect(() => {
    (async () => {
      if (user) {
        const data = await info();
        if (!data) {
          dispatch(logout());
          return await router.push('/');
        }
      } else return await router.push('/');
    })();
  });

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
      <Header />
      <PageWrapper>
        <h1 className={css.h1}>안녕하세요, {user!.name}님!</h1>
        <div className={css.container}>
          <RecentTodo
            className={css.box}
            style={{ marginLeft: '40px', float: 'left' }}
          />
          <YesterdayTodo
            className={css.box}
            style={{ marginRight: '40px', float: 'right' }}
          />
        </div>
      </PageWrapper>
    </>
  );
};

export default Statistics;
