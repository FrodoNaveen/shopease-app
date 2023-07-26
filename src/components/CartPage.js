import React, { useEffect, useState, memo } from 'react'
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  
  const navigate = useNavigate()

  const[productsInCart,setProductsInCart] = useState([])
  const [totalPrice,setTotalprice] = useState()
   
  useEffect(()=>{
     
     let getData = JSON.parse(localStorage.getItem("myCartData")) ||[]
     setProductsInCart(getData)
  },[])

 function removeCratItem(id){
  let cart = JSON.parse(localStorage.getItem("myCartData"))
   let newData = cart.filter((ele)=>{
    return ele.newId!==id
   })
   setProductsInCart(newData)
   localStorage.setItem("myCartData", JSON.stringify(newData))
 }


 useEffect(()=>{
    let total=0
    for(let i=0; i<productsInCart.length; i++){
      total = total+productsInCart[i].price 
    }
    setTotalprice(total)
 },[productsInCart])

 function proceedToBuy(){
    navigate("/orderpage");
 }

  function continueShopping() {
    navigate("/header");
  }

 return (
   <div>
     {productsInCart.length >= 1 ? (
       <div>
         <div>
           <h1>Your Cart</h1>
           <div className="cartlist">
             {productsInCart.map((ele) => (
               <div className="cartproduct" key={ele.newId}>
                 <div className="cartproductflex" key={ele.newId}>
                   <div>
                     <img
                       className="cartproductimage"
                       src={ele.image}
                       alt="productimage"
                     />
                   </div>
                   <div className="cartproductdetails">
                     <p>
                       <b>{ele.title}</b>
                     </p>
                     <p>
                       $ <b>{ele.price}</b>
                     </p>
                     <button
                       className="cartremovebtn"
                       onClick={() => removeCratItem(ele.newId)}
                     >
                       Remove item from cart
                     </button>
                   </div>
                 </div>
               </div>
             ))}
           </div>
           {productsInCart.length >= 1 ? (
             <div>
               <h1>
                 SubTotal ({productsInCart.length}{" "}
                 {productsInCart.length <= 1 ? "item" : "items"}): ${" "}
                 {totalPrice}
               </h1>
               <button className="buybtn" onClick={proceedToBuy}>
                 Proceed to buy
               </button>
             </div>
           ) : null}
         </div>
       </div>
     ) : (
       <div>
         <h1>No Products in Cart</h1>
         <button className="continueShopping" onClick={continueShopping}>
           Continue Shopping
         </button>
       </div>
     )}
   </div>
 );
};

export default memo (CartPage)