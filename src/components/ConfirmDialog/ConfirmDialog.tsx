import React from 'react';
import { Overlay, Card, Message, Buttons, CancelBtn, ConfirmBtn } from './ConfirmDialog.styled';

interface ConfirmDialogProps {
    onConfirm: () => void;
    onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ onConfirm, onCancel }) => {
    return (
        <Overlay onClick={onCancel}>
            <Card onClick={e => e.stopPropagation()}>
                <Message>Delete this timer?</Message>
                <Buttons>
                    <CancelBtn onClick={onCancel}>Cancel</CancelBtn>
                    <ConfirmBtn onClick={onConfirm}>Delete</ConfirmBtn>
                </Buttons>
            </Card>
        </Overlay>
    );
};
