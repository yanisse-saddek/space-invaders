import './App.css';
import Grille from './composant/Grille.js'
import Tireur from './composant/Tireur'
import React from 'react'
import Case from './composant/Case'
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tireurCases: ["https://us.123rf.com/450wm/bsd555/bsd5552005/bsd555200501008/147207937-homme-marchant-vers-l-avant-semi-plat-illustration-vectorielle-de-couleur-rvb.jpg?ver=6", "", "", "", " ", "", "", "", "", ""],
      position: 0,
      grid: [
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],          // <--- pour le vaisseau 
      ],
      x: 0,
      y: 0,
      position: 0,
      active:true,
      score:0,
      explosion:"https://e7.pngegg.com/pngimages/771/418/png-clipart-explosion-explosion.png",
      monster:"https://img2.freepng.fr/20181118/opy/kisspng-clip-art-openclipart-free-content-monster-image-free-rock-cartoon-cliparts-download-free-clip-art-5bf168eb018c98.5433835315425476910064.jpg",
      tireur:"https://us.123rf.com/450wm/bsd555/bsd5552005/bsd555200501008/147207937-homme-marchant-vers-l-avant-semi-plat-illustration-vectorielle-de-couleur-rvb.jpg?ver=6",
      balle:"https://previews.123rf.com/images/jirkaejc/jirkaejc1711/jirkaejc171100010/88858112-.jpg",
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
        this.newMonster()  
      }
    }, 500)
    setInterval(() => {
      if(this.state.active){
        this.deplacement()
      }
    }, 300)
  }
  newMonster=()=>{
    var gridMonster = this.state.grid
    var randY = Math.ceil(Math.random()*3)
    var randX = Math.floor(Math.random()*10)
    gridMonster[randY][randX] = this.state.monster
    this.setState({
      grid:gridMonster
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
        var lastGrid = this.state.grid.slice(-1)
        if(lastGrid[checkX].includes(this.state.monster)){
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
         if (this.state.grid[this.state.y + 1][x] == this.state.balle && this.state.grid[this.state.y][x] == this.state.monster) {
          console.log("touche!é")
          deplacementGrid[this.state.y+1][x] = " "
          deplacementGrid[this.state.y][x] = this.state.explosion
          deplacementGrid[this.state.y-1][x] = "https://yt3.ggpht.com/ytc/AKedOLRxDKG0KL704hRwVp8DwmnVyplRu3NGvjJRF0M=s88-c-k-c0x00ffffff-no-rj"

          console.log([...deplacementGrid])
          this.setState({
            score:this.state.score+1
          })
          this.collision(this.state.y, x)  
        }
      }
      this.setState({
        y:this.state.y+1
      })
    }
  }
  collision= (y, x)=>{
    setTimeout(() => {
      var deplacementGrid = this.state.grid
      deplacementGrid[y][x] = " "
      deplacementGrid[y-1][x] = " "
      this.setState({
        grid: deplacementGrid,
        x: this.state.x + 1,
        score:this.state.score+1
      })
    }, 1000);
  }
  goRight = () => {
    if (this.state.position !== 9) {
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
    newGrid[this.state.grid.length -1][position] = this.state.balle
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