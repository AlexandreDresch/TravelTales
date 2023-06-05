import Routes from "./routes/routes";

import "./styles/global.css";

import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <UserProvider>
      <div className="w-screen flex justify-center font-manRope">
        <Routes />
      </div>
    </UserProvider>
  );
}

export default App;
