import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import withCurrentSession from '../components/withCurrentSession'
import { resolveUserType } from '../util/userCategory'
import { HomeScreen } from '../screens/HomeScreen'
import { ScreenBase } from '../screens/ScreenBase'

export const AppRouter = (props) => {
    const { currentSession, width } = props
    const userType = resolveUserType(currentSession)

    return (
        <BrowserRouter>
            <Switch location={location}>
                <ScreenBase>
                    <Route exact path='/'>
                        <HomeScreen />
                    </Route>
                </ScreenBase>
            </Switch>
        </BrowserRouter>
    )
}

export default withCurrentSession(AppRouter)
