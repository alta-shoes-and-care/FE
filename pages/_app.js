import '../styles/globals.css'
import "swiper/css/bundle";

import { compose, applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducers from '../stores/reducers';

const composeEnhancers = compose
const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp;
