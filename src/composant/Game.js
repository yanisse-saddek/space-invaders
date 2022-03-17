import '../App.css';
import React from 'react'
import Case from './Case'

export default class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tireurCases: ["https://yanisse-saddek.fr/monsters-invaders/img/personnage.png", "", "", "", " ", "", ""],
      position: 0,
      grid: [
        [" ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " "],
      ],
      x: 0,
      y: 0,
      position: 0,
      active: true,
      score: 0,
      // explosion: "yanisse/img/monsters-dead.png",
      monster: "https://yanisse-saddek.fr/monsters-invaders/img/monsters.png",
      tireur: "https://yanisse-saddek.fr/monsters-invaders/img/personnage.png",
      balle: "https://yanisse-saddek.fr/monsters-invaders/img/bullet.png",
      vie: 3,
      lifes:null
    }
  }
  componentDidMount = () => {
    var newGrid = this.state.grid
    this.getLife()
    this.editGrid(newGrid)
  }
  getLife = ()=>{
    var heartList = []

    for(var i=this.state.vie; i!==0; i--){
      heartList.push(<img src="https://yanisse-saddek.fr/monsters-invaders/img/heart.png" height="30"/>)
    }
    this.setState({
      lifes:heartList
    })
  }
  editGrid = (newGrid) => {
    this.setState({
      grid: newGrid
    })

    setInterval(() => {
      if (this.state.active) {
        this.newMonster()
      }
    }, 500)
    setInterval(() => {
      if (this.state.active) {
        this.deplacement()
      }
    }, 200)
  }
  newMonster = () => {
    var gridMonster = this.state.grid
    var randY = Math.ceil(Math.random() * (this.state.grid.length / 3))
    var randX = Math.floor(Math.random() * this.state.grid[randY].length)
    console.log(this.state.grid[randY].length / 2)
    gridMonster[randY][randX] = this.state.monster
    this.setState({
      grid: gridMonster
    })
  }

  deplacement = () => {
    for (var y = 0; y < this.state.grid.length; y++) {
      for (var x = 0; x < this.state.grid.length; x++) {
        if (this.state.grid[y][x] == this.state.balle) {
          var deplacementGrid = [...this.state.grid]
          deplacementGrid[y][x] = " "
          if(y>1){
            deplacementGrid[y-1][x] = this.state.balle
          }
          this.setState({
            grid: deplacementGrid,
            x: this.state.x + 1,
          })
        }
      }
    }

    if(this.state.y>this.state.grid.length-2 && this.state.active){
      for(var checkX=0; checkX<=this.state.grid.length-1; checkX++){
        if (this.state.vie == 0 ){
          this.setState({
            active:false
          })
          var localScore= localStorage.getItem('score')
          if( this.state.score > localScore ){
            localStorage.setItem('score', this.state.score)
          }
          this.props.stop()
        }
        var lastGrid = this.state.grid.slice(-1)
        
        if(lastGrid[checkX].includes(this.state.monster)){
          var newGrid = [
            [" ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " "],
          ]
          this.setState({
            vie: this.state.vie -1,
            grid:newGrid
          })
          let audio = new Audio('https://yanisse-saddek.fr/monsters-invaders/audio/oof.mp3')
          audio.play()

          this.getLife()

        }else{
          this.setState({
            y:0
          })
        }
      }
    }else{
      for (var x = this.state.grid.length; x >=0; x--) {
        if (this.state.grid[this.state.y][x] == this.state.monster && this.state.grid[this.state.y+1][x] !== this.state.monster  && this.state.grid[this.state.y + 1][x] !== this.state.balle) {
          var deplacementGrid = [...this.state.grid]
          deplacementGrid[this.state.y][x] = " "
            deplacementGrid[this.state.y + 1][x] = this.state.monster
          this.setState({
            grid: deplacementGrid,
            x: this.state.x + 1,
          })
        }
        if (this.state.grid[this.state.y + 1][x] == this.state.balle && this.state.grid[this.state.y][x] == this.state.monster || this.state.grid[this.state.y][x] == this.state.balle) {
          deplacementGrid[this.state.y+1][x] = " "
          deplacementGrid[this.state.y][x] = " "
          let audio = new Audio('https://yanisse-saddek.fr/monsters-invaders/audio/explosion.mp3')
          audio.play()
          this.setState({
            score:this.state.score+1
          })
        }
      }
      this.setState({
        y:this.state.y+1
      })
    }
  }	
  goRight = () => {
    if (this.state.position !== this.state.tireurCases.length - 1) {
      var newPosition = this.state.position + 1
      var shooterCase = this.state.tireurCases
      shooterCase[newPosition - 1] = " "
      shooterCase[newPosition] = this.state.tireur
      this.setState({
        position: newPosition,
        tireurCases: shooterCase
      })
    }
  }
  goLeft = () => {
    if (this.state.position !== 0) {
      var newPosition = this.state.position - 1
      var shooterCase = this.state.tireurCases
      shooterCase[newPosition + 1] = " "
      shooterCase[newPosition] = this.state.tireur
      this.setState({
        position: newPosition,
        tireurCases: shooterCase
      })
    }
  }
  shoot = () => {
    var position = this.state.position
    var newGrid = this.state.grid
    newGrid[this.state.grid.length - 1][position] = this.state.balle
    this.setState({
      grid: newGrid,
    })
  }
  key = (key) => {
    if (this.state.active) {
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
        <div className="infos">
          <div>
            <p>Score: {this.state.score}</p>            
          </div>
          {localStorage.getItem('score')?<div><p class="score-txt">Meilleur Score: {localStorage.getItem('score')}</p></div>:null}
          <div>
            {this.state.lifes}
          </div>
        </div>
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
        </div>
      </div>
    )
  }
}