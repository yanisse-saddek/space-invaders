import React from 'react'
import '../App.css'
export default class Case extends React.Component{
   constructor(props){
    super(props)
     this.state={
        
     }
   }
    render(){    
        return(
            <div class="case" style={{background:this.props.valeur}} id={this.props.id}>

            </div>
               
    )
    }
}