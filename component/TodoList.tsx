import { useEffect, useState } from 'react';
import css from '../styles/TodoList.module.css';
import { Todo } from '../types/Todo';

const TodoList = () => {
  const [isLoading, setLoading] = useState(true);
  const [todo, setTodo] = useState<Todo[]>([]);

  useEffect(() => {
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
  }, []);

  return (
    <>
      {!isLoading && (
        <div className={css.container}>{JSON.stringify(todo)}</div>
      )}
    </>
  );
};

export default TodoList;
