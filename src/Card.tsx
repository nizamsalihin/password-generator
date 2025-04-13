export default function Card({children, className}:any) {
    return (
        <div className={`bg-black-soft p-4 ${className}`}>
            {children}
        </div>
    )

}
