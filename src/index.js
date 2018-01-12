import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Loadable from  'react-loadable'


function prepChecklist(){
    // Function to create a basic checklist. It returns a checklist with 4 items.
    const what = ['Teethbrush', 'Soap', 'Bandages', 'Hairdryer'];
    let checklist = [];
    what.forEach((el) => {
        checklist.push({name: el, value: false})
    });

    return [{name: '1st checklist', checklist: checklist}];
}

// Loading Checklist Component with Loadable
const LoadableCheckList = Loadable({
    loader: () => import('./Components/CheckList'),
    loading: ()=><div>Loading ...</div>,
    delay: 3000,
});


class CheckListManager extends React.Component {
    constructor(props){
        super(props);

        const checklists = this.props.checklists;

        this.state = {checklists: checklists};
    }

    render(){
        const checklists = this.state.checklists;
        return(
            <div>
                <h1>Checklists</h1>
                {checklists.map((checklist, index)=>{
                    return <div key={index}>
                        <LoadableCheckList  name={checklist.name} checklist={checklist.checklist}/>
                    </div>
                })}
            </div>
        )
    }
}


ReactDOM.render(
    <CheckListManager checklists={prepChecklist()}/>,
    document.getElementById('root')
);