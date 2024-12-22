import { useState, memo } from "react";
// memo: keep component from needlessly re-rendering, 
// useful when component is complex

/* 
Fragment: w/o it, can only return single element,
if desire multi elem, use <Fragment></Fragment>, or <></>
*/

// Props: component input
// { items: [], heading: string }

interface Props {
    items: string[];
    heading: string;
    onSelItem: (item: string) => void;
}

function ListGroup(p: Props) { // Alt: {items, heading}: Props
    const [selIdx, setSelIdx] = useState(-1);
    // useState param: init state of selIdx
    // State: data mng by component

    return (
    <>
        <h1>{p.heading}</h1>
        { p.items.length === 0 ? <p>No items found</p> : null}

        <ul className="list-group col-md-4 mx-auto">
            { p.items.map((item, index) => 
            <li 
                className={ selIdx === index ? "list-group-item active" : "list-group-item"}
                key={item}  // General case: key={item.id}
                onClick={ () => {
                    setSelIdx(index);
                    p.onSelItem(item);
                }} // cf. HTML: onclick="func()"
            >
                {item}
            </li>)}
           
        </ul>
    </>);
}

export default memo(ListGroup); // memo(component) here
// memo: similar to cache, change component only necesary
// useCallback: memo func, isolate expensive func
// when memo large component, and its prop is set by a func setProps(),

// useCallback(() => setProps(), [Props])
// e.g. Listgroup(p), setProps(p)
// useCallback(() => {
//  setProps((p) => [...p, "New Item"]);
//  }, [props]);


// useMemo: memo value, isolate expensive value, vide Timer
