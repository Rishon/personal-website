import type {IconType} from "react-icons";

interface TechTokenProps {
    icon: IconType;
    label: string;
    color?: string;
}

export default function TechToken({icon: Icon, label, color}: TechTokenProps) {
    return (
        <span
            className="group/tech inline-flex cursor-default items-baseline gap-1 whitespace-nowrap font-medium text-ink">
      <span className="relative top-[0.12em] inline-flex h-[1.1em] w-[1.1em] items-center justify-center">
        <Icon className="h-full w-full opacity-25 transition-opacity duration-300 group-hover/tech:opacity-0"/>
        <Icon
            className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-300 group-hover/tech:opacity-100"
            style={color ? {color} : undefined}
        />
      </span>
            {label}
    </span>
    );
}
