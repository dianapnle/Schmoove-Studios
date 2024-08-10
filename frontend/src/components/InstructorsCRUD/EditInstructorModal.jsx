// import React from 'react';
import { useModal } from '../../context/Modal'


function OpenModalEditInstructorButton({
  modalComponent, // component to render inside the modal
}) {
  const { setModalContent } = useModal();

  const onClick = () => {
    setModalContent(modalComponent);
  };

  return (
        <button className={`edit-instructor-button`} onClick={onClick}>Edit Instructors</button>
  );
}

export default OpenModalEditInstructorButton;
