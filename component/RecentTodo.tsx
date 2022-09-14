import { CSSProperties, useEffect, useState } from 'react';
import css from '../styles/RecentTodo.module.css';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useAppSelector } from '../app/hooks';

const RecentTodo = ({
  className = '',
  style = {},
}: {
  className?: string;
  style?: CSSProperties;
}) => {
  const [isDark, setDark] = useState(false);
  const { stat } = useAppSelector((state) => state.stat);

  useEffect(() => {
    setDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);

  return (
    <div className={className} style={style}>
      <span className={css.title}>할 일 통계</span>
      <div className={css.container}>
        <div className={css.list}>
          <span className={css.list_text}>7일간의 할 일 통계</span>
          <div style={{ width: '96px' }}>
            <CircularProgressbar
              value={stat.week.percent}
              strokeWidth={14}
              text={`${stat.week.percent}%`}
              styles={buildStyles({
                textColor: isDark ? 'white' : 'black',
                pathColor: isDark ? 'white' : 'black',
                trailColor: isDark ? 'black' : 'white',
              })}
            />
          </div>
        </div>
        <div className={css.list}>
          <span className={css.list_text}>
            {new Date().getMonth() + 1}월의 할 일 통계
          </span>
          <div style={{ width: '96px' }}>
            <CircularProgressbar
              value={stat.month.percent}
              strokeWidth={14}
              text={`${stat.month.percent}%`}
              styles={buildStyles({
                textColor: isDark ? 'white' : 'black',
                pathColor: isDark ? 'white' : 'black',
                trailColor: isDark ? 'black' : 'white',
              })}
            />
          </div>
        </div>
        <div className={css.list}>
          <span className={css.list_text}>올해의 할 일 통계</span>
          <div style={{ width: '96px' }}>
            <CircularProgressbar
              value={stat.year.percent}
              strokeWidth={14}
              text={`${stat.year.percent}%`}
              styles={buildStyles({
                textColor: isDark ? 'white' : 'black',
                pathColor: isDark ? 'white' : 'black',
                trailColor: isDark ? 'black' : 'white',
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentTodo;
