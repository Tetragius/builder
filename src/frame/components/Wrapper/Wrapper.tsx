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
import { Box, LT, LB, RT, RB, styleWithoutWrap, Delete, Rotate } from "./Wrapper.styled";
import ReactDOM from "react-dom";
import { IComponent, IStore } from "../../../interfaces";
import { extractProps, fillElement, getElement, removeElement } from "../../../services/Core";
import { useRaxy } from "@tetragius/raxy-react";
import { clearFromPositionsStyles, styleFormatter } from "../../../utils/styleFormatter";
import { Placeholder } from "../Slot";
class WrapperClass extends React.PureComponent {

  node = null;
  dummy = null;

  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    const node = ReactDOM.findDOMNode(this);
    this.node = node?.nodeType === 3 ? node.parentNode : node;
    if (this.dummy) {
      this.dummy.remove();
      this.dummy = null;
    }
    if (this.props.selected) {
      this.dummy = document.createElement('div');
      this.node.appendChild(this.dummy);
      ReactDOM.unstable_renderSubtreeIntoContainer(this, <Delete onClick={this.props.onRemove} ><Close /></Delete>, this.dummy);
    }
  }

  render() {
    return this.props.children;
  }
}

export const WrapperConstructor = (props: any) => {

  let { item, onDragStart, onDragEnd, onDragOver, onDrop, ...forwardProps } = props;

  const {
    store,
    state
  } = useRaxy<IStore>((store) => ({
    item,
    selected: store.project.selected === item,
    hovered: store.project.hovered === item,
    code: getCode(item.name),
    structure: store.project.structure,
    isDragMode: store.flags.workplace.isDragMode,
  }), {
    selected: { ignoreTimeStamp: true },
    hovered: { ignoreTimeStamp: true },
    structure: { ignoreTimeStamp: true },
  });

  const { selected, hovered, structure, code, isDragMode } = state;
  const { props: componentProps, style: componentStyle, ...meta } = item;

  const nowrap = meta.nowrap;
  const resizable = meta.resizable;

  const allowChildren = meta.allowChildren;
  const componentSlots = meta.slots ?? [];
  const componentChildren = (structure as IComponent[])
    .filter((child: IComponent) =>
      child.parentId === item.id
      && !(child.name === 'Slot' && componentSlots.includes(child.props?.name?.value)));

  const ref = useRef<HTMLElement>(null);

  const drag = useRef(false);
  const dragSize = useRef(false);
  const dragSizeTarget = useRef(null);
  const refWrapped = useRef<any>();

  const constructChildren = useCallback(() => {
    if (allowChildren) {

      let children;

      if (Array.isArray(componentChildren) && componentChildren.length && !item.props?.$text?.value) {

        children = componentChildren.map((child, idx) => {

          if (typeof child === 'object') {
            const Wrapper = WrapperFactory(child);
            return <Wrapper key={idx} item={child} />;
          }

          return child;

        })

      }
      else {
        children = item.props?.$text?.value;
      }
      return children || <Placeholder />;
    }
  }, [componentChildren, allowChildren, item]);

  const constructSlots = useCallback(() => {
    const result: any = {};
    componentSlots.forEach((slotName) => {
      const slotItem = (structure as IComponent[]).find(slot => slot.parentId === item.id && slot.props?.name?.value === slotName);
      const slotsChildren = (structure as IComponent[]).filter(child => child.parentId === slotItem?.id);
      if (slotItem && !slotsChildren.length) {
        const Wrapper = WrapperFactory(slotItem);
        result[slotName] = <Wrapper key={slotItem?.id} item={slotItem} />
      }
      else {
        result[slotName] = <>{slotsChildren.map(child => {
          const Wrapper = WrapperFactory(child);
          return <Wrapper key={child.id} item={child} />
        })}</>
      }
    });
    return result;
  }, [componentSlots, item])

  const selectHandler = useCallback((e: any) => {
    e.stopPropagation();
    store.project.selected = item;
  }, [item]);

  const hoverHandler = useCallback((e: any) => {
    const parent = structure.find(i => i.id === item.parentId);
    if (parent?.name !== 'Tooltip') {
      e.stopPropagation();
    }
    store.project.hovered = item;
  }, [item]);

  const dragHandler = useCallback((e: any) => {
    if (selected && drag.current) {
      item.style.left.value = parseInt(item.style.left.value || 0) + e.movementX;
      item.style.top.value = parseInt(item.style.top.value || 0) + e.movementY;
    }
  }, [item, selected]);

  const dragSizeHandler = useCallback((e: any) => {
    if (selected && dragSize.current) {
      if (dragSizeTarget.current === "lt") {
        item.style.left.value = parseInt(item.style.left.value || 0) + e.movementX;
        item.style.width.value = parseInt(item.style.width.value || 0) - e.movementX;
        item.style.top.value = parseInt(item.style.top.value || 0) + e.movementY;
        item.style.height.value = parseInt(item.style.height.value || 0) - e.movementY;
      }
      if (dragSizeTarget.current === "lb") {
        item.style.left.value = parseInt(item.style.left.value || 0) + e.movementX;
        item.style.width.value = parseInt(item.style.width.value || 0) - e.movementX;
        item.style.height.value = parseInt(item.style.height.value || 0) + e.movementY;
      }
      if (dragSizeTarget.current === "rt") {
        item.style.width.value = parseInt(item.style.width.value || 0) + e.movementX;
        item.style.top.value = parseInt(item.style.top.value || 0) + e.movementY;
        item.style.height.value = parseInt(item.style.height.value || 0) - e.movementY;
      }
      if (dragSizeTarget.current === "rb") {
        item.style.width.value = parseInt(item.style.width.value || 0) + e.movementX;
        item.style.height.value = parseInt(item.style.height.value || 0) + e.movementY;
      }
      if (dragSizeTarget.current === "rotate") {
        item.style.rotateZ.value = parseInt(item.style.rotateZ.value || 0) + e.movementX;
      }
    }
  }, [item, selected]);

  const removeHandlers = useCallback(() => {
    drag.current = false;
    dragSize.current = false;
    window.removeEventListener("mouseup", removeHandlers);
    window.removeEventListener("mousemove", dragHandler);
    window.removeEventListener("mousemove", dragSizeHandler);
  }, [dragHandler, dragSizeHandler]);

  const dragStartHandler = useCallback((e: any) => {
    e.stopPropagation();
    drag.current = true;
    window.addEventListener("mouseup", removeHandlers);
    window.addEventListener("mousemove", dragHandler);
  }, [removeHandlers, dragHandler]);

  const dragStartSizeHandler = useCallback((e: any) => {
    e.stopPropagation();
    dragSize.current = true;
    dragSizeTarget.current = e.target.id;
    window.addEventListener("mouseup", removeHandlers);
    window.addEventListener("mousemove", dragSizeHandler);
  }, [removeHandlers, dragSizeHandler]);

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

  const mouseOutHandler = useCallback(() => {
    if (hovered && !selected) {
      store.project.hovered = null;
    }
  }, [hovered, selected]);
  //

  const style: any = styleFormatter(componentStyle)[0];

  if (!nowrap) {
    return (
      <Box
        ref={ref}
        onClick={selectHandler}
        onMouseDown={dragStartHandler}
        onMouseOver={hoverHandler}
        onMouseOut={mouseOutHandler}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={_onDragOver}
        onDrop={onDrop}
        selected={selected}
        hovered={hovered}
        isDragMode={isDragMode}
        resizable={resizable}
        name={item.name}
        allowChildren={allowChildren}
        style={style}
      >
        <Suspense fallback={''}>
          <Instanse
            {...forwardProps}
            {...extractProps(componentProps)}
            {...constructSlots()}
            style={clearFromPositionsStyles(style)}>
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
              <Rotate id="rotate" onMouseDown={dragStartSizeHandler} />
              <Delete onClick={remove} ><Close /></Delete>
            </>
          )
        }
      </Box >
    );
  }

  return <WrapperClass selected={selected} onRemove={remove} ref={it => refWrapped.current = it}>
    <Suspense fallback={''}>
      <Instanse
        id={item.id}
        onClick={selectHandler}
        onMouseDown={dragStartHandler}
        onMouseOver={hoverHandler}
        onMouseOut={mouseOutHandler}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={_onDragOver}
        onDrop={onDrop}
        selected={selected}
        hovered={hovered}
        isDragMode={isDragMode}
        allowChildren={allowChildren}
        name={item.name}
        {...forwardProps}
        {...extractProps(componentProps)}
        {...constructSlots()}>
        {constructChildren()}
      </Instanse>
    </Suspense>
  </WrapperClass>

};

const Wrapper = DnDHOC('WRAPPER', WrapperConstructor);

export const WrapperFactory = (item) => {
  const obj = { instanse: null };
  getElement(item).then(instanse => obj.instanse = instanse);
  Wrapper.toString = () => String(obj.instanse || "");
  return Wrapper;
}