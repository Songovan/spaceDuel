import React from 'react';

import spaceship from '../resources/spaceship.png';
import field from '../resources/field.jpg';
import alien from '../resources/alien.png';
import './game.css';

import {Field} from './app/field/field.js';
import {Spaceship} from './app/gameObjects/spaceship/spaceship.js';
import {AlienRenderer} from './app/gameObjects/aliens/alien.js';

const cssClasses = {
    spaceship: 'spaceship',
    alien: 'alien',
    field: 'field'
}

export class Game extends React.Component{

    constructor(props) {
        super(props)
    
        this.state = {
            gameOver : false,
            cssClasses: cssClasses,
            spaceshipMinimumDeviationFromTop: -90,
            spaceshipDeviationFromEachOther: -500
        }
    }

    render(){
        return (
            <div>
                <Field image = {field} cssClass={this.state.cssClasses.field}/>
                <Spaceship player={"ONE"} image = {spaceship} cssClass={this.state.cssClasses.spaceship} deviationFromTop={this.state.spaceshipMinimumDeviationFromTop}/>
                <Spaceship player={"TWO"} image = {spaceship} cssClass={this.state.cssClasses.spaceship} deviationFromTop={this.state.spaceshipMinimumDeviationFromTop + this.state.spaceshipDeviationFromEachOther}/>
                {/* <AlienRenderer image = {alien} cssClass={this.state.cssClasses.alien} gameOver={this.state.gameOver}/> */}
            </div>
        );
    }
}