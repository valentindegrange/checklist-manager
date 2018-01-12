import React from 'react'

class SaveButton extends React.Component{

    constructor(props){
        super(props);

        const name = this.props.name;
        this.state = {name: name};
    }

    render(){
        const item = this.props.item;
        const name = this.state.name;
        return (
            <div>
                <button type="button" onClick={(e) => this.props.onSave(item)}>{name}</button>
            </div>
        )
    }
}

export default SaveButton