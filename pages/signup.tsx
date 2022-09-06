import type { NextPage } from 'next';
import css from '../styles/signup.module.css';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import Header from '../component/Header';
import PageWrapper from '../component/PageWrapper';

const Signup: NextPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (getCookie('login')) return await router.push('/');
      setLoading(false);
    })();
  }, []);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (name.length < 3 || name.length > 16)
      return alert('이름을 3~16글자로 입력해주세요.');
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
      return alert('올바른 이메일 형식을 입력해주세요.');
    if (
      password.length < 8 ||
      checkPassword.length < 8 ||
      password.length > 32 ||
      checkPassword.length > 32
    )
      return alert('비밀번호를 8~32글자로 입력해주세요.');
    if (password != checkPassword) {
      alert('두 비밀번호를 같게 입력해주세요.');
      setPassword('');
      return setCheckPassword('');
    }

    try {
      const data = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (data.status == 201) return await router.push('/login');
      if (data.status == 400) {
        alert('이 이메일은 이미 사용중입니다.');
        return setEmail('');
      }
      return alert('알 수 없는 오류가 발생하였습니다.');
    } catch (e) {
      return alert('알 수 없는 오류가 발생하였습니다.');
    }
  };

  return (
    <>
      {!isLoading && (
        <>
          <Header />
          <PageWrapper>
            <form onSubmit={submit} className={css.container}>
              <h1 style={{ marginTop: 0 }}>회원가입</h1>
              <input
                className={css.input}
                placeholder="이름"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <br />
              <input
                className={css.input}
                placeholder="이메일"
                required
                onChange={(e) => setEmail(e.target.value.trim())}
                value={email}
              />
              <br />
              <input
                className={css.input}
                type="password"
                placeholder="비밀번호"
                required
                onChange={(e) => setPassword(e.target.value.trim())}
                value={password}
              />
              <br />
              <input
                className={css.input}
                type="password"
                placeholder="비밀번호 다시 입력"
                required
                onChange={(e) => setCheckPassword(e.target.value.trim())}
                value={checkPassword}
              />
              <br />
              <button className={css.button} type="submit">
                회원가입
              </button>
            </form>
          </PageWrapper>
        </>
      )}
    </>
  );
};

export default Signup;
