import { useRaxy } from '@tetragius/raxy-react';
import React, { useCallback, useEffect, useRef } from 'react';
import { Box } from './Frame.styles';

export const Frame = ({ item, id }: any) => {

    const ref = useRef<HTMLIFrameElement>();

    const { store } = useRaxy();

    const clickHandler = useCallback(() => {
        store.flags.workplace.currentScreenId = item.id;
    }, []);

    const dblClickHandler = useCallback(() => {
        store.flags.workplace.currentScreenId = item.id;
        store.flags.workplace.viewAll = false;
    }, []);

    useEffect(() => {

        if (ref.current) {
            ref.current.contentWindow?.addEventListener('click', clickHandler)
            ref.current.contentWindow?.addEventListener('dblclick', dblClickHandler)
        }

        return () => {
            ref.current?.contentWindow?.removeEventListener('click', clickHandler)
            ref.current?.contentWindow?.removeEventListener('dblclick', dblClickHandler)
        }
    }, [clickHandler, dblClickHandler])

    return <Box id={id} ref={ref as any} src={'frame.html'} />;
}