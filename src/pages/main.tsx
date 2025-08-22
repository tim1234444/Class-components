import { useState, type JSX } from 'react';
import { Modal } from '../components/Modal/Modal';
import ControlledForm from '../components/ControlledForm/ControlledForm';
import UncontrolledForm from '../components/UncontrolledForm/UncontrolledForm';

export default function Main() {
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
          onClick={() => {
            openModal('uncontrolled');
          }}
        >
          uncontrolled form
        </button>
        <button
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
    </>
  );
}
