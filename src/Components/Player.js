import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning, faMagicWandSparkles } from '@fortawesome/free-solid-svg-icons';
import './Player.css';

function Player(props) {

  const [editMode, setEditMode] = useState(false);
  const[firstName,setFirstName] = useState("");
  const[lastName,setLastName] = useState("");
  const[number,setNumber] = useState("");
  const[team,setTeam] = useState("");

  useEffect(() => {
    setFirstName(props.player.firstName);
    setLastName(props.player.lastName);
    setNumber(props.player.number);
    setTeam(props.player.team);
  }, []);

  const savePlayer = () => {
    setEditMode(false);
    const updatedPlayer = {firstName:firstName, lastName:lastName, number:number, team:team, id:props.player.id, image:props.player.image};
    props.editPlayer(updatedPlayer);
  }

  return (
    <div className="card mt-3">
      <img src={props.player.image} alt="hockey player" className="card-img-top mx-auto" />

      {/* Normal Display of Players */}
      {!editMode && 
      <ul className="list-group list-group-flush">
        <li className="list-group-item text-center">{props.player.firstName}</li>
        <li className="list-group-item text-center">{props.player.lastName}</li>
        <li className="list-group-item text-center">{props.player.number}</li>
        <li className="list-group-item text-center">{props.player.team}</li>
        <button type='button' className='btn btn-warning' onClick={() => props.remove(props.player)}>Delete Player <FontAwesomeIcon icon={faWarning} /></button>
        <button type='button' className='btn btn-primary' onClick={() => setEditMode(true)}>Edit <FontAwesomeIcon icon={faMagicWandSparkles} /></button>
      </ul>
      }

      {/* Display of Players While Being Edited */}
      {editMode && 
      <ul className="list-group list-group-flush">
        <li className="list-group-item text-center">
          <input type="text" className='form-control' value={firstName} onChange={(evt) => setFirstName(evt.currentTarget.value)} />
        </li>
        <li className="list-group-item text-center">
          <input type="text" className='form-control' value={lastName} onChange={(evt) => setLastName(evt.currentTarget.value)} />
        </li>
        <li className="list-group-item text-center">
          <input type="text" className='form-control' value={number} onChange={(evt) => setNumber(evt.currentTarget.value)} />
        </li>
        <li className="list-group-item text-center">
          <input type="text" className='form-control' value={team} onChange={(evt) => setTeam(evt.currentTarget.value)} />
        </li>
        <li className="list-group item">
          <button type='button' id='btnSave' className='btn btn-success' onClick={savePlayer}>Save</button>
        </li>
      </ul>}
    </div>
  );
}

export default Player;
