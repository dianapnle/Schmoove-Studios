// import React from 'react';
import { useModal } from '../../context/Modal'
import { FaPencilAlt } from "react-icons/fa";


function OpenModalEditInstructorButton({
  modalComponent, // component to render inside the modal
}) {
  const { setModalContent } = useModal();

  const onClick = () => {
    setModalContent(modalComponent);
  };

  return (
        <button className={`edit-button-pencil`} onClick={onClick}><FaPencilAlt /></button>
  );
}

export default OpenModalEditInstructorButton;
