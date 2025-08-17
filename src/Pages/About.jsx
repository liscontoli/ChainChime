import React  from 'react';
import { useNavigate } from "react-router-dom";
import "./About.css"
import "./Style.css"
import devLeft from "../assets/1.png"
import devMiddle from "../assets/2.png"
import devRight from "../assets/3.png"

const About = () => {
  let navigate = useNavigate();
    return (
      <div className="Background">
        <div className="MainCenterContainer">
        <div onClick={() => { navigate(-1); }} style={{cursor: "pointer"}}>
          <span className="titleDE">[DE]</span>
          <span className="titleTHREADER">THREADER</span>
        </div>

        <div className="ContentContainer">
          <h2>
            Our Mission
          </h2>
            <p>Fate could be in your hands</p>

            <p> As college students ourselves, we know how quickly tasks can pile up and become overwhelming. That's why we set out to 
              find a solution. Our goal at Dethreader is to help ease the tension and stress by breaking down big goals 
              into smaller, more manageable steps. We also help you stay focused by 
              using a Pomodoro-inspired technique, which allows you to customize work and rest intervals based on your preferences.
            </p>

            <p> We drew inspiration from The Moirai, the fates of Greek Mythology who spin, measure, and cut the thread of life.
            Our goal is to help you manage your own threads, so you can achieve your goals without feeling overwhelmed. 
            If you ever find yourself getting tangled up in knots, we're here to help you 
            detangle, thread by thread. With our guidance, you can take control of your fate.
            </p>

          <br></br>
          <h2>
            Our Team
          </h2>
          <p>The Moirai</p>
          
          <div className="ProfileContainer">
            <div className="DevProfile">
              <p>Betty</p>
              
              <img src={devLeft} alt=""/>
              <p>Betty is the front-end developer. She is resposible for creating the user interface and the visual design of our website.</p>
            </div>

            <div className="DevProfile">
              <p>Lis</p>
              
              <img src={devMiddle} alt=""/>
              <p>Lis is the back-end developer. She is responsible for the behind the scenes logic of our website and works as a bridge between the front-end and the database.</p>
            </div>

            <div className="DevProfile">
              <p>Dina</p>
              <img src={devRight} alt=""/>
              <p>Dina is the database developer. She is responsible for designing and maintaining the database that keeps your information stored.</p>
            </div>
          </div>
          
          <br></br>
          <h2>
            Using [De]Threader
          </h2>
          <p>Once you have logged in, you will be taken to the dashboard where you may start a session or continue an active one.
            Additionally, you can visit this page by selecting the question mark. You can also upload your own photo to use in the
            session screen later and view some personal statistics in the profile icon. </p>
          <p>
            If you see a plus icon, this means there are no sessions currently active in your account. Select the plus button to create one.
            If you see a play icon, this means there an active session. You may click this button to continue the session or to delete it 
            in the next page. At this time, you may only have one session per account and at a time. 
          </p>

          <p>When creating a session, you will be met with plus button. Click on this button to add a task and use the text field to label it.
            You can continue adding tasks like this or you can add sub tasks to each individual task by pressing the plus next to it. 
            You can also delete tasks by pressing the minus button.
          </p>

          <p>Once your task list is complete, you can move on by pressing "next". In this screen, you can cuztomise your work intervals.
            The work timer is how long you will be focusing on your tasks without interruptions. The short break timer should be a small
            break while the long rest timer should be a longer break where we encourage you to step away and relax for a moment before returning. 
            The last number determines how many work timers you have to complete before being awarded a longer rest. 
          </p>
          <p>music: Moonshine by Prigida</p>

          <button className="textButton" onClick={() => navigate(-1)} >
            Back
          </button>
        </div>
        </div>

        
      </div>
    );
  }
  
  export default About;