import "@mantine/core/styles.css";
import "@styles/App.css";

import { MantineProvider } from "@mantine/core";
import { MantineTheme } from "./theme";

import Info from "@components/Header/Information";


function App() {
    return (
        <MantineProvider defaultColorScheme="dark" theme={MantineTheme}>
            <Info />
        </MantineProvider>
    );
}

export default App;
