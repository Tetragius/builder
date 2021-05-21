import { addComponentToStore, createComponent, createSlot } from "../frame/services";
import { store } from "../frame/store/store";
import { DnDSinglle } from "../services"

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

export const WrapperListener = (message: any) => {
    if (message?.reciever?.name === 'WRAPPER' && message?.data?.name === 'COMPONENT') {
        const parentId = message.reciever.object.itemId;
        createReq(message.data?.object.name, message.data?.object.item, parentId);
    }
}

DnDSinglle.subscribe(WrapperListener);