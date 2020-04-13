import React, { Component } from 'react'

export class AlienRenderer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            numAliens: 14,
            numAlinesPerLine: 7,
            numAlienLines: 2,
            alienWidth: 100,
            alienHeight: 90,
            distanceBetweenAlienLines: 120,
            distanceBetweenHorizontalAliens: 100,
            initialDeviationFromTop: -585,
            initialDeviationFromLeft: 100,
            widthPositions: [],
            heightPositions: [],
            heightCorrector: [],
            minimunDeviationFromLeft: 0,
            maximumDeviationFromLeft: 800,
            timeBetweenMovement: 30,
            pixelsOnHorizontalMove: 50,
            restBetweenTranslations: 2000,
            isDirectionLeft: Math.random() > 0.5,
            gameOver: props.gameOver
        }

        this.alienRenderer = this.alienRenderer.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);

    }

    static getDerivedStateFromProps(props, state) {
        // initial positions calculation
        let counter = 0;
        var j = 0;
        for (var i = 0; i < state.numAlienLines; i++) {
            state.heightPositions[i] = state.initialDeviationFromTop + (state.distanceBetweenAlienLines * i)
                - (counter) * state.alienHeight;

            for (j = 0; j < state.numAlinesPerLine; j++) {

                state.widthPositions[j] = state.initialDeviationFromLeft
                    + j * state.distanceBetweenHorizontalAliens;
                state.heightCorrector.push(j * state.alienHeight);
                counter++;
            }
        }
        return null;
    }

    alienRenderer() {
        var alienLines = [];
        for (var i = 0; i < this.state.numAlienLines; i++) {
            for (var j = 0; j < this.state.numAlinesPerLine; j++) {
                alienLines.push(<Alien
                    cssClass={this.props.cssClass}
                    image={this.props.image}
                    alienWidth={this.state.alienWidth}
                    alienHeight={this.state.alienHeight}
                    distanceToTop={this.state.heightPositions[i] - this.state.heightCorrector[j]}
                    distanceToLeft={this.state.widthPositions[j]}
                />
                )
            }
        }
        return alienLines;
    }

    componentDidMount(props, state) {
        window.addEventListener("keypress", this.handleKeyPress, false);
        return null;
    }

    handleKeyPress(e){
        //START TO MOVE WHEN KEY IS PRESSED
        if (e.key === "a" || e.key === "d" || e.key === "s"){
            this.move();
        }
    }

    move() {
        // while (this.state.gameOver !== true) {

            setTimeout(() => {
                if (this.state.isDirectionLeft) {
                    this.moveLeft();
                } else {
                    this.moveRight();
                }
            }, this.state.restBetweenTranslations);
        // }
        return null;
    }

    moveLeft() {
        if (this.state.widthPositions[0] - this.state.pixelsOnHorizontalMove >= this.state.minimunDeviationFromLeft) {
            let newWidthPositions = [];
            for (var i = 0; i < this.state.pixelsOnHorizontalMove; i++) {
                newWidthPositions = this.state.widthPositions.map(function (widthPosition) {
                    return widthPosition - 1;
                });
                setTimeout(() => {
                    this.setState({ widthPositions: newWidthPositions }); //IS NOT SETTING STATE
                }, this.state.timeBetweenMovement);
            }
        } else {
            this.state.isDirectionLeft = false;
        }
    }

    moveRight() {
        debugger
        if (this.state.widthPositions[0] + this.state.pixelsOnHorizontalMove <= this.state.maximumDeviationFromLeft) {
            let newWidthPositions = [];
            for (var i = 0; i < this.state.pixelsOnHorizontalMove; i++) {
                setTimeout(() => {
                    newWidthPositions = this.state.widthPositions.map(function (widthPosition) {
                        debugger
                        return widthPosition + 1;
                    });
                    this.setState({ widthPositions: newWidthPositions }); //IS NOT SETTING STATE
                }, this.state.timeBetweenMovement);
            }
        } else {
            this.state.isDirectionLeft = true;
        }
    }

    render() {
        return (
            <div>
                {this.alienRenderer().map((component, index) => (
                    <React.Fragment key={index}>
                        {component}
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
                style={{
                    top: this.props.distanceToTop,
                    left: this.props.distanceToLeft,
                }}
            />
        )
    }
}
