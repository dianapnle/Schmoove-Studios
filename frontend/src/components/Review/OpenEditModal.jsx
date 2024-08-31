// import React from 'react';
import { useModal } from '../../context/Modal'

function OpenModalEditReviewButton({
  modalComponent, // component to render inside the modal
}) {
  const { setModalContent } = useModal();

  const onClick = () => {
    setModalContent(modalComponent);
  };

  return (
    <div>
        <button className={`post-review-button`} onClick={onClick}>Edit</button>
    </div>
  );
}

export default OpenModalEditReviewButton;
