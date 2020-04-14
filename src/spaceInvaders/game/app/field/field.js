import React from 'react';

export class Field extends React.Component{
    render(){
        return (
        <img className={this.props.cssClass}
            src = {this.props.image}
            style={{
                top: this.props.adjustment
            }}/>
        )
    }
}
