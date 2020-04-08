import React from 'react';
import {useSpring, animated} from 'react-spring'

export class Spaceship extends React.Component{

    constructor(props) {
        super(props)
    
        this.state = {
             
        }

        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(){
        debugger
    }

    render(){
        return (
            <img 
                className={this.props.cssClass} 
                src = {this.props.image}
                onKeyPress={this.handleKeyPress}/>
        );
    }
}