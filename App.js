import { Provider } from "react-redux";
import store from "./store";
import Home from "./containers/Home";

export default function App() {
  return (
    <Provider store={store}>
     <Home/>
    </Provider>
  );
}

