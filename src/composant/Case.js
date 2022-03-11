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
            <div class="case" id={this.props.id}>
                    {this.props.valeur}
            </div>
               
    )
    }
}