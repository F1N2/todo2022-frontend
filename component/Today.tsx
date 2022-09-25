import css from '../styles/Today.module.css';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { addToday, getMyToday, getOtherToday } from '../module/today';
import { useAppSelector } from '../app/hooks';
import { Today as IToday } from '../types/Today';

const Today = ({
  className = '',
  style = {},
}: {
  className?: string;
  style?: CSSProperties;
}) => {
  const [isDark, setDark] = useState(false);
  const [today, setToday] = useState('');
  const [todayExist, setTodayExist] = useState(false);
  const [otherToday, setOtherToday] = useState<IToday[]>([]);
  const [page, setPage] = useState(1);
  const { user } = useAppSelector((state) => state.user);

  const observer = useRef<IntersectionObserver>();
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    (async () => {
      const data = await getMyToday();
      if (data) setToday(data.content);
      setOtherToday(await getOtherToday(user!.id, page));
      setTodayExist(!!data);
    })();
  }, []);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries, observer) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          const data = await getOtherToday(user!.id, page + 1);
          setOtherToday((prevState) => {
            return [...prevState, ...data];
          });
          setPage(data.length < 10 ? 0 : page + 1);
        }
      });
    });
    box.current && observer.current.observe(box.current);
  }, [otherToday]);

  const add = async (today: string) => {
    const data = await addToday(today);
    if (data) {
      setToday(data.content);
      setTodayExist(true);
    }
  };

  return (
    <div className={className} style={style}>
      <span className={css.title}>오늘의 다짐</span>
      <div className={`${css.today_container} ${css.input_container}`}>
        {todayExist ? (
          <div className={css.today_exist_container}>
            <span className={css.today_exist}>&#34;{today}&#34;</span>
            <span className={css.today_exist_name}>- {user!.name}</span>
          </div>
        ) : (
          <>
            <input
              className={css.input}
              placeholder="오늘의 다짐을 입력해 주세요."
              value={today}
              onChange={(e) => setToday(e.target.value)}
            />
            <img
              src={`./images/add_circle${isDark ? '_dark' : ''}.svg`}
              className={css.icon}
              onClick={() => add(today)}
            />
          </>
        )}
      </div>
      <span className={css.title}>다른사람들의 다짐</span>
      <div className={`${css.today_container} ${css.other_container}`}>
        {otherToday.length == 0 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBlock: '8px',
            }}
          >
            <span className={css.today_exist_name}>
              아직 다짐을 작성한 사람이 없습니다 :(
            </span>
          </div>
        )}
        {otherToday.map((value, index) => {
          return (
            <div
              key={value.id}
              className={css.today_exist_container}
              style={index != 0 ? { marginTop: '5px' } : {}}
              ref={
                otherToday.length == index + 1 && page != 0 ? box : undefined
              }
            >
              <span className={css.today_exist}>&#34;{value.content}&#34;</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Today;
