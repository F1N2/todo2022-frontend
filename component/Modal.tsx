import { CSSProperties, ReactNode } from 'react';
import css from '../styles/Modal.module.css';

const Modal = ({
  isOpen,
  children,
  className,
  style = {},
}: {
  isOpen: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}) => {
  return (
    <div
      className={className ? `${css.modal} ${className}` : css.modal}
      style={isOpen ? style : { display: 'none' }}
    >
      {children && children}
    </div>
  );
};

export default Modal;
