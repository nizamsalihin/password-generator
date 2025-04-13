export default function TaskWrapper({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-col gap-4 py-4">{children}</div>;
}
