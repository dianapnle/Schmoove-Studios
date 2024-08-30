// import React from 'react';
import { useModal } from '../../context/Modal'


function OpenModalAdd({
  modalComponent, // component to render inside the modal

}) {
  const { setModalContent } = useModal();

  const onClick = () => {
    setModalContent(modalComponent);
  };

  return (
        <button className={`edit-class-button`} onClick={onClick}>Add Class</button>
  );
}

export default OpenModalAdd;
