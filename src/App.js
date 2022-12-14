import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {nanoid} from 'nanoid';
import React, {useEffect, useState} from 'react';
import AddPlayer from './Components/AddPlayer';
import _ from 'lodash';
import Player from './Components/Player'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function App() {

  // Hooks
  const [allPlayers, setAllPlayers] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [keywords, setKeywords] = useState("");
  const [playNum, setPlayNum] = useState("");
  const [playTeam, setPlayTeam] = useState("");
  const [nameSearch, setNameSearch] = useState(true);
  const [numSearch, setNumSearch] = useState(true);
  const [teamSearch, setTeamSearch] = useState(true);

  // Hook - that grabs the saved players from local storage or if none from the seed data and displays the players on load
  useEffect(() => {
    if(localStorage) {
      const playersLocalStorage = JSON.parse(localStorage.getItem('players'));

      if (playersLocalStorage) {
        savePlayers(playersLocalStorage);
      } else {
        savePlayers(players);
      }
    }
  }, []);

  // Function - Saves players added to local storage
  const savePlayers = (players) => {
    setAllPlayers(players);
    setSearchResults(players);
    if(localStorage) {
      localStorage.setItem('players', JSON.stringify(players));
    }
  }

  // Function - Takes the new player and updates the page
  const addPlayer = (newPlayer) => {
    const updatedPlayers = [...allPlayers, newPlayer];
    savePlayers(updatedPlayers);
  }

  // Function - Search for Players
  const searchPlayers = () => {
    let keywordsArray = [];

    // Checks if the name text is valid and then adds it to the keyword array
    if (keywords) {
      keywordsArray = keywords.toLowerCase().split(" ");      
    }

    // Checks if there is a number selected then adds it to the keyword array
    if(playNum) {
      keywordsArray.push(playNum);
    }

    // Checks if there is a team selected then adds it to the keyword array
    if(playTeam) {
      keywordsArray.push(playTeam);
    }

    // Runs through the keyword array and checks to see if any words or numbers match a player
    if (keywordsArray.length > 0) {
      const searchResults = allPlayers.filter(player => {
        for (const word of keywordsArray) {
         if(player.firstName.toLowerCase().includes(word) || player.lastName.toLowerCase().includes(word) || player.number === parseInt(word) || player.team === word){
          return true;
         }
        }
        return false;
      });
      setSearchResults(searchResults);
    } else {
      setSearchResults(allPlayers);
    }
  }
  
  // Function - Deleting Players
  const removePlayer = (playerToDelete) => {
    const updatedPlayersArray = allPlayers.filter(player => player.id !== playerToDelete.id);
    savePlayers(updatedPlayersArray);
  }

  // Function - Adds the changes to the players and updates the property of the player
  const editPlayer = (updatedPlayer) => {
    const updatedPlayerArray = allPlayers.map(player => player.id === updatedPlayer.id ? {...player, ...updatedPlayer} : player);
    savePlayers(updatedPlayerArray);
  }

  // Function - Adds Search types
  const searchState = (by) => {
    if (by === "Name") {
      if (nameSearch === true) { setNameSearch(false); }
      else { setNameSearch(true); }
    }
    if (by === "Number") {
      if (numSearch === true) { setNumSearch(false); }
      else { setNumSearch(true); }
    }
    if (by === "Team") {
      if (teamSearch === true) { setTeamSearch(false); }
      else { setTeamSearch(true); }
    }
  }

  // Seed Players
  const players = [{
    id:nanoid(),
    number: 99,
    firstName: "Wayne",
    lastName: "Gretzky",
    team: "oilers",
    image: 'images/Gretzky.png'
  }, {
    id:nanoid(),
    number: 9,
    firstName: "Gordie",
    lastName: "Howe",
    team: "red wings",
    image: 'images/Howe.png'
  }, {
    id:nanoid(),
    number: 66,
    firstName: "Mario",
    lastName: "Lemieux",
    team: "penguins",
    image: 'images/Lemieux.png'
  }, {
    id:nanoid(),
    number: 8,
    firstName: "Alexander",
    lastName: "Ovechkin",
    team: "capitals",
    image: 'images/Ovechkin.png'
  }, {
    id:nanoid(),
    number: 87,
    firstName: "Sidney",
    lastName: "Crosby",
    team: "penguins",
    image: 'images/Sid.png'
  }, {
    id:nanoid(),
    number: 4,
    firstName: "Bobby",
    lastName: "Orr",
    team: "bruins",
    image: 'images/Orr.png'
  }, {
    id:nanoid(),
    number: 97,
    firstName: "Connor",
    lastName: "McDavid",
    team: "oilers",
    image: 'images/McDavid.png'
  }, {
    id:nanoid(),
    number: 16,
    firstName: "Brett",
    lastName: "Hull",
    team: "blues",
    image: 'images/Hull.png'
  }, {
    id:nanoid(),
    number: 9,
    firstName: "Nathan",
    lastName: "MacKinnon",
    team: "avalanche",
    image: 'images/Nathan.png'
  }, {
    id:nanoid(),
    number: 34,
    firstName: "Auston",
    lastName: "Matthews",
    team: "maple leafs",
    image: 'images/Matthews.png'
  }];

  // Writes the main display with search, search by
  return (
    <div className='flex-container' id="page">

      <h1 id="heading" className='text-center mb-2'>Top Hockey Players</h1>

      <div className='row'>
          <div className='col-md-9 mt-4'>            
            
            {/* Search Bar for Players */}
            <div className='row' id='searchPlayers'>
              <h3 className='text-center mb-3'><img src="images/player-search.png" alt="Player Search" id="SearchHead" /></h3>
              {/* Normal Display of Players */}
              {!nameSearch && 
              <div className='col-md-3'>
                <label htmlFor="txtKeywords">Name </label>
                <input type="text" className='form-control' placeholder='Drew Jones' onChange={evt => setKeywords(evt.currentTarget.value)} value={keywords} />
              </div>
              }
              {!numSearch && 
              <div className='col-md-3'>
                <label htmlFor="selectNum">Number</label>
                <select value={playNum} onChange={evt => setPlayNum(evt.currentTarget.value)} className='form-select'>
                  <option value="">Select Number</option>
                  {_(allPlayers).map(player => player.number).sort().uniq().map(number => <option key={number} value={number}>{number}</option>).value()}
                </select>
              </div>
              }
              {!teamSearch && 
               <div className='col-md-3'>
                <label htmlFor="selectNum">Team</label>
                <select value={playTeam} onChange={evt => setPlayTeam(evt.currentTarget.value)} className='form-select'>
                  <option value="">Select Team</option>
                  {_(allPlayers).map(player => player.team).sort().uniq().map(team => <option key={team} value={team}>{team}</option>).value()}
                </select>
               </div>
              }
              <div className='col-md-3 mt-4'>
                <button type='button' className='btn btn-danger' onClick={searchPlayers}>Search Players <FontAwesomeIcon icon={faSearch} /></button>
              </div>
            </div>
            
            {/* Displaying Each Player */}
            <div className='row mt-3' id='allPlayers'>
              {searchResults && searchResults.map((player) =>
              (
                <div className='col-md-2' key={player.id}>
                  <Player player={player} remove={removePlayer} editPlayer={editPlayer} />
                </div>)
              )}
            </div>

          </div>

          {/* Sets Search Types */}
          <div className='col-md-3 mt-1'>
            <div className="row ms-2 mt-4" id="SelectSearch">
            <h3 className='text-center mb-3'><img src="images/search-by.png" alt="Search By" id="SearchTypes" /></h3>
              <div className="col-md-12">
              <input type="checkbox" id="playerName" name="playerName" value="Name" onChange={(evt) => searchState(evt.currentTarget.value)} />
              <label className='h5 ms-1 me-4' for="playerName">Name</label>
              <input type="checkbox" id="playerNumber" name="playerNumber" value="Number" onChange={(evt) => searchState(evt.currentTarget.value)} />
              <label className='h5 ms-1 me-4' for="playerNumber">Number</label>
              <input type="checkbox" id="playerTeam" name="playerTeam" value="Team" onChange={(evt) => searchState(evt.currentTarget.value)} />
              <label className='h5 ms-1 me-40' for="playerTeam">Team</label>
              </div>

            {/* Adding Players */}
            </div>
            <AddPlayer addPlayer={addPlayer} />
          </div>

      </div>




      
    </div>
  );
}

export default App;