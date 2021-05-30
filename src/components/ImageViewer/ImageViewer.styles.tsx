import styled from 'styled-components';

export const Box = styled.div<{ url: string }>`
    width: 100%;
    height: 100%;
    background-image: url(${({ url }) => url ?? ''});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
`;