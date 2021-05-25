import { IStore } from "../../interfaces";

export const frameRaxyInstanse = window.parent['raxyInstanse'];
export const store: IStore = frameRaxyInstanse?.store;