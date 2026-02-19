import { FC } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, Buttons, CancelBtn, ConfirmBtn, Message, Popup } from './ConfirmDeletePopup.styled';

export const ConfirmDeletePopup: FC<{
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ onConfirm, onCancel }) => {
  return createPortal(
    <Backdrop onClick={onCancel}>
      <Popup onClick={e => e.stopPropagation()}>
        <Message>Delete this timer?</Message>
        <Buttons>
          <ConfirmBtn onClick={onConfirm}>Delete</ConfirmBtn>
          <CancelBtn onClick={onCancel}>Cancel</CancelBtn>
        </Buttons>
      </Popup>
    </Backdrop>,
    document.body
  );
};
