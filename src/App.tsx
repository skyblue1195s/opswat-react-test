import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Main, Auth } from "@layouts/index";
import { main, auth } from "@routes/index";

const App = () => {
  return (
    <Routes>
      <Route element={<Auth />}>
        {auth.map((item: any, key: any) => (
          <Route key={key} path={item.path} element={item.component} />
        ))}
      </Route>

      <Route element={<Main />}>
        {main.map((item: any, key: any) => (
          <Route key={key} path={item.path} element={item.component} />
        ))}
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
