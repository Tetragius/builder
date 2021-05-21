import styled from 'styled-components';

export const Box = styled.div`
    position: relative;
    display: inline-block;
    height: calc(100% - 24px);
    width: 240px;
    overflow: auto;
`;

export const Head = styled.div`
    display: flex;
    flex-direction: row;
    align-items:center;
    justify-content:center;
    margin-bottom: 14px;
`;

export const Content = styled.div`
    position: relative;
    display: inline-block;
    height: calc(100% - 44px);
    width: 100%;
    overflow: auto;
`;

export const Menu = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;