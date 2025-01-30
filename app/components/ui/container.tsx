import React from "react";
import { cn } from "~/lib/utils";

type Props = {
    className?: string;
    children: React.ReactNode;
};

const Container = ({ className, children }: Props) => {
    return (
        <div className={cn("max-w-7xl mx-auto px-4 lg:px-0", className)}>
            {children}
        </div>
    );
};

export default Container;
