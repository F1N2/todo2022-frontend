import css from '../styles/Todo.module.css';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { deleteTodo, getTodo, updateTodo } from '../module/todo';
import { setModal, setModalData } from '../features/slice/modalSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Todo as ITodo } from '../types/Todo';

const Todo = ({
  className = '',
  style = {},
}: {
  className?: string;
  style?: CSSProperties;
}) => {
  const [isDark, setDark] = useState(false);
  const [todo, setTodo] = useState<ITodo[]>([]);
  const [page, setPage] = useState(1);

  const dispatch = useAppDispatch();
  const { modal, data: modalData } = useAppSelector((state) => state.modal);

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

  const listClick = (e: any) => {
    if (e.target.localName != 'img') {
      dispatch(setModalData(e.currentTarget.id));
      dispatch(setModal('todo'));
    }
  };

  return (
    <div className={className} style={style}>
      <span className={css.title}>오늘의 할 일</span>
      <div className={css.list_container}>
        <div
          className={css.list}
          style={{
            height: '50px',
            paddingLeft: '8px',
            marginTop: 0,
            justifyContent: 'center',
          }}
          onClick={() => dispatch(setModal('add_todo'))}
        >
          <span className={css.content}>추가하기</span>
        </div>
        <div className={css.scroll}>
          {todo.map((value, index) => {
            return (
              <div
                id={value.id}
                key={value.id}
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
    </div>
  );
};

export default Todo;
