import { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext"

export default function useTheme() {
    let context = useContext(ThemeContext);
    if (context == undefined) {
        new Err('Theme Context should only be used in ThemeContextProvider')
    }
    return context;
}