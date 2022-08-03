import React from 'react';

type Props = {
    className?: string,
    children: React.ReactNode,
    [props: string]: any
}

const Button = ({className, children,...props}: Props) => {
    return (
        <button {...props}
            className={`bg-blue-500 text-white uppercase font-medium py-1 px-4 rounded-full cursor-pointer hover:bg-blue-600 ${className}`}>
            {children}
        </button>
    );
};

export default Button;
