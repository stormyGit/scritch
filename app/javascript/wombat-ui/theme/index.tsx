import React, { useMemo } from 'react'

import { Theme } from '../types/Theme'

import ScritchTheme from './Scritch.theme'

const defaultTheme = {
    theme: ScritchTheme,
    setTheme: (_: Theme) => {},
}

export const ThemeContext = React.createContext(defaultTheme)

export function useWombatTheme() {
    return React.useContext(ThemeContext)
}

type WombatThemeProviderProps = {
    theme?: Theme
}

const WombatThemeProvider: React.FC<WombatThemeProviderProps> = ({
    theme: initialTheme,
    children,
}) => {
    const [theme, setTheme] = React.useState<Theme>(initialTheme || ScritchTheme)

    const value = useMemo(() => ({ theme, setTheme }), [theme])
    console.log(theme)

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default WombatThemeProvider
