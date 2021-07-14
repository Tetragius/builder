import styled from 'styled-components';

export const Box = styled.div`
    width: 100%;
    height: 100%;
`;

export const BoxPlaceholder = styled.div`
    width: 100%;
    height: 100%;
`;

export const BoxComment = styled.div`
    box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.1) inset;
    word-break: break-all;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 8px;

    &:before, &:after{
        position:absolute;
        content:"";
        bottom:12px;left:15px;top:80%;
        width:45%;
        background:#9B7468;
        z-index:-1;
        -webkit-box-shadow: 0 20px 15px #9B7468;
        -moz-box-shadow: 0 20px 15px #9B7468;
        box-shadow: 0 20px 15px #9B7468;
        -webkit-transform: rotate(-6deg);
        -moz-transform: rotate(-6deg);
        transform: rotate(-6deg);
    }
    &:after{
        -webkit-transform: rotate(6deg);
        -moz-transform: rotate(6deg);
        transform: rotate(6deg);
        right: 15px;left: auto;
    }
`;