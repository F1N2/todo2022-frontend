import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { info } from '../module/auth';
import { logout } from '../features/slice/userSlice';
import css from '../styles/index.module.css';
import Head from 'next/head';
import Header from '../component/Header';
import PageWrapper from '../component/PageWrapper';
import RecentTodo from '../component/RecentTodo';
import YesterdayTodo from '../component/YesterdayTodo';
import { getStatistics } from '../module/statistics';
import { setStat } from '../features/slice/statSlice';
import ModalManager from '../component/ModalManager';

const Statistics: NextPage = () => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  const { stat } = useAppSelector((state) => state.stat);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (user) {
        const data = await info();
        if (!data) {
          dispatch(logout());
          return await router.push('/');
        }
      } else return await router.push('/');
      dispatch(setStat(await getStatistics()));
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
      {user && stat && (
        <>
          <ModalManager />
          <Header />
          <PageWrapper>
            <h1 className={css.h1}>
              어제 목표의 {stat.yesterday.percent}%를 달성하였습니다.
            </h1>
            <div className={css.container}>
              <RecentTodo className={css.box} />
              <YesterdayTodo className={`${css.box} ${css.container_right}`} />
            </div>
          </PageWrapper>
        </>
      )}
    </>
  );
};

export default Statistics;
