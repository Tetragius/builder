import styled from 'styled-components';

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

export const Dir = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: 2px;
    cursor: pointer;
    margin-left: -8px;

    line-height: 16px;
    font-size: 14px;

    &:after{
        content: '';
        position: absolute;
        width: 100%;
        height: 20px;
        left: 0;
        background: transparent;
        transition: all .2s;
        z-index: -1;
    }

    &:hover:after{
        background: #80808026;
    }
    
    &:focus{
        outline: none;
    }

    &:focus:after{
        background: #8080804a;
    }
`;

export const Icon = styled.div`
    position: relative;
    display: inline-block;
    width: 16px;
    height: 16px;
    min-width: 16px;
    min-height: 16px;
    margin-right: 8px;
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