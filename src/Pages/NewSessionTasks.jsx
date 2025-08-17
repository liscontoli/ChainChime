import React, { useState, useContext } from 'react'
import './Style.css'
import './add-task.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { getDatabase, ref, set } from 'firebase/database'
import { TreeView } from './TreeView'
import { useNavigate } from 'react-router-dom'
import { GuestSession, Sessions } from './Helper/Context'
import { encryptTasks } from '../utils/taskEncryption'

const db = getDatabase() //Initialize database

// start the definition of the component
const NewSessionTasks = props => {
  const { setGuestSession } = useContext(GuestSession)
  const [fields, setFields] = useState([])
  const { setSessionsLength } = useContext(Sessions)
  const user = props.user
  let navigate = useNavigate()
  setSessionsLength(fields.length)

  // Define a function `saveTasksData` that saves the `fields` state to the database
  const saveTasksData = () => {
    let newFields = fields
    if (user && user.uid) {
      newFields = encryptTasks(fields)
    }
    const newTasks = {
      tasks: newFields,
      status: 'Incomplete',
      workTime: 60,
      restTime: 60,
      longRestTime: 60,
      workSessionPerCycle: 1
    }
    // Check if the user is logged in and has a UID
    if (user && user.uid) {
      // Get a reference to the `tasks` table in the database for the current user
      const tasksRef = ref(db, `sessions/${user.uid}`)

      // Create a new object to store the updated task data

      // Update the `tasks` table in the database with the new task data using the `set` function from the Firebase SDK
      set(tasksRef, newTasks)
        .then(() => {
          // Navigate to a new page
          console.log('newTasks =>', newTasks)
          navigate('/play-session')
          // alert("Data Added Successfuly")
        })
        .catch(error => {
          // Display an error message if the update fails
          alert('An Error Occured, Please Try Again!')
        })
    } else {
      setGuestSession(newTasks)
      navigate('/play-session')
    }
  }

  // Define a function `handleAddField` that adds a new task to the `fields` state with a specified parent and depth
  const handleAddField = parentId => {
    // Create a copy of the `fields` array using the spread operator
    const newFields = [...fields]

    // Generate a new ID for the task
    const newFieldId = Date.now()

    // Create a new task object with the generated ID and default values for the other properties
    const newField = {
      id: newFieldId,
      label: '',
      checked: false,
      parentId: parentId || null // set parentId to null if none exists
    }
    newFields.push(newField)

    // Update the `fields` state with the new array using the `setFields` updater function
    setFields(newFields)
  }

  // Define a function `handleDeleteField` that deletes a task from the `fields` state and the database
  const handleDeleteField = (fieldId, node) => {
    let descendants = [fieldId]
    function recurseAndAdd(node) {
      descendants.push(node.id)
      var children = node.children
      for (let i = 0; i < children.length; i++) {
        recurseAndAdd(children[i])
      }
    }
    recurseAndAdd(node)

    const newFields = fields.filter(field => !descendants.includes(field.id))
    // Update the `fields` state with the new array using the `setFields` updater function
    setFields(newFields)
  }

  // Define a function `handleChange` that updates the label of a task in the `fields` state
  const handleChange = (fieldId, e) => {
    // Create a copy of the `fields` array using the spread operator
    const newFields = [...fields]

    // Find the index of the task in the `fields` array
    const fieldIndex = fields.findIndex(x => x.id === fieldId)

    // If the task exists in the `fields` array, update its label property with the new value
    if (fieldIndex !== -1) {
      newFields[fieldIndex].label = e.target.value

      // Update the `fields` state with the new array using the `setFields` updater function
      setFields(newFields)
    }
  }

  return (
    <div className="Background2">
      <div className="MainCenterContainer" style={{width:'16.5em', fontSize:'1.5em',marginBottom:'0',color:'#2e4686', fontWeight:'600'}}>
       
       

        <div className="createTasksContainer">
          <div style={{display:'flex', alignItems:'center', gap:'.3em', fontSize:'.9em'}}>
            <img style={{height:'20px'}} src={require('../assets/ICONS/Group 715.png')}/> All Tasks :
          </div>
          <TreeView
            data={fields}
            handleAddField={handleAddField}
            handleDeleteField={handleDeleteField}
            handleChange={handleChange}
          />
          <div onClick={() => handleAddField()} className='buttonsCC' style={{backgroundImage:`url(${require('../assets/buttonsAndInput/Group 547.png')})`, backgroundSize:'65%', marginTop:'0px',  cursor:'pointer'}}>
         {/* Add New Task button*/}
          </div>
        </div>
        <div className="buttonContainer">
          {/* <div className="buttonContainer-child">
            <button
              className="textButton"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </button>
          </div> */}
          <div className="buttonContainer-child">
            <div className="buttonsCC" onClick={saveTasksData} style={{backgroundImage:`url(${require('../assets/buttonsAndInput/Group 759.png')})`, margin:'5px 0 50px 0',backgroundSize:'70%', cursor:'pointer'}} >
              {/* Next button */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewSessionTasks
