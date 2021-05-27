import styled from 'styled-components';

export const Box = styled.div`
    position: relative;
    display: inline-block;
    height: 100%;
    width: 240px;
    overflow: auto;
    float: left;
`;

export const Head = styled.div`
    display: flex;
    flex-direction: row;
    align-items:center;
    justify-content:center;
    margin: 14px 0;
`;

export const Content = styled.div`
    position: relative;
    display: inline-block;
    height: calc(100% - 54px);
    width: 100%;
    overflow: auto;
`;