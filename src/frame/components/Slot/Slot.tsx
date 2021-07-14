import React from 'react';
import { Box, BoxComment, BoxPlaceholder } from './Slot.styles';

export const Slot = ({ name, ...props }) => {
    return <Box {...props}>slot:{name}</Box>
};

export const Children = (props) => {
    return <Box {...props}>children</Box>
};

export const Property = ({ name, ...props }) => {
    return <Box {...props}>property:{name}</Box>
};

export const Comment = ({ description, ...props }) => {
    return <BoxComment {...props}>{description}</BoxComment>
};

export const Placeholder = (props) => {
    return <BoxPlaceholder {...props}>{props.children || 'PLACEHOLDER'}</BoxPlaceholder>
};