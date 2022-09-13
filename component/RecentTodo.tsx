import { CSSProperties } from 'react';

const RecentTodo = ({
  className = '',
  style = {},
}: {
  className?: string;
  style?: CSSProperties;
}) => {
  return <div className={className} style={style}></div>;
};

export default RecentTodo;
