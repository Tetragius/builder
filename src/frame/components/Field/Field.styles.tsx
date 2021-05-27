import styled, { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
html {
        height: 100%;
        font-family: Arial, Helvetica, sans-serif;
    }
    body, #frame {
        min-height: 100%;
        height: 100%;    
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
`

export const Box = styled.div`
    height: 100%;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
`;