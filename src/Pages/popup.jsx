import React, { useEffect } from "react";
import Timer from "./timer";
import "./Style.css"

function Popup({
  restCountdownTime,
  longRestCountdownTime,
  sessions,
  showPopup,
  setShowPopup,
  currentSession,
  setCurrentSession,
  workCountdownTime,
  setWorkCountdownTime,
  audioRef,
  handlePopupClose
}) {
  // close the popup and reset the timer to the initial value when it's closed
  // const handlePopupClose = () => {
  //   setShowPopup(false);
  //   setCurrentSession((prevSession) => prevSession + 1);
  //   if (currentSession < sessions) {
  //     setWorkCountdownTime(workCountdownTime);
  //   }
  // };

  useEffect(() => {
    if (showPopup) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  }, [showPopup]);
  
  // console.log("current popup session",currentSession,longRestCountdownTime,restCountdownTime)
  return (
    <div className={`popup ${showPopup ? "open" : ""}`}>
      <div className="popup-inner">
        {/* <h2>Time for a break!</h2> */}
        {/* <p>
          {currentSession % sessions === 0 ? "Take a long rest" : "Take a short rest"}
        </p> */}
        <h1 style={{paddingLeft:'6vw', marginBottom:'0', position:'relative'}}>
        <Timer
          startTime={
            currentSession % sessions === 0
              ? longRestCountdownTime
              : restCountdownTime
          }
          onComplete={()=>{
            // console.log('this is closing')
            handlePopupClose()
          }}
          startTimer={true}
        />
        </h1>
        <div style={{ margin:'-.5% 0 0 0',  width:'100%', display:'flex', justifyContent:'end' }} >

          <button style={{width:'20%',border:'none', height:'2.5vw',position:'relative', background:'transparent'}} onClick={handlePopupClose}></button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
