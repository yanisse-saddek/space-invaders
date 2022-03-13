import React from 'react'
 
export default class App extends React.Component{
   constructor(props){
    super(props)
     this.state={
                 
     }
}
    render(){    
        return(
            <div>
            <p onClick={()=>{this.props.start()}}>menu</p> 
            {localStorage.getItem('score')?<p>meilleure score : {localStorage.getItem('score')}</p>:null}
            </div>
    )
    }
}