import './App.css';
import Grille from './composant/Grille.js'
import React from 'react'
 
export default class App extends React.Component{
   constructor(props){
    super(props)
     this.state={
      tablo:[],
      grid: [
          ["ok", "ok", " ", " ", " ", " ", " ", "ok", "ok", " "],
          [" ", " ", " ", " ", " ", "ok", " ", " ", " ", " "],
          [" ", " ", " ", " ", "ok", " ", " ", " ", " ", "ok"],
          [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", "ok", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],          // <--- pour le vaisseau 
      ],     
     }
    }     
    render(){    
        return(
          <div className="App">
          <Grille data={this.state}/>
        </div>
    )
}
}