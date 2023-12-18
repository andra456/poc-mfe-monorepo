import Header from "remote/Header";
import Bridge from "remote/bridge";

import { useAppContext } from "./appContext";
//import Bridge from "remote/bridge";
import { useDispatch, useSelector } from "react-redux";
import { clearCount, incrementCount } from "./store";

function App() {
  const dispatch = useDispatch();
  const { count } = useSelector(({ counter }) => {
    return { count: counter.count };
  });

  const onClick = () => dispatch(incrementCount());
  // function to clear the count in store.
  const onClear = () => dispatch(clearCount());
  const { setState, globalState } = useAppContext();

  /*
  
      */
  return (
    <div className="App" style={{ padding: "10px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "200px",

          alignItems: "center",
          justifyContent: "center",
          border: "dashed 1px red",
        }}>
        <h3>HOST count {count}</h3>
        <h3>HOST count context {globalState.reminder}</h3>
        <button onClick={onClick}>Increment Redux</button>
        <button
          onClick={() => setState({ reminder: globalState.reminder + 1 })}>
          Increment Context
        </button>
      </div>
      <div
        className="remote"
        style={{
          padding: "20px",
          border: "dashed 1px #000",
          marginTop: "10px",
        }}>
        <h3> Remote </h3>
        <p>
          <b>component context </b>
        </p>
        <Bridge
          updateContainer={(e) => setState(e)}
          valueContainer={globalState}
        />
        <p>
          <b> component redux</b>
        </p>
        <Header count={count} onClear={onClear} />
      </div>
    </div>
  );
}

export default App;
