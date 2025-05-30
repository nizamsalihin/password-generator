interface CardProps {
    children: React.ReactNode;
    className?: string
}

export default function Card({ children, className }: CardProps) {
    return (
        <div className={`bg-black-soft p-4 ${className}`}>
            {children}
        </div>
    )

}
