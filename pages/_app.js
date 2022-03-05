import "../styles/globals.css";
import "swiper/css/bundle";
import Layout from "../components/layout";

import { compose, applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducers from "../stores/reducers";

const composeEnhancers = compose;
const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk))
);

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
