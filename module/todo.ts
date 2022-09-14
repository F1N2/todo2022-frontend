export interface Todo {
  id: string;
  user_id: string;
  content: string;
  complete: boolean;
  created: Date;
  updated: Date;
}

export const getTodo = async (
  page: number,
  count?: number,
  from?: Date,
  to?: Date,
): Promise<Todo[]> => {
  const url = `/api/todo?page=${page}${count ? `&count=${count}` : ''}${
    from && to ? `&from=${+from}&to=${+to}&now=false` : ''
  }&sort=ASC`;
  try {
    const data = await fetch(url, {
      method: 'GET',
    });
    if (data.status != 200) return [];
    const result: Todo[] = [];
    ((await data.json()) as Array<any>).forEach((value) => {
      value.created = new Date(value.created);
      value.updated = new Date(value.updated);
      result.push(value as Todo);
    });
    return result;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const addTodo = async (content: string): Promise<Todo | null> => {
  try {
    const data = await fetch('/api/todo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content,
        complete: false,
      }),
    });
    if (data.status == 201) return (await data.json()) as Todo;
    else return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const updateTodo = async (todo: Todo) => {
  try {
    await fetch(`/api/todo/${todo.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: todo.content,
        complete: todo.complete,
      }),
    });
  } catch (e) {
    console.log(e);
  }
};

export const deleteTodo = async (id: string) => {
  try {
    await fetch(`/api/todo/${id}`, { method: 'DELETE' });
  } catch (e) {
    console.log(e);
  }
};
