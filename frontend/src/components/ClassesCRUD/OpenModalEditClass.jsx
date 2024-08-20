// import React from 'react';
import { useModal } from '../../context/Modal'


function OpenModalEditClassButton({
  modalComponent, // component to render inside the modal

}) {
  const { setModalContent } = useModal();

  const onClick = () => {
    setModalContent(modalComponent);
  };

  return (
        <button className={`edit-class-button`} onClick={onClick}>Edit Class</button>
  );
}

export default OpenModalEditClassButton;
