import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Style.css";
import { getDatabase, ref, onValue } from "firebase/database";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const db = getDatabase(); //Initialize database

const fetchAnalytics = (userId, setStatsCycles, setStatsWork, setStatsRest) => {
  const tasksRef = ref(db, `stats/${userId}`);
  onValue(tasksRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      setStatsCycles(data.statsCycles)
      setStatsWork(data.statsWork)
      setStatsRest(data.statsRest)
    } else {
      setStatsCycles(0)
      setStatsWork(0)
      setStatsRest(0)
    }
  });
};

function convertToMins(s){   // accepts seconds as Number or String. Returns m:ss
  return( s -         // take value s and subtract (will try to convert String to Number)
          ( s %= 60 ) // the new value of s, now holding the remainder of s divided by 60 
                      // (will also try to convert String to Number)
        ) / 60 + (    // and divide the resulting Number by 60 
                      // (can never result in a fractional value = no need for rounding)
                      // to which we concatenate a String (converts the Number to String)
                      // who's reference is chosen by the conditional operator:
          9 < s       // if    seconds is larger than 9
          ? ':'       // then  we don't need to prepend a zero
          : ':0'      // else  we do need to prepend a zero
        ) + s ;       // and we add Number s to the string (converting it to String as well)
}

const Stats = () => {
  let navigate = useNavigate();
  const storedUser = localStorage.getItem("user"); // get the stored logged in user from localstorage
  const initialUser = storedUser ? JSON.parse(storedUser) : "Guest"; // if the user is logged in set inigialUser to it
  const [user, setUser] = useState(initialUser); // set the state to be the initalUser or null if not available
  const [statsCycles, setStatsCycles] = useState(null);
  const [statsWork, setStatsWork] = useState(null);
  const [statsRest, setStatsRest] = useState(null);
  useEffect(() => {
    if (user) {
      fetchAnalytics(user.uid, setStatsCycles, setStatsWork, setStatsRest)
    }
  }, [user]);
  return (
    <>
      <div className="Background2">
        <div className="MainCenterContainer" style={{width:'370px', fontSize:'1.5em',marginBottom:'0',color:'#2e4686', fontWeight:'600'}}>
        
            <span>{initialUser.displayName || 'Guest'}</span>
            <br/><br/>
{/* 
        <div>
            <span className="titleDE">[DE]</span>
            <span className="titleTHREADER">THREADER</span>
          </div> */}
          <div style={{display:'flex', justifyContent:'center'}}>

            Session Activity State
          </div>
          

          <div className="sessionState"> 
            <span className="statsLeft">Total work cycles :</span>
            <span className="statsRight">{statsCycles}</span>
          </div>
          

          <div className="sessionState">
            <span className="statsLeft">Total work time :  </span>
            <span className="statsRight">{convertToMins(statsWork)}</span>
          </div>

          <div className="sessionState"> 
            <span className="statsLeft">Total rest time :</span>
            <span className="statsRight">{convertToMins(statsRest)}</span>
          </div>
          <br/><br/><br/>
          <div className="" style={{display:'flex',justifyContent:"center"}}>
            {user ? (
              <button style={{backgroundImage: `url(${require('../assets/buttonsAndInput/Group 688-1.png')})`, height:'10vh',backgroundSize:'100%',margin:'0 auto', backgroundRepeat:'no-repeat', width:'75%'}} onClick={() => { navigate("/dashboard") }} className="iconButton">
              </button>
            ) : (
              ""
            )}
          </div>
          <br/>
        </div>
      </div>
    </>
  );
};

export default Stats;
