import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { FursuitListScreen } from '../screens/FursuitListScreen'
import { HomeScreen } from '../screens/HomeScreen'
import { ScreenBase } from '../screens/ScreenBase'

export const AppRouter = (props) => {
    const { currentSession, width } = props

    return (
        <BrowserRouter>
            <Switch location={location}>
                <ScreenBase>
                    <Route exact path='/'>
                        <HomeScreen />
                    </Route>
                    <Route exact path='/fursuits'>
                        <FursuitListScreen />
                    </Route>
                </ScreenBase>
            </Switch>
        </BrowserRouter>
    )
}

export default AppRouter
