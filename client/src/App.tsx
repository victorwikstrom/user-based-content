import AppTheme from "./theming/AppTheme";
import Container from "./components/Container";
import Router from "./navigation/Router";

function App() {
  return (
    <AppTheme>
      <Container>
        <Router />
      </Container>
    </AppTheme>
  );
}

export default App;
