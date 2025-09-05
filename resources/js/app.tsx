import "../css/app.css";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
// import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
// import { ThemeProvider, useTheme } from './hooks/use-theme';
// import CssBaseline from '@mui/material/CssBaseline';
import { initializeTheme } from "./hooks/use-appearance";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  resolve: async (name) => {
    const page = await resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob("./pages/**/*.tsx"),
    );
    // @ts-expect-error - layout is a custom property
    page.default.layout = page.default.layout || ((page) => page);
    return page;
  },
  setup({ el, App, props }) {
    const root = createRoot(el);

    // Komponen wrapper untuk mengakses hook useTheme
    // const AppWrapper = () => {
    //     const { theme } = useTheme();
    //     return (
    //         <MuiThemeProvider theme={theme}>
    //             <CssBaseline />
    //             <App {...props} />
    //         </MuiThemeProvider>
    //     );
    // };

    root.render(
      // <ThemeProvider>
      //     <AppWrapper />
      // </ThemeProvider>,
      <App {...props} />,
    );
  },
  progress: {
    color: "#4B5563",
  },
});

initializeTheme();
