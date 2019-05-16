import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
// import {robots} from './robots';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';



class App extends Component{
    constructor(){
        super()
        this.state={
            robots:[],
            searchfield:''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
        .then (users=>this.setState({robots:users}))
    }
    onSearchChange=(event)=>{
        this.setState({searchfield:event.target.value})
    }
    render(){
        const filteredRobots=this.state.robots.filter(robot=>{
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })

        // Below is a code we can use to add a react-loading component. It helps the system what to do in case the API isnt loading fast enough. In the case here, we're just outputing  LOADING 
        if(this.state.robots.length===0){
            return <h1>loading</h1>
        }else{
        return(
            <div className='tc'>
                <h1>RoboFwends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots}/>
                    </ErrorBoundary>
                </Scroll>
            </div>
        );
        }
    }
}

export default App;