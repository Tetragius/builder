import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef
} from "react";
import { Close } from 'vienna.icons';
import { DnDHOC } from "../../../services/DnD";
import { getCode } from "../../../services/ModuleLoader";
import { Box, LT, LB, RT, RB, styleWithoutWrap, Delete } from "./Wrapper.styled";
import ReactDOM from "react-dom";
import { IComponent, IStore } from "../../../interfaces";
import { extractProps, fillElement, removeElement } from "../../../services/Core";
import { useRaxy } from "@tetragius/raxy-react";
import { styleFormatter } from "../../../utils/styleFormatter";

export const _Wrapper = (props: any) => {

  let { itemId, nowrap, onDragStart, onDragEnd, onDragOver, onDrop, ...forwardProps } = props;

  const {
    store,
    state
  } = useRaxy<IStore>((store) => ({
    item: store.project.structure.find(item => item.id === itemId),
    get selected() { return store.project.selected === this.item },
    get hovered() { return store.project.hovered === this.item },
    get code() { return getCode(this.item.name) },
    structure: store.project.structure,
    isDragMode: store.flags.workplace.isDragMode,
  }), {
    selected: { ignoreTimeStamp: true },
    hovered: { ignoreTimeStamp: true },
  });

  const { selected, hovered, structure, code, isDragMode } = state;
  const item: IComponent = state.item;
  const { props: componentProps, style: componentStyle, ...meta } = item;

  nowrap = props.nowrap ?? meta.nowrap;
  const resizable = meta.resizable;
  const nowrapChildren = meta.nowrapChildren;
  const allowChildren = meta.allowChildren;

  const componentChildren = (structure as IComponent[]).filter((child: IComponent) => child.parentId === item.id && !child.isSlot);
  const componentSlots = (structure as IComponent[]).filter((child: IComponent) => child.parentId === item.id && child.isSlot);

  const ref = useRef<HTMLElement>(null);

  const drag = useRef(false);
  const dragSize = useRef(false);
  const dragSizeTarget = useRef(null);

  const constructChildren = () => {
    if (allowChildren) {

      let children;

      if (Array.isArray(componentChildren) && componentChildren.length && !item.props?.$text?.value) {

        children = componentChildren.map((child, idx) => {

          if (typeof child === 'object') {
            return <Wrapper key={idx} itemId={child.id} nowrap={nowrapChildren} />;
          }

          return child;

        })

      }
      else {
        children = item.props?.$text?.value
      }

      return children || ['PLACEHOLDER'];
    }
  };

  const constructSlots = () => {
    const result: any = {};
    componentSlots.forEach((slot) => {
      const slotsChildren = (structure as IComponent[]).filter(item => item.parentId === slot.id);
      if (!slotsChildren.length) {
        result[slot.name] = <Wrapper key={slot.id} itemId={slot.id} />
      }
      else {
        result[slot.name] = <>{slotsChildren.map(child => <Wrapper key={child.id} itemId={child.id} />)}</>
      }
    });
    return result;
  }

  const selectHandler = (e: any) => {
    e.stopPropagation();
    store.project.selected = item;
  };

  const hoverHandler = (e: any) => {
    if (item.parent?.name !== 'Tooltip') {
      e.stopPropagation();
    }
    store.project.hovered = item;
  };

  const dragHandler = (e: any) => {
    if (store?.project.selected && drag.current) {
      item.style.left.value = parseInt(item.style.left.value) + e.movementX;
      item.style.top.value = parseInt(item.style.top.value) + e.movementY;
    }
  };

  const dragSizeHandler = (e: any) => {
    if (store?.project.selected && dragSize.current) {
      if (dragSizeTarget.current === "lt") {
        item.style.left.value = parseInt(item.style.left.value) + e.movementX;
        item.style.width.value = parseInt(item.style.width.value) - e.movementX;
        item.style.top.value = parseInt(item.style.top.value) + e.movementY;
        item.style.height.value = parseInt(item.style.height.value) - e.movementY;
      }
      if (dragSizeTarget.current === "lb") {
        item.style.left.value = parseInt(item.style.left.value) + e.movementX;
        item.style.width.value = parseInt(item.style.width.value) - e.movementX;
        item.style.height.value = parseInt(item.style.height.value) + e.movementY;
      }
      if (dragSizeTarget.current === "rt") {
        item.style.width.value = parseInt(item.style.width.value) + e.movementX;
        item.style.top.value = parseInt(item.style.top.value) + e.movementY;
        item.style.height.value = parseInt(item.style.height.value) - e.movementY;
      }
      if (dragSizeTarget.current === "rb") {
        item.style.width.value = parseInt(item.style.width.value) + e.movementX;
        item.style.height.value = parseInt(item.style.height.value) + e.movementY;
      }
    }
  };

  const removeHandlers = () => {
    drag.current = false;
    dragSize.current = false;
    window.removeEventListener("mouseup", removeHandlers);
    window.removeEventListener("mousemove", dragHandler);
    window.removeEventListener("mousemove", dragSizeHandler);
  };

  const dragStartHandler = (e: any) => {
    e.stopPropagation();
    drag.current = true;
    window.addEventListener("mouseup", removeHandlers);
    window.addEventListener("mousemove", dragHandler);
  };

  const dragStartSizeHandler = (e: any) => {
    e.stopPropagation();
    dragSize.current = true;
    dragSizeTarget.current = e.target.id;
    window.addEventListener("mouseup", removeHandlers);
    window.addEventListener("mousemove", dragSizeHandler);
  };

  useEffect(() => {
    return () => removeHandlers()
  }, []);

  const _onDragOver = (e: any) => {
    onDragOver(e);
    e.stopPropagation();
    store.project.hovered = item;
  }

  const Instanse = useMemo(() => lazy(() => fillElement(item, styleWithoutWrap, nowrap)), [code]);

  const remove = useCallback(() => {
    removeElement(item);
  }, []);
  //

  if (!nowrap) {
    return (
      <Box
        ref={ref}
        onClick={selectHandler}
        onMouseDown={dragStartHandler}
        onMouseOver={hoverHandler}
        onMouseOut={() => store.project.hovered = null}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={_onDragOver}
        onDrop={onDrop}
        selected={selected}
        hovered={hovered}
        isDragMode={isDragMode}
        resizable={resizable}
        name={item.name}
        style={styleFormatter(componentStyle)}
      >
        <Suspense fallback={''}>
          <Instanse {...forwardProps} {...extractProps(componentProps)} {...constructSlots()}>
            {constructChildren()}
          </Instanse>
        </Suspense>
        {
          selected && (
            <>
              <LT id="lt" onMouseDown={dragStartSizeHandler} />
              <LB id="lb" onMouseDown={dragStartSizeHandler} />
              <RT id="rt" onMouseDown={dragStartSizeHandler} />
              <RB id="rb" onMouseDown={dragStartSizeHandler} />
              <Delete onClick={remove} ><Close /></Delete>
            </>
          )
        }
      </Box >
    );
  }

  const element = document.getElementById(item.id);
  const rect = element?.getBoundingClientRect();

  return <>
    <Suspense fallback={''}>
      <Instanse
        id={item.id}
        onClick={selectHandler}
        onMouseDown={dragStartHandler}
        onMouseOver={hoverHandler}
        onMouseOut={() => store.project.hovered = null}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={_onDragOver}
        onDrop={onDrop}
        selected={selected}
        hovered={hovered}
        isDragMode={isDragMode}
        name={item.name}
        {...forwardProps}
        {...extractProps(componentProps)}
        {...constructSlots()}>
        {constructChildren()}
      </Instanse>
    </Suspense>
    {selected && ReactDOM.createPortal(<Delete fixed top={rect?.top} right={window.innerWidth - (rect?.right ?? 0)} onClick={remove}><Close /></Delete>, document.body)}
  </>

};

export const Wrapper = DnDHOC('WRAPPER', _Wrapper);