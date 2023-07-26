import React ,{memo, useEffect, useState}from 'react'
import ShoppingPage from './ShoppingPage'
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Header = () => {
   
    const navigate = useNavigate()

    const [searchData,setSearchData] = useState("")
    const [displaySearchData,setDisplaySearchData] = useState("")
    const [data,setData] = useState([])
    const [newData,setNewData]=  useState([])
    const [goToCartPage,setGoToCartPage] = useState(false)
    const [goToOrderPage,setGoToOrderPage] = useState(false)

   useEffect(() => {
     fetch("https://fakestoreapi.com/products")
       .then((res) => res.json())
       .then((data) => setData(data));
   }, []);

   useEffect(() => {
     let newdata = [];
     for (let i = 0; i < data.length; i++) {
       newdata.push(
         Object.assign({ isChecked: false, newId: uuidv4() }, data[i])
       );
     }
     setNewData(newdata);
   }, [data]);

   

function displaysearchdata(){
        setDisplaySearchData(newData.filter((ele)=>{
         return ele.title===searchData
        }))
        setSearchData("")
    }

function handleChange(event){
    if(event.key==="Enter"){
       setDisplaySearchData(
         newData.filter((ele) => {
           return ele.title === event.target.value;
         })
       );
       setSearchData("")
    }
 }

function suggestionChange(id){
    setSearchData(id)
 }

 function goToHomePage(){
   setGoToCartPage(false)
   setGoToOrderPage(false)
   navigate("/header")
 }

 function gotocartpage(){
   setGoToCartPage(true)
   setGoToOrderPage(false);
   navigate("/cartpage")
}

 function gotoorderpage(){
   setGoToOrderPage(true)
   setGoToCartPage(false);
   navigate("/orderpage")
 }
 
 function goToSigninPage(){
    navigate("/welcome")
 } 

 function funclogout(){
  Cookies.remove("email")
  navigate("/welcome")
 }
return (
  <div className="header">
    <div className="headersub">
      <img
        className="headerlogo"
        src="https://i.pinimg.com/originals/e7/f2/16/e7f216c8e1b4711928573bcda29b552d.jpg"
        alt="logo"
        onClick={goToHomePage}
      />
      <p className="headerpcolor">Hello</p>
      <div>
        <input
          className="headerinput"
          onChange={(e) => setSearchData(e.target.value)}
          onKeyUp={handleChange}
          value={searchData}
        />
        {searchData ? (
          <div className="suggestion">
            {data
              .filter((ele) => {
                const value = searchData.toLowerCase();
                const name = ele.title.toLowerCase();
                return value && name.startsWith(value) && value !== name;
              })
              .map((ele, index) => (
                <p
                  key={index}
                  className="suggestionp"
                  onClick={() => suggestionChange(ele.title)}
                >
                  {ele.title}
                </p>
              ))}
          </div>
        ) : null}
      </div>
      <button className="heardersearchbtn" onClick={displaysearchdata}>
        Search
      </button>
      <p className="headerpcolor">Language:EN</p>
      <p className="headerpcolor" onClick={goToSigninPage}>
        {" "}
        Signin
      </p>
      <p className="headerpcolor" onClick={gotoorderpage}>
        Your orders
      </p>
      <p className="headerpcolor" onClick={gotocartpage}>
        {" "}
        Cart
      </p>
      <p className="headerpcolor" onClick={funclogout}>LogOut</p>
    </div>
    <ShoppingPage
      displaySearchData={displaySearchData}
      goToCartPage={goToCartPage}
      goToOrderPage={goToOrderPage}
    />
  </div>
);
}

export default memo (Header)