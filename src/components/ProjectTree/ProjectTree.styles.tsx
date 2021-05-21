import styled, { css } from 'styled-components';

export const Box = styled.div`
    width: 100%;
    padding-left: 16px;
    box-sizing: border-box;
    & > &{
        border-left: 1px solid #80808054;
        &:last-child{        
            border-bottom-left-radius: 8px;
        }
        &:hover{
            border-left: 1px solid gray;
        }
    }
`;

export const Struct = styled.div<{ selected: boolean }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: 2px;
    cursor: pointer;
    margin-left: -14px;

    line-height: 24px;
    font-size: 14px;

    &:after{
        content: '';
        position: absolute;
        width: 100%;
        height: 28px;
        left: 0;
        background: transparent;
        transition: all .2s;
        z-index: -1;
    }

    &:hover:after{
        background: #80808026;
    }
    
    ${({ selected }) => selected && css`
    &:after{
        background: #8080804a;
    }`
    }
`;

export const Icon = styled.div`
    position: relative;
    display: inline-flex;
    width: 24px;
    height: 24px;
    min-width: 24px;
    min-height: 24px;
    margin-right: 8px;
    align-items: center;
    justify-content: center;
`;

export const Name = styled.div`
    position: relative;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const Menu = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 1;
`;