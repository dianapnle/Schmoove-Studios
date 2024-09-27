// import React from 'react';
import { useModal } from '../../context/Modal'

function OpenModalEditButton({
  modalComponent, // component to render inside the modal
}) {
  const { setModalContent } = useModal()

  const onClick = () => {
    setModalContent(modalComponent)
  }

  return (
    <button className={`edit-button`} onClick={onClick}>
      Edit
    </button>
  )
}

export default OpenModalEditButton
