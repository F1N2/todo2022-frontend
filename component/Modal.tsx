import { CSSProperties, ReactNode } from 'react';
import css from '../styles/Modal.module.css';
import { useAppSelector } from '../app/hooks';

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
  const { modal } = useAppSelector((state) => state.modal);

  return (
    <>
      {isOpen && (
        <div
          id={modal.toString()}
          className={className ? `${css.modal} ${className}` : css.modal}
          style={style}
        >
          {children && children}
        </div>
      )}
    </>
  );
};

export default Modal;
