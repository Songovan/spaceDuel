import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring'

export class Spaceship extends React.Component {

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
            player: props.player,
            shoot: false,
            orbDeviationFromTop: 0,
            originalOrbDeviationFromTop: 0,
            orbDeviationFromLeft: 0,
            shotFPS: 100,
            timeBetweenShots: 100
        };

        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount(props, state) {
        //ADJUSTING ORB
        let topDeviationCorrection = 0;
        if (this.props.player === "ONE"){
            topDeviationCorrection = this.state.deviationFromTop - this.state.spaceshipHeight - 25
        } else if (this.props.player === "TWO") {
            topDeviationCorrection = this.state.deviationFromTop - 25
        }
        //AT THE BEGGINING, THEY'RE BOTH THE SAME
        this.setState({originalOrbDeviationFromTop: topDeviationCorrection})
        this.setState({orbDeviationFromTop: topDeviationCorrection})
        this.props.updatePlayerDeviation(this.props.player, this.state.deviationFromLeft);

        window.addEventListener("keypress", this.handleKeyPress, false);
        return null;
    }

    handleKeyPress(e) {
        //MOVE
        if (this.state.player === "ONE" && (e.key === "a" || e.key === "d")) {
            this.move(e);
        }
        if (this.state.player === "TWO" && (e.key === "j" || e.key === "l")) {
            this.move(e);
        }
        //SHOOT
        if ((this.state.player === "ONE" && e.key === "s") || (this.state.player === "TWO" && e.key === "k")) {
            this.shoot(this.state.player);
        }
    }

    shoot(player){
        this.setState({
            shoot: true,
            orbDeviationFromLeft: this.state.deviationFromLeft
        });
        if (player === "ONE"){
            for (var i = 0; i < 390; i++){
                setTimeout(() => {
                    let totalValue = this.state.orbDeviationFromTop - 1;
                    this.setState({orbDeviationFromTop: totalValue});
                }, this.state.shotFPS);
            }
        }
        if (player === "TWO"){
            for (var i = 0; i < 390; i++){
                setTimeout(() => {
                    let totalValue = this.state.orbDeviationFromTop + 1;
                    this.setState({orbDeviationFromTop: totalValue});
                }, this.state.shotFPS);
            }
        }
        setTimeout(() => {
            this.setState({shoot: false});
            this.setState({orbDeviationFromTop: this.state.originalOrbDeviationFromTop})
        }, this.state.timeBetweenShots);
        
    }

    move(e) {
        //letter A
        if (e.key === "a" || e.key === "j") {
            this.moveLeft(e);
        }
        //letter D
        if (e.key === "d" || e.key === "l") {
            this.moveRight(e);
        }
    }

    moveLeft(e) {
        if (this.state.deviationFromLeft - this.state.pixelsOnHorizontalMove >= this.state.minimunDeviationFromLeft) {
            for (var i = 0; i < this.state.pixelsOnHorizontalMove; i++) {
                setTimeout(() => {
                    this.setState({ deviationFromLeft: this.state.deviationFromLeft - 1 });
                }, this.state.timeBetweenMovement);
            }
        }
        this.props.updatePlayerDeviation(this.props.player, this.state.deviationFromLeft);
    }

    moveRight(e) {
        if (this.state.deviationFromLeft + this.state.pixelsOnHorizontalMove <= this.state.maximumDeviationFromLeft) {
            for (var i = 0; i < this.state.pixelsOnHorizontalMove; i++) {
                setTimeout(() => {
                    this.setState({ deviationFromLeft: this.state.deviationFromLeft + 1 });
                }, this.state.timeBetweenMovement);
            }
        }
        this.props.updatePlayerDeviation(this.props.player, this.state.deviationFromLeft);
    }

    checkIfIsHit(){
        let orbHeight = this.state.orbDeviationFromTop - this.state.originalOrbDeviationFromTop;
        let otherPlayerHorizontalDeviation = this.props.otherPlayerDeviation;
        let orbHorizontalDeviation = this.state.orbDeviationFromLeft;
        let similarHorizontalDeviation = otherPlayerHorizontalDeviation === orbHorizontalDeviation;
        
        if (this.props.player === "ONE"){
            if ((orbHeight <= -340) && similarHorizontalDeviation){
                this.props.changeIsHit(this.props.player);
            }
        } else if (this.props.player === "TWO") {
            if ((orbHeight >= 330) /* && similarHorizontalDeviation */){
                debugger
                if(similarHorizontalDeviation){
                    this.props.changeIsHit(this.props.player);
                }
            }
        }
    }

    returnImg() {
        if (this.state.shoot){
            this.checkIfIsHit();
        }
        return (
            <div>
                <img
                    className={this.props.cssClass}
                    height={this.state.spaceshipHeight}
                    width={this.state.spaceshipWidth}
                    style={{
                        top: this.state.deviationFromTop,
                        left: this.state.deviationFromLeft,
                    }}
                    src={this.props.image} />
                <Orb
                    orbClass={this.props.orbClass}
                    shoot={this.state.shoot}
                    horizontalCoordinate={this.state.deviationFromLeft}
                    deviationFromTop={this.state.orbDeviationFromTop}
                    orb={this.props.orb}/>
            </div>
        );
    }

    render() {
        return this.returnImg();
    }
}

export class Orb extends React.Component {

    returnImg(){
        let visibility = this.props.shoot ? "visible" : "hidden";

        return (
            <img
                className={this.props.orbClass}
                style={{
                    top: this.props.deviationFromTop,
                    left: this.props.horizontalCoordinate + 25,
                    visibility: visibility
                }}
                src={this.props.orb} />
        );
    }

    render() {
        return this.returnImg();
    }
}
