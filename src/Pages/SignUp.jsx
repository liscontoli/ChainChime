import React, { useState, useContext } from 'react'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, ref, set } from 'firebase/database'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { firebaseConfig } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { UserName } from './Helper/Context'
import './Style.css'
import eyeOpenIcon from '../assets//ICONS/Group 560.png'; 
import eyeClosedIcon from '../assets/ICONS/Group 561.png';

// import "./SignUp.css";

const SignUp = () => {
  const { userName, setUserName } = useContext(UserName)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  /**
   * Added
   * create states to save input values
   */

  const navigate = useNavigate()
  let [userD, setUserD] = useState({
    userName: '',
    email: '',
    password: '',
    confPass: ''
  })
  /**
   * Added
   * check for Fields validation then
   * connect to Firebase and updat database with new users
   */
  function checkEmail(email) {
    if ((email.includes('@') && email.includes('.com')) || email === '') {
      return true
    } else return false
  }
  checkEmail(userD.email)

  function checkPassLength(password) {
    if (password.length < 8 && password.length >= 1) {
      return false
    } else return true
  }

  function checkPassIdentical(password, confPass) {
    if (password === confPass) {
      return true
    } else return false
  }

  const submitButton = async e => {
    e.preventDefault()
    firebase.initializeApp(firebaseConfig)
    const auth = getAuth()
    if (
      checkEmail(userD.email) &&
      checkPassLength(userD.password) &&
      checkPassIdentical(userD.password, userD.confPass)
    ) {
      createUserWithEmailAndPassword(auth, userD.email, userD.password)
        .then(userCredential => {
          // User account created
          const user = firebase.auth().currentUser
          user.updateProfile({
            displayName: userD.userName
          })

          const db = getDatabase()
          set(ref(db, `users/${user.uid}`), {
            email: user.email,
            displayName: userD.userName
            // add more user data here if you want
          })
          // Do something with the user object
          navigate('/login')
          setUserName(userD.userName)
        })
        .catch(error => {
          console.log(error.message)
          alert('Error, Please Try Again!')
        })
    } else alert('Please resolve errors before signing up!')
  }

  /**
   * Added by Lis
   */
  let name, value
  const fieldsValues = e => {
    name = e.target.name //take the name of current field
    value = e.target.value //take the input value of current field

    setUserD({ ...userD, [name]: value }) // update the state with new input values
  }
  return (
    <div className="Background">
      <div className="MainCenterContainer" style={{marginBottom:'0'}}>
        <>
          {/* <div
            onClick={() => {
              navigate('/')
            }}
            style={{ cursor: 'pointer' }}
          >
            <span className="titleDE">[DE]</span>
            <span className="titleTHREADER">THREADER</span>
          </div> */}

          <form className="form" method="POST">
            <div className="form-body">
            <h1 style={{color:"#2e4686", fontWeight:'bold', marginBottom:'0'}}>Create New Account</h1><br/>
              <div className="username">
                {/*
                <label className="form__label" for="userName">
                   User Name
                </label>
  */}

                <input
                  type="email"
                  name="userName"
                  id="email"
                  className="form__input usename-input "
                  placeholder="Username"
                  value={userD.userName}
                  onChange={fieldsValues}
                />
              </div>

              <div className="email" >
                {/*
                <label className="form__label" for="email">
                  Email
                </label>
*/}
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`form__input email-input ${
                    checkEmail(userD.email) ? '' : 'mail-error'
                  }`}
                  placeholder="Email"
                  value={userD.email}
                  onChange={fieldsValues}
                />
                {checkEmail(userD.email) ? (
                  ''
                ) : (
                  <p
                    style={{
                      color: '#e34949',
                      fontSize: '12px',
                      marginBottom: 0,
                      'margin-left': '77px'
                    }}
                  >
                    Email must contain @ and .
                  </p>
                )}
              </div>
              <div className="password" style={{position: "relative", width:'fit-content', margin:'auto'}}>
                {/*
                <label className="form__label" for="password">
                  Password{" "}
                </label>
              */}
                <input
                  className={`form__input password-input ${
                    checkPassLength(userD.password) ? '' : 'length-error'
                  }`}
                  style={{margin:'10px 0'}}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  value={userD.password}
                  onChange={fieldsValues}
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
              {checkPassLength(userD.password) ? (
                  ''
                ) : (
                  <p
                    style={{
                      color: '#e34949',
                      fontSize: '12px',
                      margin:'0 auto'
                 
                    }}
                  >
                    Password length should be 8 or more
                  </p>
                )}
              <div className="confirm-password" style={{position: "relative", width:'fit-content', margin:'auto'}}>
                {/*
                <label className="form__label" for="confirmPassword">
                  Confirm Password{" "}
                </label>
              */}
                <input
                  className={`form__input password-input  ${
                    checkPassIdentical(userD.password, userD.confPass)
                      ? ''
                      : 'identical-error'
                  }`}
                  style={{margin:'auto'}}
                  name="confPass"
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={userD.confPass}
                  onChange={fieldsValues}
                />
                  <img
                src={showConfirmPassword ? eyeOpenIcon : eyeClosedIcon}
                alt="Toggle Password Visibility"
                style={{
                  width:'25px',
                  position: "absolute",
                  right: "1em",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer"
                }}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
                
              </div>
              {checkPassIdentical(userD.password, userD.confPass) ? (
                  ''
                ) : (
                  <p
                    style={{
                      color: '#e34949',
                      fontSize: '12px',
                      margin:'0 auto'
                    }}
                  >
                    Passwords must match
                  </p>
                )}
            </div>
            <img src={require('../assets/win/Group 713.png')} style={{margin:'5px auto', width:'90%'}}/>
            <div className="footerButton" onClick={submitButton} type="submit" style={{margin:'0 auto 5px auto', backgroundImage: `url(${require('../assets/buttonsAndInput/Group613.png')})`, bottom:'0'}}>
            </div>
            <div style={{display:'flex', justifyContent:'center'}}>
                  <strong style={{margin:'auto', color:'white'}}>Do you have account? <a href="/LogIn" style={{color:'red', textDecoration:'none'}}>Login</a></strong>
                </div>
            {/* <div class="footer">
              <button
                type="submit"
                className="textButton"
                onClick={submitButton}
              >
                Sign Up
              </button>
            </div> */}
          </form>
        </>
      </div>
    </div>
  )
}

export default SignUp
