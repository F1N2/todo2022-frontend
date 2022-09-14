import { CSSProperties, useEffect, useState } from 'react';
import css from '../styles/YesterdayTodo.module.css';
import { useAppSelector } from '../app/hooks';
import { getTodo, Todo } from '../module/todo';

const YesterdayTodo = ({
  className = '',
  style = {},
}: {
  className?: string;
  style?: CSSProperties;
}) => {
  const { stat } = useAppSelector((state) => state.stat);
  const [todo, setTodo] = useState<Todo[]>([]);
  const [page, setPage] = useState(1);
  const [isDark, setDark] = useState(false);

  useEffect(() => {
    (async () => {
      setDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
      const date = new Date();
      const now_year = date.getFullYear();
      const now_month = date.getMonth();
      const now_date = date.getDate();
      const data = await getTodo(
        page,
        undefined,
        new Date(now_year, now_month, now_date - 1),
        new Date(now_year, now_month, now_date),
      );
      setTodo(data);
    })();
  }, []);

  return (
    <div className={className} style={style}>
      <span className={css.title}>어제의 할 일</span>
      <div className={css.container}>
        <div
          className={css.list}
          style={{ marginTop: 0, justifyContent: 'center' }}
        >
          <span className={css.yesterday_text}>
            어제의 할 일 달성도 : {stat.yesterday.checked}/
            {stat.yesterday.total} ({stat.yesterday.percent}%)
          </span>
        </div>
        {todo.map((v) => {
          return (
            <div key={v.id} className={css.list}>
              <span
                className={
                  v.complete
                    ? `${css.content} ${css.content_complete}`
                    : css.content
                }
              >
                {v.content}
              </span>
              <img
                className={css.icon}
                src={
                  v.complete
                    ? `./images/check_box${isDark ? '_dark' : ''}.svg`
                    : `./images/check_box_outline_blank${
                        isDark ? '_dark' : ''
                      }.svg`
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default YesterdayTodo;
