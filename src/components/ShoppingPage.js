import React, { useEffect, useState, memo } from 'react'
import CartPage from './CartPage'
import OrderPage from './OrderPage'
import { v4 as uuidv4 } from "uuid";

const ShoppingPage = ({displaySearchData,goToCartPage,goToOrderPage}) => {

    const category = ["products","electronics", "jewelery", "men's clothing", "women's clothing"]
    const [products,setProducts] = useState([])
    const [newProducts,setNewProducts] = useState([])
    const [defaultProducts,setDefaultProducts] = useState(products)
    const [localCartStorage,setLocalCartStorage] = useState([])

    useEffect(()=>{
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => setProducts(data));
    },[])

    useEffect(()=>{
      const getData = JSON.parse(localStorage.getItem("myCartData")) || []
      setLocalCartStorage(getData)
    },[newProducts])


    useEffect(() => {
      let newdata = [];
      for (let i = 0; i < products.length; i++) {
        newdata.push(
          Object.assign({ isChecked: false, newId: uuidv4() }, products[i])
        );
      }
      setNewProducts(newdata);
    }, [products]);

    

    useEffect(() => {
      if (displaySearchData) {
        setDefaultProducts(displaySearchData);
      } else {
        setDefaultProducts(newProducts);
      }
    }, [displaySearchData, newProducts]);


    function filterCategory(item){
      if(item==="products"){
        setDefaultProducts(
          newProducts.map((ele) => {
            return ele;
          })
        );
      }else{
        setDefaultProducts(
          newProducts.filter((ele) => {
            return ele.category === item;
          })
        );
      }
  }

  function productaddedtocart(id,newId,eleId){

    console.log(localCartStorage)

    function check(){
      for(let i=0; i<localCartStorage.length; i++){
        if(localCartStorage[i].id===eleId){
          return true
        }
      }
    }

    let db = [...localCartStorage]
    db.push(id)
    let newSk = JSON.stringify(db)

 
     const success = () => {
       alert(`${id.title} added to cart`);
       localStorage.setItem("myCartData", newSk);
     };

    //  setProductsAddedTocart((prevState)=>{
    //     return [...prevState,id]
    // })

    let newData = newProducts.map((ele)=>{
      if(ele.newId===newId){
          return {...ele, isChecked:!ele.isChecked}
      }else{
        return ele
      }
    })

    setNewProducts(newData)

   return check()===true  ? alert(`${id.title} already in cart`): success();
  }

return (
  <div>
    {goToCartPage ? (
      <CartPage
  
        goToCartPage={goToCartPage}
      />
    ) : goToOrderPage ? (
      <OrderPage />
    ) : (
      <div>
        <div className="flex">
          {category.map((ele, index) => (
            <p
              key={index}
              className="category"
              onClick={() => filterCategory(ele)}
            >
              {ele}
            </p>
          ))}
        </div>
        <div className="products">
          {defaultProducts.map((ele) => (
            <div className="productdetails" key={ele.newId}>
              <img
                className="productimage"
                src={ele.image}
                alt="productimage"
              />
              <p className="producttitle">{ele.title}</p>
              <p>
                {" "}
                Price: $<b>{ele.price}</b>
              </p>
              <p>
                Rating: <span className="ratingcolor">{ele.rating.rate}</span>
              </p>
              <p>
                Stock Left :{" "}
                <span className="countcolor">{ele.rating.count}</span>
              </p>
              {ele.isChecked ? <button className='addedtocartbtn'>dded to cart</button> :
              <button
                className="addtocartbtn"
                onClick={() => productaddedtocart(ele,ele.newId,ele.id)}
              >
                Add To Cart
              </button>}
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);
}

export default memo (ShoppingPage)