import React from 'react';
import $ from 'jquery';

import spaceship from '../resources/spaceship.png';
import field from '../resources/field.jpg';
import alien from '../resources/alien.png';
import orb from '../resources/orb.png';
import gameStartField from '../resources/game-start-field.png';
import gameOverImage from '../resources/game-over.png';
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
    gameOverImage: 'gameOverImage'
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
        }

        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount(props, state) {
        $(document).one("keypress", this.handleKeyPress)
        return null;
    }

    handleKeyPress(e) {
        this.setState({menu: false});
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
        return (
            <div>
                <Field image = {field} cssClass={this.state.cssClasses.field}/>
                <Spaceship 
                    player={"ONE"} 
                    image = {spaceship} 
                    cssClass={this.state.cssClasses.spaceship} 
                    deviationFromTop={this.state.spaceshipMinimumDeviationFromTop} 
                    orb={orb}
                    orbClass={this.state.cssClasses.orb}/>
                <Spaceship 
                    player={"TWO"} 
                    image = {spaceship} 
                    cssClass={this.state.cssClasses.spaceship} 
                    deviationFromTop={this.state.spaceshipMinimumDeviationFromTop + this.state.spaceshipDeviationFromEachOther}
                    orb={orb} 
                    orbClass={this.state.cssClasses.orb}/>
            </div>
        );
    }

    renderGameOver(){
        return (
            <div>
                <Field 
                    image = {field}
                    cssClass={this.state.cssClasses.field}/>
                <Field 
                    image = {gameOverImage}
                    cssClass={this.state.cssClasses.gameOverImage}/>
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