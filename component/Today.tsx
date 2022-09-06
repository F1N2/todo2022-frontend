import { useEffect, useState } from 'react';
import css from '../styles/Today.module.css';
import { Today as IToday } from '../types/Today';

const Today = () => {
  const [isLoading, setLoading] = useState(true);
  const [content, setContent] = useState('');
  const [today, setToday] = useState<IToday | null>(null);

  const onCreate = async (content: string) => {
    const data = await fetch(`/api/today`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ content: content }),
    });
    const json = await data.json();
    json.created = new Date(json.created);
    json.updated = new Date(json.updated);
    setToday(json as IToday);
    setContent('');
  };

  useEffect(() => {
    if (isLoading)
      (async () => {
        const data = await fetch(`/api/today`, { method: 'GET' });
        const json = await data.json();
        if (json.length <= 0) {
          setLoading(false);
          return;
        }
        json[0].created = new Date(json[0].created);
        json[0].updated = new Date(json[0].updated);
        setToday(json[0] as IToday);
        setLoading(false);
      })();
  }, [isLoading]);

  return (
    <>
      {!isLoading && (
        <>
          <div id="today" />
          <div className={css.container}>
            <h1>오늘의 다짐을 적어봅시다</h1>
            {today ? (
              <>
                <h1 style={{ fontSize: '28px', margin: '0 auto' }}>
                  &quot;{today.content}&quot;
                </h1>
              </>
            ) : (
              <>
                <div className={css.today}>
                  <input
                    type="text"
                    className={css.today_input}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <span
                    style={{
                      fontSize: '24px',
                      cursor: 'pointer',
                      marginRight: '9px',
                    }}
                    onClick={() => onCreate(content)}
                  >
                    ⬆️
                  </span>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Today;
