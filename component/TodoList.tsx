import { ChangeEvent, useEffect, useState } from 'react';
import css from '../styles/TodoList.module.css';
import { Todo } from '../types/Todo';

const TodoList = () => {
  const [isLoading, setLoading] = useState(true);
  const [todo, setTodo] = useState<Todo[]>([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (isLoading)
      (async () => {
        const data = await fetch('/api/todo', { method: 'GET' });
        const result: Todo[] = [];
        const json = await data.json();
        json.forEach((e: Todo) => {
          e.created = new Date(e.created);
          e.updated = new Date(e.updated);
          result.push(e);
        });
        setTodo(result);
        setLoading(false);
      })();
  }, [isLoading]);

  const checkHandler = async (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const value = !todo[i].complete;
    await fetch(`/api/todo/${todo[i].id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ complete: value }),
    });
    setTodo((prevState) => {
      prevState[i].complete = value;
      prevState[i].updated = new Date();
      return [...prevState];
    });
  };

  const onDelete = async (i: number) => {
    await fetch(`/api/todo/${todo[i].id}`, { method: 'DELETE' });
    setTodo((prevState) => {
      prevState.splice(i, 1);
      return [...prevState];
    });
  };

  const onCreate = async (content: string) => {
    const data = await fetch(`/api/todo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ content: content, complete: false }),
    });
    const json = await data.json();
    json.created = new Date(json.created);
    json.updated = new Date(json.updated);
    setTodo((prevState) => {
      return [...prevState, json];
    });
    setContent('');
  };

  return (
    <>
      <div id="todo" />
      {!isLoading && (
        <div className={css.container}>
          <h1 style={{ wordBreak: 'keep-all' }}>
            오늘의 목표를 작성하고 기록해봅시다
          </h1>
          <div className={css.todo_list}>
            {todo.map((v, i) => {
              return (
                <div key={v.id} className={css.todo}>
                  <span
                    style={{
                      fontSize: '24px',
                      marginLeft: '10px',
                    }}
                  >
                    {v.content}
                  </span>
                  <div style={{ display: 'flex', marginRight: '10px' }}>
                    <span
                      style={{ fontSize: '24px', cursor: 'pointer' }}
                      onClick={() => onDelete(i)}
                    >
                      ❌
                    </span>
                    <input
                      type="checkbox"
                      style={{
                        width: '24px',
                        height: '24px',
                        cursor: 'pointer',
                        marginLeft: '12px',
                      }}
                      checked={v.complete}
                      onChange={(e) => checkHandler(e, i)}
                    />
                  </div>
                </div>
              );
            })}
            <div className={css.todo}>
              <input
                type="text"
                className={css.todo_input}
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
          </div>
        </div>
      )}
    </>
  );
};

export default TodoList;
