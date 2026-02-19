import styled from 'styled-components';

export const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
`;

export const Card = styled.div`
    background: #353638;
    padding: 24px 32px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-width: 200px;
`;

export const Message = styled.p`
    color: #9E9E9E;
    font-size: 14px;
    text-align: center;
`;

export const Buttons = styled.div`
    display: flex;
    gap: 12px;
    justify-content: center;
`;

export const CancelBtn = styled.button`
    color: #9E9E9E;
    background: transparent;
    border: 1px solid #9E9E9E;
    cursor: pointer;
    padding: 6px 16px;
    font-size: 12px;
`;

export const ConfirmBtn = styled.button`
    color: #ffffff;
    background: transparent;
    border: 1px solid #ffffff;
    cursor: pointer;
    padding: 6px 16px;
    font-size: 12px;
`;
