import React from 'react';

type Props = {
    className?: string,
    [props:string]: any,
}

const Input = ({className, ...props}: Props) => {
    return (
        <input {...props}
            className={`p-2 mb-1 border border-blue-300 rounded w-full ${className}`}/>
    );
};

export default Input;
