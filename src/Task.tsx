import React, { useId } from "react";

interface TaskProps {
    label: string;
    isActive?: boolean;
    onChange: (isChecked: boolean) => void;
}

export default function Task({ label, isActive = false, onChange }: TaskProps) {
    const id = useId();

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked);
    };

    return (
        <label htmlFor={id} className="flex gap-4 items-center accent-primary cursor-pointer">
            <input type="checkbox" id={id} checked={isActive} onChange={onChangeHandler} className="peer" />
            <div className="text-sm text-white/45 transition-colors peer-checked:text-white">{label}</div>
        </label>
    );
}
