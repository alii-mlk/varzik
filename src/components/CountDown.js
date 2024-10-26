/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect } from 'react';
export default function Countdown({ remainingTime, onTimeUpdate }) {
    useEffect(() => {
        const interval = setInterval(() => {
            onTimeUpdate((prevTime) => {
                if (prevTime == 1 || prevTime == 0) return 0
                else {
                    const updatedTime = prevTime - 1;
                    return updatedTime;
                }
            });
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [onTimeUpdate]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    if (remainingTime < 1) return undefined
    return (
        <div css={css`display:flex;align-items:center;justify-content:center;`}>
            {formatTime(remainingTime)}
        </div>
    );

};
