import React from "react";
import styled, { css } from "styled-components";

export const LT = styled.div`
  box-sizing: border-box;
  position: absolute;
  background-color: black;
  height: 8px;
  width: 8px;
  left: -4px;
  top: -4px;
  cursor: pointer;
`;

export const LB = styled.div`
  box-sizing: border-box;
  position: absolute;
  background-color: black;
  height: 8px;
  width: 8px;
  left: -4px;
  bottom: -4px;
  cursor: pointer;
`;

export const RT = styled.div`
  box-sizing: border-box;
  position: absolute;
  background-color: black;
  height: 8px;
  width: 8px;
  right: -4px;
  top: -4px;
  cursor: pointer;
`;

export const RB = styled.div`
  box-sizing: border-box;
  position: absolute;
  background-color: black;
  height: 8px;
  width: 8px;
  right: -4px;
  bottom: -4px;
  cursor: pointer;
`;

export const Rotate = styled.div`
  box-sizing: border-box;
  position: absolute;
  background-color: #93e41c;
  border-radius: 16px;
  height: 8px;
  width: 8px;
  left: 50%;
  top: -16px;
  transform: translateX(-50%);
  cursor: pointer;
`;

export const Delete = styled.div`
  box-sizing: border-box;
  position: absolute;
  background: black;
  color: white;
  height: 16px;
  width: 16px;
  right: 0;
  top: 0;
  cursor: pointer;
  opacity: 0.5;
  transition: all .2s;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  &:hover {
    opacity: 1;
  }
`

export const Box = styled.div<{
  selected?: boolean;
  hovered?: boolean;
  resizable?: any;
  name: string;
  isDragMode?: boolean;
  allowChildren?: boolean;
}>`
  box-sizing: border-box;
  display: block;

  position: relative;

  user-select: none;

  ${({ hovered }) => hovered && "outline: 1px dashed black!important;"}

  ${({ selected }) => selected && "outline: 1px dashed blue!important;"}

  ${({ isDragMode, name, allowChildren }) => isDragMode && !!allowChildren && css`
    &:after {
      content: '${name}';
      position: absolute;
      left: 16px;
      top: 0;
      line-height: 14px;
      font-size: 12px;
      background-color: black;
      color: white;
    }
    padding: 16px;
    outline: 1px dashed #020fcc!important;
    background-color: rgb(200, 225, 193, 0.1)!important;
    background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2373ab52' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")!important;
  `}

`;

export const styleWithoutWrap = (element: any) => styled(element)`

  position: relative;

  ${({ hovered }) => hovered && "outline: 1px dashed black;!important"}
  ${({ selected }) => selected && "outline: 1px dashed blue;!important"}

  ${({ isDragMode, name, allowChildren }) => isDragMode && !!allowChildren && css`
  &:after {
      content: '${name}';
      position: absolute;
      left: 16px;
      top: 0;
      line-height: 14px;
      font-size: 12px;
      background-color: black;
      color: white;
    }
    padding: 16px;
    outline: 1px dashed black!important;
    background-color: rgb(200, 225, 193, 0.1)!important;
    background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2373ab52' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")!important;
  `}
`;