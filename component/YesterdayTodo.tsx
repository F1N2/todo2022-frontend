import { CSSProperties } from 'react';

const YesterdayTodo = ({
  className = '',
  style = {},
}: {
  className: string;
  style: CSSProperties;
}) => {
  return <div className={className} style={style}></div>;
};

export default YesterdayTodo;
