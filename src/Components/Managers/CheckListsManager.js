import React from 'react'
import CheckList from './../CheckList'


class CheckListManager extends React.Component {
    constructor(props){
        super(props);

        this.selectChecklist = this.selectChecklist.bind(this);

        const checklists = this.props.checklists;

        this.state = {checklists: checklists, selected: null};
    }

    selectChecklist(event){
        const newSelectedChecklist = this.state.checklists[event.target.value];
        this.setState({selected: newSelectedChecklist});
    }

    render(){
        const checklists = this.state.checklists;
        return(
            <div>
                <h1>Checklists</h1>
                <div>
                    {checklists.map((checklist, index) => {
                        return <label key={index}>
                            <input type="radio"
                                   onChange={this.selectChecklist}
                                   value={index}
                                   checked={this.state.selected ? this.state.selected.name === checklist.name : false}/>
                            {checklist.name}</label>
                    })}
                </div>
                <div>

                    {this.state.selected ? (
                            <CheckList name={this.state.selected.name} checklist={this.state.selected.checklist}/>
                        ): (
                            <h2>No checklist selected</h2>
                        )}
                </div>
            </div>
        )
    }
}

export default CheckListManager