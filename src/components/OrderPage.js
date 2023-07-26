import React, { useEffect,memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie";

const OrderPage = () => {

  const navigate = useNavigate()
  const [orderData,setOrderData] = useState([])
  const [totalAmount,setTotalAmount] = useState()


  useEffect(()=>{
     let order = JSON.parse(localStorage.getItem("myCartData")) ||[]
     setOrderData(order)
  },[])
 
  useEffect(()=>{
     let checkLogInUser = Cookies.get("email")
    checkLogInUser ? navigate("/orderpage"): navigate("/welcome")
 },[navigate])
 
 useEffect(() => {
   let total = 0;
   if(orderData.length>=1){}
   for (let i = 0; i < orderData.length; i++) {
     total = total + orderData[i].price;
   }
   setTotalAmount(total);
 }, [orderData]);


 function orderConfirmation(){
    navigate("/orderconfirmation")
     localStorage.removeItem("myCartData")
 }

 function continueShopping(){
  navigate("/header")
 }

  return (
    <div>
      {orderData.length >= 1 ? (
        <div>
          <h1>Your Order</h1>
          <div>
            {orderData.map((ele) => (
              <div key={ele.id} className="orderdatas">
                <div>
                  <div>
                    <img
                      className="orderimage"
                      src={ele.image}
                      alt="productimage"
                    />
                  </div>
                </div>
                <p>{ele.title}</p>
                <p> $ {ele.price}</p>
              </div>
            ))}
          </div>
          <h1>{`Total Price: $ ${totalAmount}`}</h1>
          <button className="orderbtn" onClick={orderConfirmation}>
            Confirm Order
          </button>
        </div>
      ) : (
        <div>
          <h1>Your Have No products to place order</h1>
          <button className="continueShopping" onClick={continueShopping}>
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}

export default memo (OrderPage)