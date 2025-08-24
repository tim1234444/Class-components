import { useState, type JSX } from 'react';
import { Modal } from '../components/Modal/Modal';
import ControlledForm from '../components/ControlledForm/ControlledForm';
import UncontrolledForm from '../components/UncontrolledForm/UncontrolledForm';
import FormInfo from '../components/FormInfo/FormInfo';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit/react';

export default function Main() {
  const Forms = (state: RootState) => state.forms;
  const selectReverse = createSelector([Forms], (forms) => {
    return [...forms].reverse();
  });
  const finalForms = useSelector(selectReverse);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    content: JSX.Element | null;
  }>({ isOpen: false, content: null });
  const openModal = (formType: 'uncontrolled' | 'controlled') => {
    const form =
      formType === 'uncontrolled' ? <UncontrolledForm /> : <ControlledForm />;

    setModalState({ isOpen: true, content: form });
  };
  const closeModal = () => setModalState({ isOpen: false, content: null });
  return (
    <>
      <div className="buttons-container">
        <button
          className="open-button"
          onClick={() => {
            openModal('uncontrolled');
          }}
        >
          uncontrolled form
        </button>

        <button
          className="open-button"
          onClick={() => {
            openModal('controlled');
          }}
        >
          Similar form
        </button>
      </div>
      <Modal isOpen={modalState.isOpen} handleClose={closeModal}>
        {modalState.content}
      </Modal>
      <div className="form-info__cards">
      {finalForms.map((form, index) => {
    const isNew = index === 0;
    return (
      <FormInfo
        key={form.id} 
        Info={form}
        isNew={isNew}
      />
    );
  })}
      </div>
    </>
  );
}
