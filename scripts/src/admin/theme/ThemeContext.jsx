/**
 * Colormod context provider
 */

import React, { createContext, useMemo, useState, useEffect, useContext } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { getTheme } from './theme.js';

/**
 * Create colormod context
 */
export const ColorModeContext = createContext({
    setColor: () => {},
});

/**
 * Create colormod provider
 */
export const ColorModeProvider = ({ children }) => {
    
    // Store multiple colors
    const [ customColors, setCustomColors ] = useState({});

    /**
     * Colormode toggle function
     */
    const colorMode = useMemo(
        () => ({
            setColor: ({ key, value }) =>
                setCustomColors((prev) => ({ ...prev, [key]: value })),
        }),
        []
    );

    /**
     * Get the mui theme
     */
    const theme = useMemo(() => getTheme(customColors), [customColors]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorModeContext.Provider>
    );
};
