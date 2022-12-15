import React, {useState} from "react";
import {nanoid} from 'nanoid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './AddPlayer.css';

function AddPlayer(props){
  
  // Hooks
  const[firstName,setFirstName] = useState("");
  const[lastName,setLastName] = useState("");
  const[number,setNumber] = useState("");
  const[team,setTeam] = useState("");
  const[selectedFile,setSelectedFile] = useState(null);

  // Function - Adds player to the Array of players
  const doWork = () =>{
    const newPlayer = {"id":nanoid(), "firstName":firstName, "lastName":lastName, "number":parseInt(number), "team":team.toLowerCase(), "image":URL.createObjectURL(selectedFile)}
    props.addPlayer(newPlayer);
  }

  // Function - Grabs the image uploaded
  const imageUpdate = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  // Writing the adding of players
  return(
    <div className="row mt-4 ms-2" id="AddPlayer">
      <h3 className='text-center mb-2'><img src="images/add-player.PNG" alt="Add Player" id="AddHeading" /></h3>
      <div className="col-md-12">
        <label htmlFor="txtFirstName" className="form-label h5 mt-3 mb-1">First Name</label>
        <input type="text" id="txtFirstName" placeholder="First Name" className="form-control" onChange={(evt) => setFirstName(evt.currentTarget.value)} value={firstName} />
      </div>
      <div className="col-md-12">
        <label htmlFor="txtLastName" className="form-label h5 mt-3 mb-1">Last Name</label>
        <input type="text" id="txtLastName" placeholder="Last Name" className="form-control" onChange={(evt) => setLastName(evt.currentTarget.value)} value={lastName} />
      </div>
      <div className="col-md-12">
        <label htmlFor="txtNumber" className="form-label h5 mt-3 mb-1">Number</label>
        <input type="number" id="txtNumber" placeholder="Number" className="form-control" onChange={(evt) => setNumber(evt.currentTarget.value)} value={number} />
      </div>
      <div className="col-md-12">
        <label htmlFor="txtTeam" className="form-label h5 mt-3 mb-1">Team</label>
        <input type="text" id="txtTeam" placeholder="Team Name" className="form-control" onChange={(evt) => setTeam(evt.currentTarget.value)} value={team} />
      </div>
      <div className="col-md-12">
        <label htmlFor="fileUpload" className="form-label h5 mt-3 mb-1">Player Image</label>
        <input type="file" name="file" id="fileUpload" onChange={imageUpdate} />
      </div>
      <div className="col-md-12 mt-4">
        <button type="button" id="btnAdd" className="btn btn-danger" onClick={doWork}>Add Player <FontAwesomeIcon icon={faPlusCircle} /></button>
      </div>
    </div>
  );

}

export default AddPlayer;