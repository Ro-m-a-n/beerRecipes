import { Navbar } from "./components/navbar/navbar";
import { Recipes } from "./components/recipes/recipes";
import "./scss/main/main.css";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Recipes />
    </div>
  );
};

export default App;
