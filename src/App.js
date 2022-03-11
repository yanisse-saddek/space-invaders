import './App.css';
import Grille from './composant/Grille.js'
import Tireur from './composant/Tireur'
import React from 'react'
import Case from './composant/Case'
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tireurCases: [],
      position: 0,
      grid: [
        ["ok", "ok", "ok", "ok", "", "ok", "ok", "ok", "ok", "ok"],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", "1", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],          // <--- pour le vaisseau 
      ],
      x:0,    
      y:0
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
        this.deplacement(this.state.y)
      }, 1000)
  }
  deplacement = (y) => {

      if(this.state.y >= 8){
        this.setState({
          y:0
        })
      }else{
        for(var i=0; i<=10; i++){
          if(this.state.grid[y][i] == "ok"){
            var deplacementGrid = [...this.state.grid]
            deplacementGrid[y][i] = " "   
              deplacementGrid[y+1][i] = "ok"
                this.setState({
                  grid:deplacementGrid,  
                  x:this.state.x+1,
            })       
          } 
        }
      } 
      
    this.setState({
      y:this.state.y+1

    })  
  }
  editData = (newData) => {
    this.setState({
      tireurCases: newData
    })
  }
  changePosition = (newPos) => {
    this.setState({
      position: newPos
    })
  }

  render() {
    return (
      <div className="App">
        {/* <Grille func={this.editGrid}  editData={this.editData} data={this.state} changePosition={this.changePosition}/>  */}
            <div tabIndex="0" class="tableau">
            {
            this.state.grid.map(y=>{
              var toReturn = []
              y.map(x=>{
                toReturn.push(<Case valeur={x} />)
              })
              return toReturn
            })
            }
            </div>
        <button onClick={()=>{
          this.deplacement(0,0)
        }}>aaa</button>
        <div class="tableau">
        {this.state.tireurCases}
        </div>
      </div>
    )
  }
}