import React from 'react'
import SaveButton from '../Save'

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
        this.handleSave = this.handleSave.bind(this);

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

    handleSave(checklist){
        this.props.onChange(checklist);
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
                    <SaveButton name="Save changes" onSave={this.handleSave} item={checklist}/>
                </div>
            </div>
        )
    }
}

export default EditionList