import { DnDSinglle } from "../services/DnD"
import { addComponentToStore, createComponent, createSlot } from "../services/Core";
import { store } from "../store/store";

const createReq = (name, item, parentId) => {
    const component = createComponent(name, item, parentId);

    addComponentToStore(component);
    if (!!component.defaultChildren?.length) {
        component.defaultChildren.forEach((childName: string) => {
            const meta = JSON.parse(JSON.stringify(store.meta[childName]));
            const createdChild = createReq(childName, meta, component.id);
            createdChild && addComponentToStore(createdChild);
        });
    }
    if (!!component.slots?.length) {
        component.slots.forEach((slot: string) => {
            const createdSlot = createSlot(slot, component.id);
            addComponentToStore(createdSlot);
        });
    }
}

export const fieldListener = (message: any) => {
    if (message.type === 'drop' && message?.reciever?.name === 'CONTENT' && message?.data?.name === 'COMPONENT') {
        const parentId = message.reciever?.object?.id;
        if (parentId) {
            createReq(message.data?.object.name, message.data?.object.item, parentId);
        }
    }
}

DnDSinglle.subscribe(fieldListener);