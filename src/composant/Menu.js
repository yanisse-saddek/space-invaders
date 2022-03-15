import React from 'react'
export default class App extends React.Component{
   constructor(props){
    super(props)
}
    render(){    
        return(
            <div>
            <h1>Menu</h1>
            <p onClick={()=>{this.props.start()}}>commencer</p> 
            {localStorage.getItem('score')?<p>meilleure score : {localStorage.getItem('score')}</p>:null}
            </div>
    )
    }
}