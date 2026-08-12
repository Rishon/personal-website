import { Children, Fragment, isValidElement, ReactNode } from "react";

interface WordSettleProps {
  children: ReactNode;
  delay?: number;
  stagger?: number;
  className?: string;
}

const WORD =
  "inline-block animate-word-settle opacity-0 motion-reduce:animate-none motion-reduce:opacity-100";

// Splits children into words for a staggered entrance
export default function WordSettle({
  children,
  delay = 0,
  stagger = 0.024,
  className = "",
}: WordSettleProps) {
  let index = 0;

  const render = (node: ReactNode, key: string): ReactNode => {
    if (typeof node === "string" || typeof node === "number") {
      return String(node)
        .split(/(\s+)/)
        .map((part, i) => {
          if (part === "") return null;
          if (/^\s+$/.test(part))
            return <Fragment key={`${key}-${i}`}> </Fragment>;
          const slot = index++;
          return (
            <span
              key={`${key}-${i}`}
              className={WORD}
              style={{ animationDelay: `${delay + slot * stagger}s` }}
            >
              {part}
            </span>
          );
        });
    }

    if (isValidElement(node)) {
      const slot = index++;
      return (
        <span
          key={key}
          className={WORD}
          style={{ animationDelay: `${delay + slot * stagger}s` }}
        >
          {node}
        </span>
      );
    }

    return null;
  };

  return (
    <span className={className}>
      {Children.toArray(children).map((child, i) => render(child, `c${i}`))}
    </span>
  );
}
