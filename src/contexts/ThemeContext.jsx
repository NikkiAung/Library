import { createContext, useReducer } from "react";

const ThemeContext = createContext();

const ThemeReducer = (state, action) => {
    switch (action.type) {
        case "THEME_CHANGE":
            return {...state, theme : action.payload}
    
        default:
            return state;
    }
}

const ThemeContextProvider = ({ children }) => {
    let [state, dispatch] = useReducer(ThemeReducer, {
        theme : 'light'
    })
    const changeTheme = (theme) => {
        dispatch({type: "THEME_CHANGE" , payload: theme })
    }
    let isDark = state.theme == 'dark';
    return (
        <ThemeContext.Provider value={{ ...state, changeTheme, isDark }}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeContextProvider }