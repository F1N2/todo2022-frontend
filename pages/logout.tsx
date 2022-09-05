import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { deleteCookie, getCookie } from 'cookies-next';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (!getCookie('login')) return await router.push('/login');
      await fetch('/api/auth/logout', { method: 'POST' });
      deleteCookie('login');
      return router.push('/login');
    })();
  }, []);
  return <></>;
};

export default Logout;
