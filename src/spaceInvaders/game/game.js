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
    render(){
        return (
            <div>
                <Field image = {field} cssClass={cssClasses.field}/>
                <Spaceship image = {spaceship} cssClass={cssClasses.spaceship}/>
                <AlienRenderer image = {alien} cssClass={cssClasses.alien}/>
            </div>
        );
    }
}