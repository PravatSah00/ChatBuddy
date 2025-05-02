/**
 * Define theme
 */
import { createTheme } from '@mui/material/styles';

// Get MUI's default theme for fallback values
const defaultTheme = createTheme();

/**
 * Get MUI theme
 */
export const getTheme = (customColor = {}) => {

    return createTheme({
        /**
         * Color palet
         */
        palette: {
            primary: {
                main: customColor.primary ?? defaultTheme.palette.primary.main,
            },
            background: {
                default: customColor.background ?? defaultTheme.palette.background.default,
                paper:   customColor.paper ?? defaultTheme.palette.background.paper,
            },
        },
    });
}
