import styled from 'styled-components';

export const Box = styled.div`
    padding: 16px;
`;

export const SelectItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const Size = styled.div`
    background-color: black;
    height: 16px;
    margin-right: 32px;
`;

export const Color = styled.div`
    min-width: 16px;
    min-height: 16px;
    border-radius: 32px;
    margin-right: 32px;
`;

export const Border = styled.div`
    min-width: 16px;
    min-height: 16px;
    border-radius: 32px;
    margin-right: 32px;
    border-width: 1px;
    border-color: black;
`;

export const Block = styled.div`
    display: flex; 
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding-bottom: 8px;
    border-bottom: 1px solid gray;
`;

export const BlockName = styled.div`
    margin-top: -16px;
    margin-bottom: 8px;
`;