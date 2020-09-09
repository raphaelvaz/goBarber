import React from 'react';

import { Container } from './styles';

interface ToooltipṔrops {
    title: string;
    className?: string;
}

const Tooltip: React.FC<ToooltipṔrops> = ({ title, className, children }) => {
    return <Container className={className}>
        {children}
        <span>{title}</span>
    </Container>;
}

export default Tooltip;