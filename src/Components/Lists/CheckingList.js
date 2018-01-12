import React from 'react'
import SaveButton from '../Save'

class CheckingList extends React.Component{
    // Component that display a list of item with a checkbox behind each one

    // props must contain:
    // - an onSave function
    // - an onCheckboxChange function that accepts an index
    // - a checklist array of objects with at least a field called 'name'


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
                    <SaveButton name="Save list" onSave={this.props.onSave}/>
                </div>
            </div>
        )
    }
}

export default CheckingList
