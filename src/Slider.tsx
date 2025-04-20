import React, { useCallback, useEffect, useRef, useState } from "react";

interface SliderProps {
    min?: number;
    max?: number;
    onSlide: (value: number) => void;
}

export default function Slider({ onSlide, min = 0, max = 100 }: SliderProps) {
    const [percentage, setPercentage] = useState<number>(0);
    const isDragging = useRef<boolean>(false);
    const sliderRef = useRef<HTMLDivElement | null>(null);

    const updatePercentage = useCallback((clientX: number) => {
        const slider = sliderRef.current as HTMLDivElement;
        const rect = slider.getBoundingClientRect();

        const clickX = clientX - rect.left;
        const newPercentage = (clickX / rect.width) * 100;
        const clearedPercentage = Math.min(100, Math.max(0, Math.round(newPercentage))); // clamp between 0 and 100 and set to integer
        setPercentage(clearedPercentage);

        const value = Math.round(min + (max - min) * (clearedPercentage / 100));
        onSlide(value);
    }, [min, max, onSlide]);

    const onMouseDownHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        isDragging.current = true;
        updatePercentage(event.clientX);
    };

    const onMouseUpHandler = () => {
        isDragging.current = false;
    };

    const onDivMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        handleMove(event.clientX);
    };

    const handleMove = (x: number) => {
        if (isDragging.current) updatePercentage(x);
      };

    const onMouseMoveHandler = useCallback((event: MouseEvent) => {
        handleMove(event.clientX);
    }, [isDragging, updatePercentage]);

    useEffect(() => {
        // setup mouse event to body
        document.body.addEventListener("mousemove", onMouseMoveHandler);
        document.body.addEventListener("mouseup", onMouseUpHandler);

        return () => {
            document.body.removeEventListener("mousemove", onMouseMoveHandler);
            document.body.addEventListener("mouseup", onMouseUpHandler);
        };
    }, [onMouseMoveHandler]);

    return (
        <div
            ref={sliderRef}
            className="relative bg-black rounded-xl cursor-pointer"
            onMouseDown={onMouseDownHandler}
            onMouseUp={onMouseUpHandler}
            onMouseMove={onDivMouseMove}
        >
            <div className="bg-primary h-1 rounded" style={{ width: `${percentage}%` }}></div>
            <div
                role="button"
                className="rounded-full bg-white absolute top-1/2 aspect-square h-4 -translate-1/2"
                style={{
                    left: `${percentage}%`,
                }}
            ></div>
        </div>
    );
}
