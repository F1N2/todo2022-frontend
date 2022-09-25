import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setModal, setModalData } from '../features/slice/modalSlice';
import { SyntheticEvent } from 'react';
import TodoModal from './modal/TodoModal';
import AddTodoModal from './modal/AddTodoModal';

const ModalManager = () => {
  const { modal } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const closeModal = (e: SyntheticEvent) => {
    if (e.target == e.currentTarget) {
      dispatch(setModalData(null));
      dispatch(setModal(false));
    }
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
        >
          <TodoModal isOpen={modal == 'todo'} />
          <AddTodoModal isOpen={modal == 'add_todo'} />
        </div>
      )}
    </>
  );
};

export default ModalManager;
