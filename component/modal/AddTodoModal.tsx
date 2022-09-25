import Modal from '../Modal';
import css from '../../styles/modal/AddTodoModal.module.css';
import { setModal } from '../../features/slice/modalSlice';
import { useAppDispatch } from '../../app/hooks';
import { useState } from 'react';
import { addTodo } from '../../module/todo';

const AddTodoModal = ({ isOpen }: { isOpen: boolean }) => {
  const [content, setContent] = useState('');
  const [desc, setDesc] = useState('');
  const dispatch = useAppDispatch();

  return (
    <Modal isOpen={isOpen} className={css.modal}>
      <h2 className={css.title}>TODO 추가하기</h2>
      <input
        className={css.content}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="TODO 내용을 입력해주세요."
      />
      <textarea
        className={css.desc}
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="TODO 설명을 입력해주세요."
      />
      <div className={css.modal_under}>
        <div
          className={css.red_button}
          onClick={() => dispatch(setModal(false))}
          style={{ marginRight: '16px' }}
        >
          닫기
        </div>
        <div
          className={css.green_button}
          onClick={async () => {
            const data = await addTodo(content, desc);
            if (data) {
              dispatch(setModal(false));
              window.location.reload();
            }
          }}
        >
          저장
        </div>
      </div>
    </Modal>
  );
};

export default AddTodoModal;
