import Routes from "./routes/routes";

import "./styles/global.css";

import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <UserProvider>
      <div className="w-screen min-h-screen flex justify-center font-manRope bg-slate-50">
        <Routes />
      </div>
    </UserProvider>
  );
}

export default App;
