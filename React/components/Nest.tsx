// createContext / useContext: share State for nested components
import {useState, createContext, useContext} from 'react';
const AppContext = createContext({});

const Outer = () => {
  const [user, setUser] = useState('John');

  return (
    <AppContext.Provider value={user}>
      <div>
        <p>Outer: {user}</p>
        <Middle />
      </div>
    </AppContext.Provider>
  );
}
const Middle = () => {
    return (
        <div>
            <p>Middle</p>
            <Inner />
        </div>
    );
}
const Inner = () => {
  const user = useContext(AppContext);
  return (
    <div>
      <p>Inner: {user}</p>
    </div>
  );
}
export default Outer;