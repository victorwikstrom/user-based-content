import AppTheme from "./theming/AppTheme";
import Container from "./components/Container";
import Router from "./navigation/Router";
import LoggedInProvider from "./context/LoggedInContext";

function App() {
  return (
    <LoggedInProvider>
      <AppTheme>
        <Container>
          <Router />
        </Container>
      </AppTheme>
    </LoggedInProvider>
  );
}

export default App;
