import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import prepChecklist from './../../utils/checklist'
import Checklist from './../CheckList'

// const checklists = prepChecklist();

const Checklist_1 = () => (
    <Checklist name={prepChecklist()[0].name} checklist={prepChecklist()[0].checklist}/>

);

const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
);

const About = () => (
    <div>
        <h2>About</h2>
    </div>
);



const Rourou = () => (
    <Router>
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">List</Link></li>
            </ul>
            <hr/>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={Checklist_1}/>
        </div>
    </Router>
);

export default Rourou