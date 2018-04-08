function prepChecklist(){
    // Function to create a basic checklist. It returns a checklist with 4 items.
    const what = ['Teethbrush', 'Soap', 'Bandages', 'Hairdryer'];
    let checklist = [];
    what.forEach((el) => {
        checklist.push({name: el, value: false})
    });
    //build a second checklist from the first one and remove 'Teethbrush'
    const secChecklist = checklist.filter((item) => {return item.name !== 'Teethbrush'});


    return [
        {name: '1st checklist', checklist: checklist},
        {name: '2nd checklist', checklist: secChecklist}
    ];
}

export default prepChecklist