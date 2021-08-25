import {useParams, Switch, Route} from 'react-router-dom'

import Dashboard from "./Dashboard";
import Category from "./Category";

function UserRoutes({userData, setUser}) {
    //const {user} = useParams()

    return (
        <Switch>
            <Route path="/:user/:category">
                <Category 
                    userData={userData}
                />
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