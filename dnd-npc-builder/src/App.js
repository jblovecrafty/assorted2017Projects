import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { RandomNPCGenerator } from "./Npc";

class App extends Component {

  render() {
    const npcCreator = new RandomNPCGenerator();
    const npc = npcCreator.generateNPC();

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">NPC Builder</h1>
        </header>
        <div className="App-intro">
          <h2>Name: {npc.name.firstName} {npc.name.lastName}</h2>
          <p>Race: {npc.race}</p>
          <p>Sex: {npc.gender}</p>
          <p>Class: {npc.characterClass}</p>
          <p>Level: {npc.level}</p>
          <hr/>
          <p>Defining Personality Characteristic: {npc.personality.definingCharacteristic}</p>
          <p>Major Personality Trait: {npc.personality.majorPersonalityTrait}</p>
          <p>Minor Personality Trait: {npc.personality.minorPersonalityTrait}</p>
          <hr/>
          <p>Major Physical Trait: {npc.appearance.majorPhysicalTrait}</p>
          <p>Minor Physical Trait: {npc.appearance.minorPhysicalTrait}</p>
          <hr/>
          <p>Weapons: {npc.items.weapon}</p>
          <p>Armor: {npc.items.armor}</p>
          <p>Common Item: {npc.items.commonItem}</p>
          <p>Special Item: {npc.items.specialItem}</p>
        </div>
      </div>
    );
  }
}

export default App;
