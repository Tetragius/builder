import styled, { css } from 'styled-components';

export const Box = styled.div`
    position: relative;
    display: inline-block;
    height: 100%;
    width: calc(100% - 240px * 2);       
    float: left;
`;

export const Main = styled.div<{ viewAll?: boolean; length?: number }>`
    position: relative;
    height: 100%;
    width: 100%;
    box-shadow: inset 0px 0px 4px 2px #8080807a;
    background: #80808012;

    ${({ viewAll }) => viewAll && css`
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        iframe{
            width: calc(50% - 32px);
            height: calc(50% - 32px);
            border: 1px solid gray;
            margin: 16px;
        }
    `}

`;