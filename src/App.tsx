import "./App.css";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="min-h-screen bg-[#212122]">
      <main className="h-screen overflow-auto custom-scrollbar">
        <HomePage />
      </main>
    </div>
  );
}

export default App;
