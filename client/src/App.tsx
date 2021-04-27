import LoggedInProvider from "./context/LoggedInContext";
import Container from "./components/Container";
import AppTheme from "./theming/AppTheme";
import Router from "./navigation/Router";

function App() {
  return (
    <LoggedInProvider>
      <Container>
        <AppTheme>
          <Router />
        </AppTheme>
      </Container>
    </LoggedInProvider>
  );
}

export default App;
