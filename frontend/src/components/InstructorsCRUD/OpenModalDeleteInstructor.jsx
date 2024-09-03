// import React from 'react';
import { useModal } from '../../context/Modal'
import { RiDeleteBin4Fill } from "react-icons/ri";


function OpenModalDeleteButton({
  modalComponent, // component to render inside the modal
}) {
  const { setModalContent } = useModal();

  const onClick = () => {
    setModalContent(modalComponent);
  };

  return (
        <span className={`delete-button-x`} onClick={onClick}><RiDeleteBin4Fill /></span>
  );
}

export default OpenModalDeleteButton;
