import './App.css';
import React, { useEffect } from 'react';
import axios from 'axios'
import { useState } from 'react';

const App= ()=> {
  const [pokemon,setPokemon]= useState('pikachu');
  const [pokemonData, setPokemonData]= useState([]);
  const [pokemonType,setPokemonType]= useState('');

  const getPokemon = async ()=>{
    const toArray=[];
    try{
      const url=`https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res= await axios.get(url)
      toArray.push(res.data)
      setPokemonType(res.data.types[0].type.name)
      setPokemonData(toArray)
      console.log(res)
    }
    catch(e){
      console.log(e)
    }
  }

  const handelChange = (e)=>{
    setPokemon(e.target.value.toLowerCase())
  }
  const handelSubmit =(e)=>{
    e.preventDefault();
    getPokemon()
  }

  return (
    <div className="App">
      <h1 className='heading'>POKEDEX </h1>
      <form onSubmit={handelSubmit}>
          <label>
            <input type="text" onChange={handelChange} placeholder="Enter Pokemon Name"></input>
          </label>
      </form>
      {pokemonData.map((data)=>{
        return(
          <div className='container'>
            <img src={data.sprites["front_default"]}/>
            <div className='divTable'>
            <div className='divTableBody'>
            <div className='divTableRow'></div>
            <div className='divTableCell'>TYPE</div>
            <div className='divTableCell'>{pokemonType}</div>
            <div className='divTableRow'></div>
            <div className='divTableCell'>HEIGHT</div>
            <div className='divTableCell'>{Math.round(data.height*3.9)}</div>
            <div className='divTableRow'></div>
            <div className='divTableCell'>WEIGHT</div>
            <div className='divTableCell'>{Math.round(data.weight/4.3)} lbs</div>
            <div className='divTableRow'></div>
            <div className='divTableCell'>Number of Battles</div>
            <div className='divTableCell'>{data.game_indices.length}</div>
            </div>
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default App;
