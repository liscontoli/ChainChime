import React, { useState, useEffect } from 'react';

function Timer({ startTime, onComplete, startTimer }) {
  const [timeRemaining, setTimeRemaining] = useState(startTime);

  useEffect(() => {
    if (startTimer) {
      const intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime > 0) {
            if((prevTime - 1) == 0){
              onComplete()
            }
            return prevTime - 1
          } else {
            console.log('intervalId', prevTime)
            clearInterval(intervalId)
            return 0
          }
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [startTime, startTimer]);
  useEffect(()=>{
    setTimeRemaining(startTime)
  },[startTime,startTimer])

  return (
    
      <p style={{ color: "#2e4686", fontSize:'4.5vw', marginBottom:"0" }}>
        {Math.floor(timeRemaining / 60)}:
        {(timeRemaining % 60).toString().padStart(2, '0')}
      </p>
  );
}

export default Timer;