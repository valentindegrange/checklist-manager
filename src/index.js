import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'


function prepChecklist(){
    const what = ['Teethbrush', 'Soap', 'Bandages', 'Hairdryer'];
    let checklist = [];
    what.forEach((el) => {
        checklist.push({name: el, value: false})
    });

    return checklist;
}

class MomList extends React.Component{
    constructor(props){
        super(props);
        this.handleChangeChecklist = this.handleChangeChecklist.bind(this);
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
        this.handleEditModeChange = this.handleEditModeChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        const checklist = prepChecklist();
        this.state = {checklist: checklist, editMode: false}
    }

    handleChangeChecklist(newChecklist, event){
        this.setState({checklist: newChecklist, saved: false, editMode: false})
    }

    handleChangeCheckbox(index, event) {
        this.setState({checklist: this.state.checklist.map((i, _index) => {
            if (_index !== index) return i;
            return {...i, value: !i.value};
        }), saved: false})
    }

    handleSave(){
        this.setState({saved: true})
    }

    handleEditModeChange(){
        this.setState({editMode: !this.state.editMode})
    }

    render(){
        const checklist = this.state.checklist;
        const saved = this.state.saved;
        const editMode = this.state.editMode;
        let currentList = null;
        if (editMode){
            currentList = <UnstylisedList onChange={this.handleChangeChecklist} checklist={checklist}/>
        } else {
            currentList = <StaticList onSave={this.handleSave} onCheckboxChange={this.handleChangeCheckbox} checklist={checklist}/>
        }
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


class UnstylisedList extends React.Component{

    constructor(props){
        super(props);
        this.handleChangeChecklist = this.handleChangeChecklist.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
        this.handleSaveList = this.handleSaveList.bind(this);
        this.handleResetList = this.handleResetList.bind(this);
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
        const checklist = props.checklist;
        this.state = {checklist: checklist}
    }

    handleChangeChecklist() {
        this.props.onChange(this.state.checklist);
    }

    handleChangeName(index, event){
        this.setState({checklist: this.state.checklist.map((i, _index) => {
                if (_index !== index) return i;
                return {...i, name: event.target.value}
            })}
        )
    }

    handleRemoveItem(index, event){
        this.setState({checklist: this.state.checklist.filter((i, _index) => _index !== index)})
    }

    handleAddItem(){
        this.setState({checklist: this.state.checklist.concat([{name:'', value: false}])})
    }

    handleSaveList(){
        this.props.onChange(this.state.checklist);
    }

    handleResetList(){
        this.setState({checklist: this.props.checklist});
    }

    render(){
        const checklist = this.state.checklist;

        return (
            <div>
                <h2> Ugly list </h2>
                <div>
                    <ul>
                        {
                            checklist.map((item, index) =>{
                                return (
                                    <li key={index}>
                                        <input type="text" value={item.name} onChange={(e) => this.handleChangeName(index, e)}/>
                                        <button type="button" onClick={(e) => this.handleRemoveItem(index, e)}>Remove</button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <button type="button" onClick={this.handleAddItem}>Add</button>
                </div>
                <div>
                    <button type="button" onClick={this.handleResetList}>Reset</button>
                    <button type="button" onClick={(e) => this.props.onChange(checklist, e)}>Save changes</button>
                </div>
            </div>
        )
    }
}

class StaticList extends React.Component{

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
                                    <label><input type="checkbox" checked={item.value} onChange={(e) => this.props.onCheckboxChange(index, e)}/> {item.name}</label>
                                </li>
                            )
                        })}
                    </ul>
                    <button type="button" onClick={(e) => this.props.onSave(e)}>Save</button>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <MomList/>,
    document.getElementById('nester')
);