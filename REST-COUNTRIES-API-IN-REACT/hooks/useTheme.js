import { useContext } from "react";
import { ThemeContext } from "../contexts/Theme.Context";

 export const useTheme=()=> useContext(ThemeContext);