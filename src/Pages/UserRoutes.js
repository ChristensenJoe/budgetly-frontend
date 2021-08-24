import {useParams, Switch, Route} from 'react-router-dom'

import Dashboard from "./Dashboard";

function UserRoutes({userData, setUser}) {
    const {user} = useParams()


    return (
        <Switch>
            <Route path="/:user/:thing">
            </Route>
            <Route exact path="/:user">
                <Dashboard 
                    userData={userData}
                    setUser={setUser}
                />
            </Route>
            
        </Switch>
    );
}

export default UserRoutes;