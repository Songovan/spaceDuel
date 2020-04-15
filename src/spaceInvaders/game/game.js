import React from 'react';
import $ from 'jquery';

import spaceship from '../resources/spaceship.png';
import field from '../resources/field.jpg';
import alien from '../resources/alien.png';
import orb from '../resources/orb.png';
import gameStartField from '../resources/game-start-field.png';
import gameOverImage from '../resources/game-over.png';
import p1wins from '../resources/p1wins.png';
import p2wins from '../resources/p2wins.png';
import './game.css';

import {Field} from './app/field/field.js';
import {Spaceship} from './app/gameObjects/spaceship/spaceship.js';
import {AlienRenderer} from './app/gameObjects/aliens/alien.js';

const cssClasses = {
    spaceship: 'spaceship',
    alien: 'alien',
    field: 'field',
    orb: 'orb',
    gameStartField: 'gameStartField',
    gameOverImage: 'gameOverImage',
    winner: 'winner'
}

export class Game extends React.Component{

    constructor(props) {
        super(props)
    
        this.state = {
            menu: true,
            gameOver : false,
            cssClasses: cssClasses,
            spaceshipMinimumDeviationFromTop: -90,
            spaceshipDeviationFromEachOther: -550,
            playerOneIsHit: false,
            playerTwoIsHit: false,
            playerOneLeftDeviation: 0,
            playerTwoLeftDeviation:0
        }

        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.changeIsHit = this.changeIsHit.bind(this);
        this.updatePlayerDeviation = this.updatePlayerDeviation.bind(this);
    }

    componentDidMount(props, state) {
        $(document).one("keypress", this.handleKeyPress)
        return null;
    }

    handleKeyPress(e) {
        this.setState({menu: false});
    }

    changeIsHit(player) {

        if (player === "ONE"){
            this.setState({
                playerTwoIsHit: true
            });
        };

        if (player === "TWO"){
            this.setState({
                playerOneIsHit: true
            });
        };
    }

    updatePlayerDeviation(player, leftDeviation) {

        if (player === "ONE"){
            this.setState({
                playerOneLeftDeviation: leftDeviation
            });
        };

        if (player === "TWO"){
            this.setState({
                playerTwoLeftDeviation: leftDeviation
            });
        };
    }
    

    renderMenu(){
        return (
            <div>
                <Field 
                    image = {gameStartField}
                    cssClass={this.state.cssClasses.gameStartField}/>
            </div>
        )
    };

    renderGame(){
        if (this.state.playerOneIsHit || this.state.playerTwoIsHit){
            this.setState({gameOver: true})
        }

        return (
            <div>
                <Field image = {field} cssClass={this.state.cssClasses.field}/>
                <Spaceship 
                    player={"ONE"} 
                    image = {spaceship} 
                    cssClass={this.state.cssClasses.spaceship} 
                    spaceshipDeviationFromEachOther={this.state.spaceshipDeviationFromEachOther}
                    deviationFromTop={this.state.spaceshipMinimumDeviationFromTop} 
                    orb={orb}
                    orbClass={this.state.cssClasses.orb}
                    isHit={this.state.playerOneIsHit}
                    changeIsHit={this.changeIsHit}
                    updatePlayerDeviation={this.updatePlayerDeviation}
                    otherPlayerDeviation={this.state.playerTwoLeftDeviation}/>
                <Spaceship 
                    player={"TWO"} 
                    image = {spaceship} 
                    cssClass={this.state.cssClasses.spaceship} 
                    spaceshipDeviationFromEachOther={this.state.spaceshipDeviationFromEachOther}
                    deviationFromTop={this.state.spaceshipMinimumDeviationFromTop + this.state.spaceshipDeviationFromEachOther}
                    orb={orb} 
                    orbClass={this.state.cssClasses.orb}
                    isHit={this.state.playerTwoIsHit}
                    changeIsHit={this.changeIsHit}
                    updatePlayerDeviation={this.updatePlayerDeviation}
                    otherPlayerDeviation={this.state.playerOneLeftDeviation}/>
            </div>
        );
    }

    renderGameOver(){
        let winner = this.state.playerOneIsHit ? p2wins : p1wins;
        return (
            <div>
                <Field 
                    image = {field}
                    cssClass={this.state.cssClasses.field}/>
                <Field 
                    image = {gameOverImage}
                    cssClass={this.state.cssClasses.gameOverImage}/>
                <Field 
                    image = {winner}
                    cssClass={this.state.cssClasses.winner}/>
            </div>
        );
    }

    //MAIN METHOD
    renderWorkflow(){
        if (this.state.menu){
            return this.renderMenu();
        }

        if (!this.state.gameOver){
            return this.renderGame();
        }

        return this.renderGameOver();
    }

    render(){
        return this.renderWorkflow();
    }
}