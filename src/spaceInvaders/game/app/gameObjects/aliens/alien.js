import React, { Component } from 'react'

const numAliens = 14;
const numAlinesPerLine = 7;
const numAlienLines = 2;
const alienWidth = 100;
const alienHeight = 90;
const distanceBetweenAlienLines = 120;
const distanceBetweenHorizontalAliens = 100;
const initialDeviationFromTop = -585;
const initialDeviationFromLeft = 100;
let initialWidthPositions = [];
let initialHeightPositions = [];
let heightCorrector = [];

export class AlienRenderer extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }

        this.alienRenderer = this.alienRenderer.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        // initial positions calculation
        let counter = 0;
        var j = 0;
        for (var i = 0; i < numAlienLines; i++){
            initialHeightPositions[i] = initialDeviationFromTop + (distanceBetweenAlienLines * i)
            - (counter) * alienHeight;
            
            for (j = 0; j < numAlinesPerLine; j++){

                initialWidthPositions[j] = initialDeviationFromLeft 
                + j * distanceBetweenHorizontalAliens;

                heightCorrector.push(j * alienHeight);

                counter++;
            }
        }
        return null;
    }

    alienRenderer() {
        var alienLines = [];
        for (var i = 0; i < numAlienLines; i++){
            for (var j = 0; j < numAlinesPerLine; j++){
                alienLines.push(<Alien 
                    cssClass={this.props.cssClass} 
                    image={this.props.image}
                    alienWidth={alienWidth}
                    alienHeight={alienHeight}
                    distanceToTop = {initialHeightPositions[i] - heightCorrector[j]}
                    distanceToLeft = {initialWidthPositions[j]}
                    />
                )
            }
        }
        return alienLines;
    }
    
    render() {
        return (
            <div>
                {this.alienRenderer().map((component, index) => (
                    <React.Fragment key={index}>
                        { component }
                    </React.Fragment>
                ))}
            </div>
        )
    }
}


export class Alien extends Component {
    render() {
        return (
            <img 
                className={this.props.cssClass} 
                src={this.props.image}
                width={this.props.alienWidth}
                height={this.props.alienHeight}
                style = {{
                    top : this.props.distanceToTop,
                    left : this.props.distanceToLeft,
                }}
                />
        )
    }
}
