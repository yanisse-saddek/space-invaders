import React from 'react'
import Case from './Case' 
export default class Tireur extends React.Component{
   constructor(props){
    super(props)
     this.state={
     }
   }



     render(){    
        return(
            <div onKeyDown={this.key} class="tableau ">
            </div>
    )
}
}
