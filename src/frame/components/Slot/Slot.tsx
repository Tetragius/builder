import React from 'react';
import { Box } from './Slot.styles';

export const Slot = ({ name }) => {
    return <Box>slot:{name}</Box>
};

export const Children = () => {
    return <Box>children</Box>
};

export const Property = ({ name }) => {
    return <Box>property:{name}</Box>
};

export const Comment = ({ description }) => {
    return <Box>{description}</Box>
};