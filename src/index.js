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

    return {name: '1st checklist', checklist: checklist};
}

// Loading Checklist Component with Loadable
const LoadableCheckList = Loadable({
    loader: () => import('./Components/CheckList'),
    loading: ()=><div>Loading ...</div>,
    delay: 3000,
});



ReactDOM.render(
    <LoadableCheckList name={prepChecklist().name} checklist={prepChecklist().checklist}/>,
    document.getElementById('root')
);