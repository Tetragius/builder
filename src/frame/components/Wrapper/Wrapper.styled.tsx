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

export const Delete = styled.div<{ fixed?: boolean; right?: number; top?: number; }>`
  box-sizing: border-box;
  position:  ${({ fixed }) => fixed ? 'fixed' : 'absolute'};
  border-radius: 16px;
  background: rgb(232, 232, 232);
  height: 32px;
  width: 32px;
  right: ${({ right }) => (right ?? 0) + 4}px;
  top: ${({ top }) => (top ?? 0) + 4}px;
  cursor: pointer;
  opacity: 0.2;
  transition: all .2s;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  &:hover {
    opacity: 0.5;
  }
`

export const Box = styled.div<{
  left?: any;
  top?: any;
  width?: any;
  height?: any;
  selected?: boolean;
  hovered?: boolean;
  resizable?: any;
  name: string;
  isDragMode?: boolean;
}>`
  box-sizing: border-box;
  display: inline-block;

  position: relative;

  left: ${({ left }) => left ?? "0"}px;
  top: ${({ top }) => top ?? "0"}px;

  width: auto;
  height: auto;

  ${({ resizable, width, height }) =>
    resizable === "all" &&
    css`
      width: ${width ?? ""}px;
      height: ${height ?? ""}px;
    `}

  ${({ resizable, width }) =>
    resizable === "x" &&
    css`
     width: ${width ?? ""}px;
    `}

  ${({ resizable, height }) =>
    resizable === "y" &&
    css`
    height: ${height ?? ""}px;
    `}

  user-select: none;

  ${({ hovered }) => hovered && "outline: 1px dashed black;"}

  ${({ selected }) => selected && "outline: 1px dashed blue;"}

  ${({ isDragMode, name }) => isDragMode && css`
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
    outline: 1px dashed black;
    background-color: rgb(200, 225, 193, 0.1);
    background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2373ab52' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E");
  `}

`;

export const styleWithoutWrap = (element: any) => styled(element)`

  position: relative;

  ${({ hovered }) => hovered && "outline: 1px dashed black;"}
  ${({ selected }) => selected && "outline: 1px dashed blue;"}

  ${({ isDragMode, name }) => isDragMode && css`
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
    outline: 1px dashed black;
    background-color: rgb(200, 225, 193, 0.1);
    background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2373ab52' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E");
  `}
`;