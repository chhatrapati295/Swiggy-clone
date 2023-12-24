import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
import "@fortawesome/fontawesome-free/css/all.css";
import { Provider } from "react-redux";
import store from "./utils/store";
import Offers from "./pages/Offers";
import Home from "./pages/Home";
import Help from "./pages/Help";
import Sign from "./pages/Sign";
import Cart from "./pages/Cart";
import Header from "./components/Header";
import ResPage from "./pages/ResPage";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/offers" element={<Offers />} />
            <Route exact path="/help" element={<Help />} />
            <Route exact path="/sign-in" element={<Sign />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/res/:id" element={<ResPage />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
