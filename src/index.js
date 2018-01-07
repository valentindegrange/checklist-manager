import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import CheckingList from './Components/Lists/CheckingList'
import EditionList from './Components/Lists/EditionList'


function prepChecklist(){
    // Function to create a basic checklist. It returns a checklist with 4 items.
    const what = ['Teethbrush', 'Soap', 'Bandages', 'Hairdryer'];
    let checklist = [];
    what.forEach((el) => {
        checklist.push({name: el, value: false})
    });

    return checklist;
}

class CheckListManager extends React.Component{
    // Component to manage a check list
    constructor(props){
        super(props);
        //function binding
        this.handleChangeChecklist = this.handleChangeChecklist.bind(this);
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
        this.handleEditModeChange = this.handleEditModeChange.bind(this);
        this.handleSave = this.handleSave.bind(this);

        const checklist = prepChecklist();

        //state setting
        this.state = {checklist: checklist, editMode: false}
    }

    handleChangeChecklist(newChecklist){
        // Update current checklist with {newChecklist} passed as param
        // It set state params saved & editMode at false
        this.setState({checklist: newChecklist, saved: false, editMode: false})
    }

    handleChangeCheckbox(index) {
        // Update the {value} (to !value) of state.checklist item at index {index}
        // It also set state.saved value to false
        this.setState({checklist: this.state.checklist.map((i, _index) => {
            if (_index !== index) return i;
            return {...i, value: !i.value};
        }), saved: false})
    }

    handleSave(){
        // Save the modifications
        // It only changes state.saved value to true
        this.setState({saved: true})
    }

    handleEditModeChange(){
        // Change state.editMode value & set state.saved value to false
        this.setState({editMode: !this.state.editMode, saved: false})
    }

    render(){
        const checklist = this.state.checklist;
        const saved = this.state.saved;
        const editMode = this.state.editMode;

        let currentList = null;

        // check edit mode & display an EditionList Component or a CheckingList Component
        if (editMode){
            currentList = <EditionList onChange={this.handleChangeChecklist} checklist={checklist}/>
        } else {
            currentList = <CheckingList onSave={this.handleSave} onCheckboxChange={this.handleChangeCheckbox} checklist={checklist}/>
        }

        // Display everything :
        // title, the current state for checklist, if it has been saved
        // the list (in edition or displayed)
        return (
            <div>
                <h2> Plain checklist</h2>
                <div>
                    {checklist.map((item, key) => {
                        return (<span key={key}> {item.name}: {item.value? 'true': 'false'},</span>)
                    })}
                    <p>{saved ? (<span>Saved !</span>): (<span>Modifications not saved</span>)}</p>
                </div>
                {editMode ?
                    (<h3>Edition of the checklist</h3>):
                    (<button type="button" onClick={this.handleEditModeChange}>Edit checklist</button> )}
                {currentList}

            </div>
        )
    }
}



ReactDOM.render(
    <CheckListManager/>,
    document.getElementById('root')
);