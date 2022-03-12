import './App.css';
import Grille from './composant/Grille.js'
import Tireur from './composant/Tireur'
import React from 'react'
import Case from './composant/Case'
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tireurCases: ["green", "", "", "", " ", "", "", "", "", ""],
      position: 0,
      grid: [
        ["red", "red", "red", "red", "", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", "red"],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", "1", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],          // <--- pour le vaisseau 
      ],
      x: 0,
      y: 0,
      position: 0,
      active:true,
      score:0
    }
  }
  componentDidMount = () => {
    var newGrid = this.state.grid
    this.editGrid(newGrid)
  }
  editGrid = (newGrid) => {
    this.setState({
      grid: newGrid
    })

    setInterval(() => {
      if(this.state.active){
        this.deplacement()
        this.newMonster()  
        console.log('score', this.state.score)
      }
    }, 1000)
  }
  newMonster=()=>{
    var gridMonster = this.state.grid
    var randY = Math.ceil(Math.random()*5)
    var randX = Math.ceil(Math.random()*9)
    gridMonster[randY][randX] = "red"
    this.setState({
      grid:gridMonster
    })
  }
  deplacement = () => {
    for (var y = 0; y < 10; y++) {
      for (var x = 0; x < 10; x++) {
        if (this.state.grid[y][x] == "blue") {
          var deplacementGrid = [...this.state.grid]
          deplacementGrid[y][x] = " "
          if(y>1){
            deplacementGrid[y-1][x] = "blue"
          }
          this.setState({
            grid: deplacementGrid,
            x: this.state.x + 1,
          })
        }
      }
    }

    if(this.state.y>8 && this.state.active){
      for(var checkX=0; checkX<=9; checkX++){
        console.log("------", this.state.grid[9][checkX])
        if(this.state.grid[9][checkX] == "red"){
          console.log('game over cousin ta perdu')
          this.setState({
            active:false
          })
        }else{
          this.setState({
            y:0
          })
        }
      }
    }else{
      for (var x = 10; x >=0; x--) {
        if (this.state.grid[this.state.y][x] == "red" && this.state.grid[this.state.y + 1][x] !== "blue") {
          var deplacementGrid = [...this.state.grid]
          deplacementGrid[this.state.y][x] = " "
            deplacementGrid[this.state.y + 1][x] = "red"
          this.setState({
            grid: deplacementGrid,
            x: this.state.x + 1,
          })
        }
        else if (this.state.grid[this.state.y + 1][x] == "blue") {
          deplacementGrid[this.state.y][x] = " "
          deplacementGrid[this.state.y+1][x] = " "
          console.log('collission')
          this.setState({
            grid: deplacementGrid,
            x: this.state.x + 1,
            score:this.state.score+1
          })
        }
      }
      this.setState({
        y:this.state.y+1
      })
    }
  }
  newBullet = () => {
    var random = Math.ceil(Math.random() * 8)
    var newGrid = this.state.grid
    newGrid[8][random] = "1"
    this.setState({
      grid: newGrid
    })
  }

  goRight = () => {
    if (this.state.position !== 9) {
      var newPosition = this.state.position + 1
      var shooterCase = this.state.tireurCases
      shooterCase[newPosition - 1] = " "
      shooterCase[newPosition] = "green"
      this.setState({
        position: newPosition,
        tireurCases: shooterCase
      })
    }
  }
  goLeft = () => {
    console.log(this.state.position)
    if (this.state.position !== 0) {
      var newPosition = this.state.position - 1
      var shooterCase = this.state.tireurCases
      shooterCase[newPosition + 1] = " "
      shooterCase[newPosition] = "green"
      this.setState({
        position: newPosition,
        tireurCases: shooterCase
      })
    }
  }
  shoot = () => {
    var position = this.state.position
    var newGrid = this.state.grid
    newGrid[9][position] = "blue"
    // this.setState({
    //   grid:newGrid
    // })
  }
  key = (key) => {
    if(this.state.active){
      if (key.code == "ArrowRight") {
        this.goRight()
      } else if (key.code == 'ArrowLeft') {
        this.goLeft()
      } else if (key.code == "Space") {
        this.shoot()
      }
    }
  }
  render() {
    return (
      <div className="App">
        <div tabIndex="0" onKeyDown={this.key} class="tableau">
          {
            this.state.grid.map(y => {
              var toReturn = []
              y.map(x => {
                toReturn.push(<Case valeur={x} />)
              })
              return toReturn
            })
          }
          {
            this.state.tireurCases.map(cases => {
              return <Case valeur={cases} />
            })
          }
          <p>Score: {this.state.score}</p>
        </div>
      </div>
    )
  }
}