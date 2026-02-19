import styled from 'styled-components';

export const StopButtonStyled = styled.div<{ isActive: boolean }>`
    rect {
        fill: ${props => props.isActive ? '#ffffff' : '#9E9E9E'};
    }
`;
