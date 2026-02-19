import styled from 'styled-components';

export const TimerStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    column-gap: 50px;
    height: 100%;
    width: 100%;
`;

export const ButtonsWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 50px;
`;

export const Separator = styled.div<{ isActive: boolean }>`
    height: 0px;
    border: 1px solid ${props => props.isActive ? '#ffffff' : '#9E9E9E'};
    width: 100%;
`;
