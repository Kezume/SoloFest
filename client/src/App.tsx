import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes/routes";

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <RouterProvider router={router} />
      </div>
    </div>
  );
};

export default App;
