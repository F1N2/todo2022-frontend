export interface Today {
  id: string;
  user_id: string;
  content: string;
  created: Date;
  updated: Date;
}

export const getMyToday = async (): Promise<Today | null> => {
  try {
    const data = await fetch('/api/today', { method: 'GET' });
    if (data.status != 200) return null;
    const json = (await data.json()) as Array<any>;
    if (json.length <= 0) return null;
    json[0].created = new Date(json[0].created);
    json[0].updated = new Date(json[0].updated);
    return json[0] as Today;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const addToday = async (content: string): Promise<Today | null> => {
  try {
    const data = await fetch('/api/today', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    if (data.status != 201) return null;
    return (await data.json()) as Today;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getOtherToday = async (user_id: string): Promise<Today[]> => {
  try {
    const data = await fetch('/api/today?onlyMine=false', { method: 'GET' });
    if (data.status != 200) return [];
    const result: Today[] = [];
    const json = await data.json();
    json.forEach((v: any) => {
      if (v.user_id != user_id) {
        v.created = new Date(v.created);
        v.updated = new Date(v.updated);
        result.push(v as Today);
      }
    });
    return result;
  } catch (e) {
    console.log(e);
    return [];
  }
};
