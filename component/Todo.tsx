import css from '../styles/Todo.module.css';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import {
  addTodo,
  deleteTodo,
  getTodo,
  Todo as ITodo,
  updateTodo,
} from '../module/todo';

const Todo = ({
  className = '',
  style = {},
}: {
  className?: string;
  style?: CSSProperties;
}) => {
  const [isDark, setDark] = useState(false);
  const [todo, setTodo] = useState<ITodo[]>([]);
  const [content, setContent] = useState('');
  const [page, setPage] = useState(1);

  const observer = useRef<IntersectionObserver>();
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    (async () => {
      const data = await getTodo(page);
      setTodo(data);
    })();
  }, []);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries, observer) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          const data = await getTodo(page + 1);
          setTodo((prevState) => {
            return [...prevState, ...data];
          });
          setPage(data.length < 10 ? 0 : page + 1);
        }
      });
    });
    box.current && observer.current.observe(box.current);
  }, [todo]);

  const add = async (content: string) => {
    const data = await addTodo(content);
    if (data) {
      setTodo((prevState) => {
        return [...prevState, data];
      });
      setContent('');
    }
  };

  const remove = async (todo: ITodo) => {
    await deleteTodo(todo.id);
    setTodo((prevState) => {
      prevState.splice(
        prevState.findIndex((e) => e.id == todo.id),
        1,
      );
      return [...prevState];
    });
  };

  const change = async (todo: ITodo) => {
    todo.complete = !todo.complete;
    await updateTodo(todo);
    setTodo((prevState) => {
      prevState[prevState.findIndex((e) => e.id == todo.id)] = todo;
      return [...prevState];
    });
  };

  return (
    <div className={className} style={style}>
      <span className={css.title}>오늘의 할 일</span>
      <div className={css.list_container}>
        <div className={css.list} style={{ paddingLeft: '8px', marginTop: 0 }}>
          <input
            className={css.input}
            placeholder="추가하고 싶은 할 일을 입력해 주세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <img
            className={css.icon}
            src={`./images/add_circle${isDark ? '_dark' : ''}.svg`}
            onClick={() => add(content)}
          />
        </div>
        {todo.map((value, index) => {
          return (
            <div
              key={value.id}
              className={css.list}
              ref={todo.length == index + 1 && page != 0 ? box : undefined}
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
              <div>
                <img
                  className={css.icon}
                  src={`./images/delete${isDark ? '_dark' : ''}.svg`}
                  onClick={() => remove(value)}
                />
                <img
                  className={css.icon}
                  src={
                    value.complete
                      ? `./images/check_box${isDark ? '_dark' : ''}.svg`
                      : `./images/check_box_outline_blank${
                          isDark ? '_dark' : ''
                        }.svg`
                  }
                  onClick={() => change(value)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
