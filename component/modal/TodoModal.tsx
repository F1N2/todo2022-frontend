import Modal from '../Modal';
import css from '../../styles/modal/TodoModal.module.css';
import { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { getTodoById } from '../../module/todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setModal, setModalData } from '../../features/slice/modalSlice';

const TodoModal = ({ isOpen }: { isOpen: boolean }) => {
  const [isLoaded, setLoaded] = useState(false);
  const [data, setData] = useState<Todo | null>(null);

  const dispatch = useAppDispatch();
  const { modal, data: modalData } = useAppSelector((state) => state.modal);

  useEffect(() => {
    if (modal == 'todo')
      (async () => {
        const data = await getTodoById(modalData);
        if (data) {
          setData(data);
          setLoaded(true);
        } else {
          dispatch(setModalData(null));
          dispatch(setModal(false));
        }
      })();
  }, []);

  return (
    <Modal isOpen={isOpen} className={css.modal}>
      {isLoaded && data && (
        <>
          <div>
            <h1 className={css.content}>{data.content}</h1>
            <p className={css.content} style={{ marginTop: '20px' }}>
              {data.description}
            </p>
          </div>
          <div className={css.modal_under}>
            <div className={css.date}>
              <span>
                Created: {data.created.getFullYear()}-
                {data.created.getMonth() + 1}-{data.created.getDate()}{' '}
                {data.created.getHours()}:{data.created.getMinutes()}:
                {data.created.getSeconds()}
              </span>
              <>
                {data.complete && (
                  <>
                    <br />
                    <span>
                      Complete: {data.updated.getFullYear()}-
                      {data.updated.getMonth() + 1}-{data.updated.getDate()}{' '}
                      {data.updated.getHours()}:{data.updated.getMinutes()}:
                      {data.updated.getSeconds()}
                    </span>
                  </>
                )}
              </>
            </div>
            <div
              className={css.button}
              onClick={() => {
                dispatch(setModalData(null));
                dispatch(setModal(false));
              }}
            >
              닫기
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};

export default TodoModal;
