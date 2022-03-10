import React from 'react'
import Case from "./Case"
import "../App.css"

export default class App extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            tablo: [],
            grid:this.props.data.grid
        }
    }
    componentDidMount = ()=>{
        var nouvotablo = []
        var horizontal = 0
        var vertical = 0
        for(var i=0; i<9; i++){
            for(var j=0; j<10; j++){
                if(this.state.grid[vertical][horizontal] == "ok"){
                    nouvotablo.push(<Case valeur="ok" />)  
                }
                else if(this.state.grid[vertical][horizontal] == " "){
                    nouvotablo.push(<Case valeur=" " />)  
                }
                horizontal++
            }
            horizontal=0
            vertical++
        }
        this.setState({
            tablo:nouvotablo
        }) 
        var newGrid = []
        newGrid.push([" ", " ", " ", " ", " ", " ", " ", " ", " ", " "])
        for(var ok=0; ok<9; ok++){
            newGrid.push(this.state.grid[ok+1]) 
        }
        newGrid.push(this.state.grid[9])
        this.setState({
          grid:newGrid
        })
        this.componentDidMount()
    }

    render(){    
        return(
            <div class="tableau">
                {this.state.tablo} 
            </div>
               
    )
}   

}