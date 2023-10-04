import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "../node_modules/bootstrap/dist/js/bootstrap.min"
import Home from './featurres/Home/home';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AdminDashbord from './featurres/admindashbord/adddashbord';
import Addhospital from './featurres/admindashbord/addhospital';
import { Provider } from 'react-redux';
import { store } from './stores/store'
import Addbeds from './featurres/admindashbord/addbeds';
import Details from './details/details';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children:[{
      path:"/admin",
      element:<AdminDashbord></AdminDashbord>,
      children:[{
        path:"/admin/add",
      element:<Addhospital></Addhospital>
      },{
        path:"/admin/bed",
        element:<Addbeds/>
      }]
    },
    {
      path:"/detail/:id",
      element:<Details></Details>
    },
      {
        path:"",
        element:<Home></Home>,
    },
    {
      
    }
  ]
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  <RouterProvider router={router} />
 </Provider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
