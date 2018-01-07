import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'


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


class EditionList extends React.Component{
    // Component that allow displaying & edition of a list of item
    constructor(props){
        // props must contain:
        // - an onChange function that accepts a list of objects
        // - a checklist array of objects with at least a field called 'name'
        super(props);
        // function binding
        // it can be avoided by declaring function as follow:
        // func = () => { ... }
        // or
        // func = (param) => (event) => { ... }
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
        this.handleResetList = this.handleResetList.bind(this);
        this.handleRemoveItem = this.handleRemoveItem.bind(this);

        const checklist = props.checklist;

        //state setting
        this.state = {checklist: checklist}
    }

    handleChangeName(index, event){
        // Update state.checklist[{index}].name with event.target.value
        // event is triggered with onChange calls on input
        this.setState({checklist: this.state.checklist.map((i, _index) => {
                if (_index !== index) return i;
                return {...i, name: event.target.value}
            })}
        )
    }

    handleRemoveItem(index){
        // Remove item from state.checklist at the index {index}
        this.setState({checklist: this.state.checklist.filter((i, _index) => _index !== index)})
    }

    handleAddItem(){
        // Add an empty item into state.checklist
        this.setState({checklist: this.state.checklist.concat([{name:'', value: false}])})
    }

    handleResetList(){
        // Reset changes on list by setting state.checklist with checklist passed in props
        this.setState({checklist: this.props.checklist});
    }

    render(){
        const checklist = this.state.checklist;

        // Display the check-list as a list of input able to be modified or deleted
        // Provide an add button to add an item into the check-list
        // Provide a reset button to rollback changes
        // Provide a save button to save changes into parent Component
        return (
            <div>
                <h2> Edition of the check-list </h2>
                <div>
                    <ul>
                        {
                            checklist.map((item, index) =>{
                                return (
                                    <li key={index}>
                                        <input type="text" value={item.name} onChange={(e) => this.handleChangeName(index, e)}/>
                                        <button type="button" onClick={(e) => this.handleRemoveItem(index)}>Remove</button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <button type="button" onClick={this.handleAddItem}>Add</button>
                </div>
                <div>
                    <button type="button" onClick={this.handleResetList}>Reset</button>
                    <button type="button" onClick={(e) => this.props.onChange(checklist)}>Save changes</button>
                </div>
            </div>
        )
    }
}

class CheckingList extends React.Component{
    // Component that display a list of item with a checkbox behind each one
    constructor(props){
        // props must contain:
        // - an onSave function
        // - an onCheckboxChange function that accepts an index
        // - a checklist array of objects with at least a field called 'name'
        super(props)
    }

    // Display the check-list. Allow each item to be checked.
    // Save button 'save' the changes
    render(){
        const checklist = this.props.checklist;
        return(
            <div>
                <h2>Static list</h2>
                <div>
                    <ul>
                        {checklist.map((item, index) => {
                            return(
                                <li key={index}>
                                    <label>
                                        <input type="checkbox" checked={item.value} onChange={(e) => this.props.onCheckboxChange(index)}/>
                                        {item.value ?
                                            (<strike>{item.name}</strike>): (<span>{item.name}</span>)}
                                        </label>
                                </li>
                            )
                        })}
                    </ul>
                    <button type="button" onClick={(e) => this.props.onSave()}>Save</button>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <CheckListManager/>,
    document.getElementById('root')
);