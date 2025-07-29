import React from 'react';
import { X } from 'lucide-react';

interface InputDoctoProps {
    value: string;
    onChange: (value: string) => void;
    onReset: () => void;
}

const InputDocto: React.FC<InputDoctoProps> = ({ value, onChange, onReset }) => {
    return (
        <div className="relative w-full">
            <input
                className="bg-transparent text-sm w-full border-0 outline-none"
                value={value}
                onChange={(e) => onChange(e.target.value.trim())}
            />
            {value && (
                <X
                    className="absolute right-0 top-0 text-red-400 cursor-pointer"
                    onClick={onReset}
                />
            )}
        </div>
    );
};

export default InputDocto;
