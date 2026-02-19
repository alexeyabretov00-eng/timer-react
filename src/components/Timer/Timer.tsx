import { Block } from '../Block';
import { StopButton } from '../StopButton';
import { StartButton } from '../StartButton';
import { PauseButton } from '../PauseButton';
import { DeleteButton } from '../DeleteButton';
import { Text } from '../Text';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface TimerProps {
    id: string;
    onDelete: (id: string) => void;
}

const formatValue = (value: number): string => {
    const milli = value;

    const hours = Math.floor(milli / 3600000);
    const minutes = Math.floor((milli % 3600000) / 60000);
    const seconds = Math.floor(minutes > 0 ? (milli - (minutes * 60000)) / 1000 : value / 1000);

    return `${hours > 0 ? `${hours}:` : ''}${minutes > 0 ? `${minutes}:` : ''}${seconds}`;
};

export const Timer: React.FC<TimerProps> = ({ id, onDelete }) => {
    const [value, setValue] = useState(0);
    const [status, setStatus] = useState('idle');
    const [confirmingDelete, setConfirmingDelete] = useState(false);
    const time = useRef(0);
    const start = useRef(0);
    const pausedTime = useRef(0);
    const intervalId = useRef(0);

    useEffect(() => {
        if (status !== 'started') {
            return;
        }

        intervalId.current = setTimeout(updateTimer, 100);
    }, [status])

    const updateTimer = () => {
        if (status !== 'started') {
            return;
        }

        setValue(Math.floor(Date.now() - start.current));
        time.current += 100;
        
        intervalId.current = setTimeout(updateTimer, Date.now() - start.current - time.current);
    };

    const onStart = () => {
        if (!['idle', 'paused'].includes(status)) {
            return;
        }

        if (!start.current && status === 'idle') {
            start.current = Date.now();
        } else {
            start.current = start.current + (Date.now() - pausedTime.current);
        }

        pausedTime.current = 0;
        setStatus('started');
    }

    const onStop = () => {
        if (!['started', 'paused'].includes(status)) {
            return;
        }

        clearTimeout(intervalId.current);

        start.current = 0;
        time.current = 0;
        pausedTime.current = 0;

        setStatus('idle');
        setValue(0);
    }

    const onPaused = () => {
        if (status !== 'started') {
            return;
        }

        pausedTime.current = Date.now();

        clearTimeout(intervalId.current);
        setStatus('paused');
    }

    return (
        <Block>
            <TimerStyled>
                <Text isActive={status === 'started'}>{formatValue(value)}</Text>
                <Separator isActive={status === 'started'}/>
                {confirmingDelete ? (
                    <ConfirmWrapper>
                        <ConfirmPrompt>DELETE?</ConfirmPrompt>
                        <ConfirmButton onClick={() => onDelete(id)}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 10L8 15L17 5" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ConfirmButton>
                        <CancelButton onClick={() => setConfirmingDelete(false)}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2.22266" y="0.808594" width="24" height="2" rx="1" transform="rotate(45 2.22266 0.808594)" fill="#9E9E9E" />
                                <rect x="0.808594" y="17.7773" width="24" height="2" rx="1" transform="rotate(-45 0.808594 17.7773)" fill="#9E9E9E" />
                            </svg>
                        </CancelButton>
                    </ConfirmWrapper>
                ) : (
                    <ButtonsWrapper>
                        {['idle', 'paused'].includes(status) && <StartButton onClick={onStart} />}
                        {status === 'started' && <PauseButton onClick={onPaused} />}
                        <StopButton onClick={onStop} isActive={status === 'started'} />
                        <DeleteButton onClick={() => setConfirmingDelete(true)} />
                    </ButtonsWrapper>
                )}
            </TimerStyled>
        </Block>
    )
};

const TimerStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    column-gap: 50px;
    height: 100%;
    width: 100%;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 50px;
`;

const ConfirmWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 16px;
`;

const ConfirmPrompt = styled.span`
    font-size: 12px;
    color: #9E9E9E;
    letter-spacing: 0.05em;
`;

const ConfirmButton = styled.div`
    width: 20px;
    height: 20px;
    cursor: pointer;
`;

const CancelButton = styled.div`
    width: 20px;
    height: 20px;
    cursor: pointer;
`;

const Separator = styled.div<{
    isActive: boolean;
}>`
    height: 0px;
    border: 1px solid ${props => props.isActive ? '#ffffff': '#9E9E9E'};
    width: 100%;
`;
