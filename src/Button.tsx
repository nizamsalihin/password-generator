interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function Button({ children, className, onClick = () => {} }: ButtonProps) {
    return (
        <button
            className={`bg-primary text-black px-4 py-2 cursor-pointer hover:bg-primary/85 ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
