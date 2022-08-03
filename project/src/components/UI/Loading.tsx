import React from 'react';

type Props = {
    label?: string
}

const Loading = ({label = 'Loading...'}: Props) => {
    return (
        <div className='text-gray-500'>
            {label}
        </div>
    );
};

export default Loading;
