import { createContext, useContext, useMemo, useState, type ReactNode, useEffect, useCallback } from 'react';
import { createTheme, type Theme } from '@mui/material/styles';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
    toggleTheme: () => void;
    theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [mode, setMode] = useState<ThemeMode>(() => {
        if (typeof window === 'undefined') return 'system';
        const storedTheme = localStorage.getItem('theme') as ThemeMode;
        return ['light', 'dark', 'system'].includes(storedTheme) ? storedTheme : 'system';
    });

    const setModeState = useCallback((newMode: ThemeMode) => { // Renamed to setMode for consistency
        localStorage.setItem('theme', newMode);
        setMode(newMode);
    }, []);

    const toggleTheme = () => {
        // This is a simple toggle, you might want more complex logic
        // if you want to cycle through light -> dark -> system
        const resolvedMode = mode === 'system'
            ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
            : mode;

        setModeState(resolvedMode === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            // Only trigger re-render if mode is 'system'
            if (mode === 'system') {
                setModeState('system'); // Force re-evaluation of theme
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [mode]);

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: (() => {
                        if (mode === 'system') {
                            if (typeof window !== 'undefined') {
                                return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                            }
                            return 'light'; // Default for SSR
                        }
                        return mode;
                    })(),
                },
            }),
        [mode],
    );

    return (
        <ThemeContext.Provider value={{ mode, setMode: setModeState, toggleTheme, theme }}>
            {/* The key forces a re-render of children when the effective mode changes, which is useful for system theme changes */}
            <div key={theme.palette.mode}>{children}</div>
        </ThemeContext.Provider>
    );
}

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
