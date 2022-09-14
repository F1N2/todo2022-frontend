import { getTodo } from './todo';

export interface Stat {
  year: Percent;
  month: Percent;
  week: Percent;
  yesterday: Percent;
}

export interface Percent {
  checked: number;
  total: number;
  percent: number;
}

export const getStatistics = async (): Promise<Stat> => {
  const result: Stat = {
    year: { checked: 0, total: 0, percent: 0 },
    month: { checked: 0, total: 0, percent: 0 },
    week: { checked: 0, total: 0, percent: 0 },
    yesterday: { checked: 0, total: 0, percent: 0 },
  };
  const date = new Date();
  const now_year = date.getFullYear();
  const now_month = date.getMonth();
  const now_date = date.getDate();
  const data = await getTodo(
    1,
    25565,
    new Date(date.getFullYear(), 0, 1),
    new Date(date.getFullYear(), 11, 31),
  );
  data.forEach((v, i) => {
    const month =
      new Date(now_year, now_month, 0) < v.created &&
      v.created < new Date(now_year, now_month + 1, -1);
    const week =
      new Date(now_year, now_month, now_date - 7) < v.created &&
      v.created < new Date(now_year, now_month, now_date + 1);
    const yesterday =
      new Date(now_year, now_month, now_date - 1) < v.created &&
      v.created < new Date(now_year, now_month, now_date);
    if (v.complete) {
      result.year.checked++;
      if (month) result.month.checked++;
      if (week) result.week.checked++;
      if (yesterday) result.yesterday.checked++;
    }
    result.year.total++;
    if (month) result.month.total++;
    if (week) result.week.total++;
    if (yesterday) result.yesterday.total++;
  });
  result.year.percent =
    result.year.checked > 0 && result.year.total > 0
      ? Math.round((result.year.checked / result.year.total) * 100)
      : 0;
  result.month.percent =
    result.month.checked > 0 && result.month.total > 0
      ? Math.round((result.month.checked / result.month.total) * 100)
      : 0;
  result.week.percent =
    result.week.checked > 0 && result.week.total > 0
      ? Math.round((result.week.checked / result.week.total) * 100)
      : 0;
  result.yesterday.percent =
    result.yesterday.checked > 0 && result.yesterday.total > 0
      ? Math.round((result.yesterday.checked / result.yesterday.total) * 100)
      : 0;
  return result;
};
