import React, {useState, useEffect}  from 'react';
import {useSpring, animated} from 'react-spring'

export class Spaceship extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            spaceshipWidth: 100,
            spaceshipHeight: 90,
            deviationFromTop: props.deviationFromTop,
            deviationFromLeft: 400,
            minimunDeviationFromLeft: 0,
            maximumDeviationFromLeft: 800,
            timeBetweenMovement: 30,
            pixelsOnHorizontalMove: 50,
            player: props.player
        };

        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount(props, state) {
        window.addEventListener("keypress", this.handleKeyPress, false);
        return null;
    }

    handleKeyPress(e){
        //MOVE
        debugger
        if (this.state.player === "ONE" && (e.key === "a" || e.key === "d")){
            this.move(e);
        }
        if (this.state.player === "TWO" && (e.key === "j" || e.key === "l")){
            this.move(e);
        }
        //SHOOT
        if (this.state.player === "ONE" && e.key === "s") {
            alert('Piuuu');
        }
        if (this.state.player === "TWO" && e.key === "k") {
            alert('Piuuu');
        }
    }

    move(e){
        //letter A
        if (e.key === "a" || e.key === "j") {
            this.moveLeft(e);
        }
        //letter D
        if (e.key === "d" || e.key === "l") {
            this.moveRight(e);
        }
    }

    moveLeft(e){
        if (this.state.deviationFromLeft - this.state.pixelsOnHorizontalMove >= this.state.minimunDeviationFromLeft) {
            for (var i = 0; i < this.state.pixelsOnHorizontalMove; i++){
                setTimeout(() => {
                    this.setState({deviationFromLeft: this.state.deviationFromLeft - 1});
                }, this.state.timeBetweenMovement);
            }
        }
    }

    moveRight(e){
        if (this.state.deviationFromLeft + this.state.pixelsOnHorizontalMove <= this.state.maximumDeviationFromLeft) {
            for (var i = 0; i < this.state.pixelsOnHorizontalMove; i++){
                setTimeout(() => {
                    this.setState({deviationFromLeft:this.state.deviationFromLeft + 1});
                }, this.state.timeBetweenMovement);
            }
        }
    }

    render(){
        return (
            <div>
                <img 
                className={this.props.cssClass}
                height={this.state.spaceshipHeight}
                width={this.state.spaceshipWidth}
                style={{
                    top : this.state.deviationFromTop,
                    left : this.state.deviationFromLeft,
                }}
                src = {this.props.image}/>
            </div>
        );
    }
}