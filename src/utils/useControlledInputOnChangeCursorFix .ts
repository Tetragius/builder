import { useCallback, useLayoutEffect, useRef } from "react"

const useControlledInputOnChangeCursorFix = callback => {
    const inputCursor = useRef(0);
    const inputRef = useRef<HTMLInputElement>();

    const newCallback = useCallback(
        (e, ...args) => {
            inputCursor.current = e.target.selectionStart;
            if (e.target.type === 'text') {
                inputRef.current = e.target;
            }
            callback(e, ...args);
        },
        [callback],
    )

    useLayoutEffect(() => {
        if (inputRef.current) {
            inputRef.current?.setSelectionRange(inputCursor.current, inputCursor.current);
        }
    })

    return newCallback;
}

export default useControlledInputOnChangeCursorFix;