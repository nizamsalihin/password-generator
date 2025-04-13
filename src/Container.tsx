export default function Container({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={`max-w-xl mx-auto w-full px-8 ${className}`}>
            {children}
        </div>
    );
}
