import css from '../styles/Today.module.css';
import { CSSProperties, useEffect, useState } from 'react';
import {
  addToday,
  getMyToday,
  getOtherToday,
  Today as IToday,
} from '../module/today';
import { useAppSelector } from '../app/hooks';

const Today = ({
  className = '',
  style = {},
}: {
  className?: string;
  style?: CSSProperties;
}) => {
  const [isLoaded, setLoaded] = useState(false);
  const [isDark, setDark] = useState(false);
  const [today, setToday] = useState('');
  const [todayExist, setTodayExist] = useState(false);
  const [otherToday, setOtherToday] = useState<IToday[]>([]);
  const { user } = useAppSelector((state) => state.user);
  useEffect(() => {
    setDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    (async () => {
      const data = await getMyToday();
      if (data) setToday(data.content);
      setOtherToday(await getOtherToday(user!.id));
      setTodayExist(!!data);
      setLoaded(true);
    })();
  }, []);

  const add = async (today: string) => {
    const data = await addToday(today);
    if (data) {
      setToday(data.content);
      setTodayExist(true);
    }
  };

  return (
    <>
      {isLoaded && (
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
          <div className={css.today_container} style={{ height: '63%' }}>
            {otherToday.map((value, index) => {
              return (
                <div
                  key={value.id}
                  className={css.today_exist_container}
                  style={index != 0 ? { marginTop: '5px' } : {}}
                >
                  <span className={css.today_exist}>
                    &#34;{value.content}&#34;
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Today;
