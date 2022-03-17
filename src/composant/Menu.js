import React from 'react'
export default class App extends React.Component{
   constructor(props){
    super(props)
}

    render(){    
        return(
            <div>   
            <h1><img src="/img/logospace.png" height="300px"></img></h1>

            
            <span class='start-btn' onClick={()=>{this.props.start()}}>START</span> 

            {localStorage.getItem('score')?<p class="score-txt zoom-in-zoom-out">Meilleur Score: {localStorage.getItem('score')}</p>:null}
            </div>
    )
    }
}