import React, {useEffect,useState,memo } from 'react'
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    
    const navigate = useNavigate()

    const [singnUpData,setSignUpData] = useState({
      firstName:"",
      mobileNumber:"",
      email:"",
      password:""
    })

    const [dataBase,setDataBase] = useState([])

    useEffect(()=>{
   
    const dataBaseDetails = JSON.parse(localStorage.getItem("myData")) || []
    setDataBase(dataBaseDetails)
   },[])

   function changeData(e){
       e.preventDefault();
      setSignUpData((prevState)=>{
        return {...prevState, [e.target.name]:e.target.value}
      })
    }


    function handleSubmit(){
        function checkSignUp(){
          for(let i=0; i<dataBase.length; i++){
            if (
              dataBase[0].mobileNumber === singnUpData.mobileNumber ||
              dataBase[0].password === singnUpData.password ||
              dataBase[0].email === singnUpData.email ||
              dataBase[0].firstName === singnUpData.firstName
            ) {
              return true;
            }
          }
        }

        let db = [...dataBase]
        db.push(singnUpData)
        let newData = JSON.stringify(db)

         const success = () => {
           alert("database created");
           localStorage.setItem("myData", newData);
         };

         return checkSignUp() === true ? alert("already exists") : success();
    }

   
    

    function goToSigninPage(){
       navigate("/welcome")
    }
  


  return (
    <div>
      <img
        className="shopeasesignuplogo"
        src="data:image/png;base64,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"
        alt="shopeaselogo"
      />
      <div className="signup">
        <div className="signupsub2">
          <b className="signupb">Create Account</b>
          <form onSubmit={handleSubmit}>
            <div className="signupdetails">
              <label className="signuplabel">
                <b>
                  Your name<span className="required">*</span>
                </b>
              </label>
              <br />
              <br />
              <input
                className="input"
                placeholder="First and last name"
                name="firstName"
                onChange={changeData}
                value={singnUpData.firstName}
                autoComplete="off"
                required
              />
            </div>
            <div className="signupdetails">
              <label className="signuplabel">
                <b>
                  Moblile number<span className="required">*</span>
                </b>
              </label>
              <br />
              <br />
              <input
                className="input"
                placeholder="mobile number"
                name="mobileNumber"
                minLength="10"
                onChange={changeData}
                value={singnUpData.mobileNumber}
                autoComplete="off"
                required
              />
            </div>
            <div className="signupdetails">
              <label className="signuplabel">
                <b>Email (optional)</b>
              </label>
              <br />
              <br />
              <input
                className="input"
                placeholder="E-mail address"
                name="email"
                onChange={changeData}
                value={singnUpData.email}
                autoComplete="off"
                required
              />
            </div>
            <div className="signupdetails">
              <label className="signuplabel">
                <b>
                  Password<span className="required">*</span>
                </b>
              </label>
              <br />
              <br />
              <input
                className="input"
                placeholder="Atleast 6 characters"
                type="password"
                name="password"
                onChange={changeData}
                value={singnUpData.password}
                minLength="6"
                autoComplete="off"
                required
              />
              <p className="ie">(Passwords must be atleast 6 characters)</p>
            </div>

            <p className="ie">
              By enrolling your mobile phone number, you consent to receive
              automated security notifications via text message from Amazon.
              Message and data rates may apply.
            </p>
            <div>
              <button className="continuebtn">Continue</button>
              <hr className="hr"></hr>
              <p onClick={goToSigninPage}>
                <b>
                  Already a user?<span className="alreadyauser"> Sign in</span>
                </b>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default memo (Signup)