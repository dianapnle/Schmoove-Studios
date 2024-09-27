// import React from 'react';
import { useModal } from '../../context/Modal'

function OpenModalAddInstructorButton({
  modalComponent, // component to render inside the modal
}) {
  const { setModalContent } = useModal()

  const onClick = () => {
    setModalContent(modalComponent)
  }

  return (
    <button className={`edit-instructor-button`} onClick={onClick}>
      Add Instructor
    </button>
  )
}

export default OpenModalAddInstructorButton
