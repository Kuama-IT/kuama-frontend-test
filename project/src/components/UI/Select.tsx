import React from 'react';

type Props = {
    children?: React.ReactNode,
    [props:string]: any,
}

const Select = ({children, ...props}: Props) => {
    return (
        <select {...props}
            className={`border border-blue-300 p-2 rounded w-full cursor-pointer`}>
            {children}
        </select>
    );
};

export default Select;
