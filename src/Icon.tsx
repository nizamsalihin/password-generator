export type IconSize = 'small' | 'medium' | 'large';

interface IconProps {
    size?: IconSize
    url: string;
}

export default function Icon({ url, size = 'medium' }: IconProps) {
    const sizeClassess: Record<IconSize, string> = {
        small: 'h-3 w-3',
        medium: 'h-4 w-4',
        large: 'h-5 w-5',
    }

    return (
        <img
            src={url}
            alt="copy icon"
            role="button"
            className={`${sizeClassess[size]} block cursor-pointer`}
        />
    );
}
