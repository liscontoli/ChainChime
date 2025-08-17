import { width } from '@fortawesome/free-solid-svg-icons/fa0';
import './Style.css';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import image1 from '../assets/buttonsAndInput/Group613.png';
import image2 from '../assets/buttonsAndInput/Group 687.png';
import image3 from '../assets/buttonsAndInput/Group 688.png';
import image4 from '../assets/buttonsAndInput/Group 754.png';
const TextButton = (props) => {
  const divStyle = {
    backgroundImage: `url(${props.backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    cursor:'pointer',
    backgroundSize:'95%'
  };

  return(
    <div className='footerButton' onClick={props.action} style={divStyle}>
    </div>
  )
}
const Home = ({handleLogout}) => {
  let navigate = useNavigate();

  useEffect(()=>{
    handleLogout()
  },[])

  return (
    <>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
    <div className="Background">
      <div className="MainCenterContainer">
        
        {/* <div><span className="titleDE">[DE]</span><span className="titleTHREADER">THREADER</span></div> */}

        <TextButton action={()=> {
          navigate("/SignUp")
          localStorage.clear()
          }}backgroundImage={image1} 
          />
        <TextButton action={()=> {
          navigate("/LogIn")
          localStorage.clear()
          }} backgroundImage={image2} />
        <TextButton action={()=> {
          navigate("/dashboard")
          localStorage.clear()
          }} backgroundImage={image3} />
        <TextButton action={()=> {
          navigate("#")
          }}backgroundImage={image4}/>
      </div>
    </div>
    </>
  );
}


export default Home;