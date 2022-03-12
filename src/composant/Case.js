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
            <div class="case" style={{
                                        backgroundImage:`url(${this.props.valeur})`,
                                        backgroundSize:"cover"
                                    }} id={this.props.id}>

            </div>
               
    )
    }
}