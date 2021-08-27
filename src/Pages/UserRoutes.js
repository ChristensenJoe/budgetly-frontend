import { Switch, Route } from 'react-router-dom'

import { useState, useEffect } from 'react'

import Dashboard from "./Dashboard";
import Category from "./Category";
import Transactions from "./Transactions";
import CreateCategory from "./CreateCategory";
import CreateTransaction from "./CreateTransaction";
import NavBar from "../Components/NavBar/NavBar";

function UserRoutes({ userData, setUser }) {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:9292/categories?user_id=${userData.id}`)
            .then(res => res.json())
            .then(setCategories);
    }, [userData.id])

    return (
        <>
            <NavBar
                userData={userData}
                categories={categories}
            />
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
                        setCategories={setCategories}
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
                        setUser={setUser}
                    />
                </Route>
                <Route exact path="/:user">
                    <Dashboard
                        userData={userData}
                        setUser={setUser}
                    />
                </Route>

            </Switch>
        </>
    );
}

export default UserRoutes;