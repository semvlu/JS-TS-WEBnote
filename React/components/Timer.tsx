// useReducer:  mng multi states w/ complex logic
// useMemo: memo value, isolate expensive value, 
// cf. useCallback in ListGroup
import { useState, useEffect, useReducer, useMemo } from "react";

const reducer = (state: any, action: any) => { // return nextState 
    // state: cur state
    // action: action w/ a type
    switch (action.type) {
        case 'INCREMENT': return { cnt: state.cnt + 1 };
        case 'DECREMENT': return { cnt: state.cnt - 1 };
        case 'MULTIPLY' : return { cnt: state.cnt * action.payload };
        case 'DIVISION' : return { cnt: state.cnt / action.payload };
        default: return state;
    }
}

const duurCalc = (n: number) => {
    console.log('Calculating...');
    for (let i = 0; i < 1000000000; i++) 
        n++;
    return n;
}

const Timer = () => {
    const [sec, setSec] = useState(0);
    const [sqr, setSqr] = useState(0);
    // const [state, action] = userReducer(reducer, initState);
    
    const [state, dispatch] = useReducer(reducer, { cnt: 0 });

    useEffect(() => {
        setTimeout(() => {
            setSec(sec + 1);
        }, 1000);
    });
    useEffect(() => {
        setSqr(() => Math.pow(state.cnt, 2));
    }, [state.cnt]);

    const calc = useMemo(() => duurCalc(sec), [sec]);
    return (
        <div className="col-sm-4">
            <p>Timer: <b>{sec}</b> seconds</p>
            
            <p>Expensive calculation, sec as param: {calc}</p>

            <button className="btn btn-outline-warning" 
                onClick={() => dispatch({ type: 'DIVISION', payload: sec})}>
                    <b>/</b>
            </button>

            <button className="btn btn-outline-danger"
                // dispatch: return action, 
                // e.g. dispatch({ type: "incr", param: value}) 
                onClick={() => dispatch({ type: 'DECREMENT' })}>
                    { // equiv. setCnt(cnt - 1)
                    }
                    <b>-</b>
            </button>

            <button className="btn btn-outline-success" 
                onClick={() => dispatch({ type: 'INCREMENT'})}>
                    {// equiv. setCnt(cnt + 1)
                    }
                    <b>+</b>
            </button>

            <button className="btn btn-outline-info" 
                onClick={() => dispatch({ type: 'MULTIPLY', payload: sec})}>
                    <b>*</b>
            </button>

            <p>Counter: {state.cnt}; Square: {sqr}</p>
        </div>
    )
}
export default Timer;