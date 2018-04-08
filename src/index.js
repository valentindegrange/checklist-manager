import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import prepChecklist from './utils/checklist'
import Checklist from './Components/CheckList'

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
);

const checklists = prepChecklist();

const Checklists = ({match}) => ( <div>
        <h2>Checklists</h2>
        <ul>
            {checklists.map((checklist, index)=>{
                return <li key={index}>
                    <Link  to={`${match.url}/${index}`}>
                        {checklist.name}
                    </Link>
                </li>
            })}
        </ul>

        <Route path={`${match.url}/:id`} component={List}/>
        <Route exact path={match.url} render={() => (
            <h3>Please select a list.</h3>
        )}/>
    </div>
);

const List = ({ match }) => (
    <div>
            <Checklist name={checklists[match.params.id].name} checklist={checklists[match.params.id].checklist}/>

    </div>
);

const Rourou = () => (
    <Router>
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/lists">Checklists</Link></li>
            </ul>
            <hr/>
            <Route exact path="/" component={Home}/>
            <Route path="/lists" component={Checklists}/>
        </div>
    </Router>
);

ReactDOM.render(
    <Rourou/>,
    document.getElementById('root')
);