import { useParams, Switch, Route } from 'react-router-dom'

import Dashboard from "./Dashboard";
import Category from "./Category";
import Transactions from "./Transactions";
import CreateCategory from "./CreateCategory";

function UserRoutes({ userData, setUser }) {
    //const {user} = useParams()
    return (
        <Switch>
            <Route exact path="/:user/transactions">
                <Transactions
                    userData={userData}
                />
            </Route>
            <Route exact path="/:user/create-category">
                <CreateCategory 
                    userData={userData}
                />
            </Route>
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