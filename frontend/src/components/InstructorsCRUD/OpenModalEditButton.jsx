// import React from 'react';
import { useModal } from '../../context/Modal'
import { PiPencilSimpleFill } from "react-icons/pi";


function OpenModalEditInstructorButton({
  modalComponent, // component to render inside the modal
}) {
  const { setModalContent } = useModal();

  const onClick = () => {
    setModalContent(modalComponent);
  };

  return (
        <span className={`edit-button-pencil`} onClick={onClick}><PiPencilSimpleFill /></span>
  );
}

export default OpenModalEditInstructorButton;
