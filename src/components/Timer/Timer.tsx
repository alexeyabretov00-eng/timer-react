import { Block } from '../Block';
import { StopButton } from '../StopButton';
import { StartButton } from '../StartButton';
import { PauseButton } from '../PauseButton';
import { DeleteButton } from '../DeleteButton';
import { Text } from '../Text';
import { ConfirmDialog } from '../ConfirmDialog';
import React, { useEffect, useRef, useState } from 'react';
import { TimerStyled, ButtonsWrapper, Separator } from './Timer.styled';

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
        <>
            <Block>
                <TimerStyled>
                    <Text isActive={status === 'started'}>{formatValue(value)}</Text>
                    <Separator isActive={status === 'started'}/>
                    <ButtonsWrapper>
                        {['idle', 'paused'].includes(status) && <StartButton onClick={onStart} />}
                        {status === 'started' && <PauseButton onClick={onPaused} />}
                        <StopButton onClick={onStop} isActive={status === 'started'} />
                        <DeleteButton onClick={() => setConfirmingDelete(true)} />
                    </ButtonsWrapper>
                </TimerStyled>
            </Block>
            {confirmingDelete && (
                <ConfirmDialog
                    onConfirm={() => onDelete(id)}
                    onCancel={() => setConfirmingDelete(false)}
                />
            )}
        </>
    )
};
