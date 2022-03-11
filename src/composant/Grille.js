import React from 'react'
import Case from "./Case"
import Tireur from './Tireur'
import "../App.css"

export default class Grille extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount = () => {
        
        setTimeout(() => {
            this.getCase()
        }, 1000);
    }
    getCase = () => {
        var newGrid = this.props.data.grid
        var nouvotablo = this.props.data.tablo
        var horizontal = 0
        var vertical = 0
        for (var i = 1; i < 9; i++) {
            for (var j = 1; j < 10; j++) {
                if(newGrid[i][j] == "ok"){
                    nouvotablo[i][j] = (<Case valeur='ok' />)
                }
                else if(newGrid[i][j] == "1"){
                    nouvotablo[i][j] = (<Case valeur='1' />)
                }else if(newGrid[i][j] == " "){
                    nouvotablo[i][j] = ' '
                }
                horizontal++
            }
            horizontal = 0
            vertical++
        }
        this.props.func(newGrid, nouvotablo)
        setTimeout(() => {
            this.updateGrid()
        }, 1000);
    }
    updateGrid = () => {
        var newGrid = this.props.data.grid
        var nouvotablo = this.props.data.tablo        
        this.props.func(newGrid, nouvotablo)
        setTimeout(() => {
            this.getCase()
        }, 1000);

    }
    shoot = ()=>{
        var newGrid = this.props.data.grid
        var index = 8;
        var position = this.props.data.position;
        var tablo = this.props.data.tablo
        newGrid[1][1] = "1"
        tablo[1][1] = <Case value="1" />
        this.props.func(newGrid, tablo)
        setTimeout(() => {
            this.getCase()
        }, 1000);
 
}
goRight = () =>{
    // if(this.props.data.position!==9){
    var newPosition = this.props.data.position+1
    this.props.changePosition(newPosition)
    setTimeout(() => {
        this.bottomShooter()        
    }, 100);
// }    
}
    goLeft = () =>{
        // if(this.props.data.position!==0){
            var newPosition = this.props.data.position-1
            this.props.changePosition(newPosition)
            setTimeout(() => {
                this.bottomShooter()        
            }, 100);
        // }
    }

    key=(key)=>{
        if(key.code == "ArrowRight"){
            this.goRight()
        }else if(key.code == 'ArrowLeft'){
            this.goLeft()
        }else if(key.code == "Space"){
            this.shoot()
        }
    }
    bottomShooter = ()=>{
     var bottomCase = []
     var x=0
     for(var i=0; i<10; i++){
      if(this.props.data.position == x){
          bottomCase.push(<Case valeur="tireur"/>)
          this.props.changePosition(x)
      }else{
          bottomCase.push(<Case valeur=" "/>)
      }
      x++
     }
     
     this.props.editData(bottomCase)
    }
     render(){    
        return(
            <div onKeyDown={this.key} tabIndex="0" class="tableau ">
                <p onClick={()=>{this.goLeft()}}>gauche</p>
                <p onClick={()=>{this.goRight()}}>droite</p>
                <p onClick={()=>{this.shoot()}}>pan </p>
            </div>
    )
    }

}