import { AppProvider } from "./context/AppContext";
import { Routes } from "./navigation/Routes";

function App() {
  return (
    <>
      <AppProvider>
        <Routes />
      </AppProvider>
    </>
  );
}

export default App;
