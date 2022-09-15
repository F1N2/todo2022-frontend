import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setModal } from '../features/modal/modalSlice';
import { SyntheticEvent } from 'react';
import Modal from './Modal';

const ModalManager = () => {
  const { modal } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const closeModal = (e: SyntheticEvent) => {
    if (e.target == e.currentTarget) dispatch(setModal(false));
  };

  return (
    <>
      {modal && (
        <div
          style={{
            position: 'fixed',
            width: '100%',
            height: '100%',
            zIndex: '100',
            backgroundColor: 'rgba(0, 0, 0, 0.43)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={closeModal}
        ></div>
      )}
    </>
  );
};

export default ModalManager;
