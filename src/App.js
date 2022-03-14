import './App.css';
import React from 'react'
import Game from './composant/Game'
import Menu from './composant/Menu'
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      actif:"menu"
    }
  }
  game = ()=>{
    if(this.state.actif == "menu"){
      return <Menu start={this.startGame}/>
    }else if(this.state.actif == "game"){
      return <Game endGame={this.endGame}/>
    }
  }
  startGame = ()=>{
    this.setState({
      actif:'game'
    })
  }
  endGame = ()=>{
    this.setState({
      actif:'menu'
    })
  }
  render() {
    return (
      <div className="App">
          {this.game()}
      </div>
    )
  }
}