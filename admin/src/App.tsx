import "./App.css";
import { Layout, Menu } from "antd";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/layout/mainLayout";
import ReceiptForm from "./components/receiptForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <ReceiptForm onSubmit={() => {}} />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
