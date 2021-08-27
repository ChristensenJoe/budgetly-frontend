import { Switch, Route } from 'react-router-dom'

import Dashboard from "./Dashboard";
import Category from "./Category";
import Transactions from "./Transactions";
import CreateCategory from "./CreateCategory";
import CreateTransaction from "./CreateTransaction";

function UserRoutes({ userData, setUser }) {
    return (
        <Switch>
            <Route exact path="/:user/transactions">
                <Transactions
                    userData={userData}
                    setUser={setUser}
                />
            </Route>
            <Route exact path="/:user/create-category">
                <CreateCategory 
                    userData={userData}
                />
            </Route>
            <Route exact path="/:user/create-transaction">
                <CreateTransaction 
                    userData={userData}
                    setUser={setUser}
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