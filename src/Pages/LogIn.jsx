import React, { useState, useContext } from "react";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { UserName } from './Helper/Context';
import { useNavigate } from 'react-router-dom';
import eyeOpenIcon from '../assets//ICONS/Group 560.png'; 
import eyeClosedIcon from '../assets/ICONS/Group 561.png';
// const TextButton = (props) => {
//   return(
//   <button 
//     onClick={props.action} 
//     className="textButton">
//     {props.text}
  
//   </button>
//   )
// }

const LogIn = (props) => {
  // const {isLoggedIn, setIsLoggedIn} = useContext(LoggedIn); // determine if the user is logged in or not
  const { setUserName} = useContext(UserName);
  const navigate = useNavigate();

 /**
   * Added
   * save the input vals in state object to use it in authentication
 */
let [userData, setUserData] = useState({
    "email": "",
    "password": ""
  });
  const [showPassword, setShowPassword] = useState(false);
  let name, val;
  const fieldHandler = (e) => {
      name = e.target.name;
      val = e.target.value;
  
      setUserData({...userData, [name]:val});
    }
  /**
   * Added
   * Authentication process, 
   * copy this code from firebase at:
   * https://console.firebase.google.com/u/1/project/threader-app-8163c/settings/general/web:M2JjMGUwYTktYjA3YS00YmRiLWI1OTUtMDFiOGEwNjIwOWUx
   */
  // Initialize Firebase

  const submitHandler = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then((userCredential) => {
        // User signed in
        const user = userCredential.user;
        props.setUser(user);
        // Do something with the user object
        console.log({user});
        // alert('success login!');
        localStorage.setItem('user', JSON.stringify(user));
        if (user.displayName) {
          setUserName(user.displayName);
        } else {
          setUserName('Guest');
        }
        navigate('/dashboard');
      })
      .catch((error) => {
        console.log(error.message);
        alert("error");
      });
  }
  return (
    <div className="Background">
      <div className="MainCenterContainer" style={{marginBottom:'0'}}>
        <>
          {/* <div onClick={() => { navigate("/"); }} style={{cursor: "pointer"}}>
            <span className="titleDE">[DE]</span>
            <span className="titleTHREADER">THREADER</span>
          </div> */}
          <form className="form" method="GET" style={{position: "relative"}}>
            <div className="form-body">
              <h1 style={{color:"#2e4686", fontWeight:'bold'}}>LOGIN</h1>
              <div className="email">
                {/*}
                <label className="form__label" for="email">
                  Email{" "}
                </label>
  */}
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form__input email-input "
                  placeholder="Email"
                  value={userData.email}
                  onChange={fieldHandler}
                />
                {/* Error field for Email message */}
                
              </div>
              <div className="password" style={{position: "relative", width:'fit-content', margin:'auto'}}>
              <input
                className="form__input password-input"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                value={userData.password}
                onChange={fieldHandler}
              />
              <img
                src={showPassword ? eyeOpenIcon : eyeClosedIcon}
                alt="Toggle Password Visibility"
                style={{
                  width:'25px',
                  position: "absolute",
                  right: "1em",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer"
                }}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            </div>
         
            <div className="footerButton" style={{ margin: '0 auto 10px auto', backgroundImage: `url(${require('../assets/buttonsAndInput/button.png')})`, bottom: '0' }} onClick={submitHandler} type="submit">
              <button
                className="textButton"
              >
                Login
              </button>
            </div>
              <img src={require('../assets/win/Group 713.png')} style={{margin:'8px auto', width:'90%'}}/>
              <div className="footerButton" type="submit" style={{margin:'0 auto 10px auto', backgroundImage: `url(${require('../assets/buttonsAndInput/Group 688.png')})`, bottom:'0'}} onClick={()=>navigate('/dashboard')}>
            </div>
            <div style={{display:'flex', justifyContent:'center'}}>
                  <strong style={{margin:'auto', color:'white'}}>Create New Account? <a href="SignUp" style={{color:'red', textDecoration:'none'}}>Sign UP</a></strong>
                </div>
          {/*
          <TextButton action={()=> {
          const provider = new GoogleAuthProvider();
          //Just grab this code from Firebase documentation
          const auth = getAuth();
          signInWithPopup(auth, provider)
            .then((result) => {
              // This gives you a Google Access Token. You can use it to access the Google API.
              const credential = GoogleAuthProvider.credentialFromResult(result);
              const token = credential.accessToken;
              // The signed-in user info.
              const user = result.user;
              // IdP data available using getAdditionalUserInfo(result)
              setUserName(user.displayName);
              localStorage.setItem('user', JSON.stringify(user));
              setIsLoggedIn(true);
              const db = getDatabase();
              set(ref(db, `users/${user.uid}`), {
                email: user.email,
                name: user.displayName,
                from: 'Google'
                // add more user data here if you want
              });
              navigate("/dashboard");
            }).catch((error) => {
              // Handle Errors here.
              const errorCode = error.code;
              const credential = GoogleAuthProvider.credentialFromError(error);
              setIsLoggedIn(false);
            });
        }} text={'Log In with Google'} />
      */}
        </form>


        </>
      </div>
    </div>
  );
};

export default LogIn;
