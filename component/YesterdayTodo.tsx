import { CSSProperties, useEffect, useRef, useState } from 'react';
import css from '../styles/YesterdayTodo.module.css';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getTodo } from '../module/todo';
import { Todo } from '../types/Todo';
import { setModal, setModalData } from '../features/slice/modalSlice';

const YesterdayTodo = ({
  className = '',
  style = {},
}: {
  className?: string;
  style?: CSSProperties;
}) => {
  const dispatch = useAppDispatch();
  const { stat } = useAppSelector((state) => state.stat);
  const [todo, setTodo] = useState<Todo[]>([]);
  const [page, setPage] = useState(1);
  const [isDark, setDark] = useState(false);

  const observer = useRef<IntersectionObserver>();
  const box = useRef<HTMLDivElement>(null);

  const date = new Date();
  const now_year = date.getFullYear();
  const now_month = date.getMonth();
  const now_date = date.getDate();

  useEffect(() => {
    (async () => {
      setDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
      const data = await getTodo(
        page,
        10,
        new Date(now_year, now_month, now_date - 1),
        new Date(now_year, now_month, now_date),
      );
      setTodo(data);
    })();
  }, []);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries, observer) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          const data = await getTodo(
            page + 1,
            10,
            new Date(now_year, now_month, now_date - 1),
            new Date(now_year, now_month, now_date),
          );
          setTodo((prevState) => {
            return [...prevState, ...data];
          });
          setPage(data.length < 10 ? 0 : page + 1);
        }
      });
    });
    box.current && observer.current.observe(box.current);
  }, [todo]);

  const listClick = (e: any) => {
    if (e.target.localName != 'img') {
      dispatch(setModalData(e.currentTarget.id));
      dispatch(setModal('todo'));
    }
  };

  return (
    <div className={className} style={style}>
      <span className={css.title}>어제의 할 일</span>
      <div className={css.container}>
        <div
          className={css.list}
          style={{ marginTop: 0, justifyContent: 'center', cursor: 'unset' }}
        >
          <span className={css.yesterday_text}>
            어제의 할 일 달성도 : {stat.yesterday.checked}/
            {stat.yesterday.total} ({stat.yesterday.percent}%)
          </span>
        </div>
        {todo.map((value, index) => {
          return (
            <div
              key={value.id}
              id={value.id}
              className={css.list}
              ref={todo.length == index + 1 && page != 0 ? box : undefined}
              onClick={listClick}
            >
              <span
                className={
                  value.complete
                    ? `${css.content} ${css.content_complete}`
                    : css.content
                }
              >
                {value.content}
              </span>
              <img
                className={css.icon}
                src={
                  value.complete
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
