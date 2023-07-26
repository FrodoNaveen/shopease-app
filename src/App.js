import {Routes,Route} from "react-router-dom"
import './App.css';
import Cart from "./components/CartPage";
import OrderPage from "./components/OrderPage";
import Welcome from "./components/Welcome";
import Header from "./components/Header";
import Signup from "./components/Signup";
import OrderConfirm from "./components/OrderConfirm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Header />}></Route>
        <Route path="/*" element={<Header />}></Route>
        <Route path="/header" element={<Header />}></Route>
        <Route path="/cartpage" element={<Cart />}></Route>
        <Route path="/orderpage" element={<OrderPage />}></Route>
        <Route path="/welcome" element={<Welcome />}></Route>
        <Route path="signup" element={<Signup />}></Route>
        <Route path="orderconfirmation" element={<OrderConfirm />}></Route>
      </Routes>
    </div>
  );
}

export default App;
