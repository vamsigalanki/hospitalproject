import React from "react";
import { Link, Outlet } from "react-router-dom";

function AdminDashbord(){
    
    return(<div><h1>Admin Block</h1>
                 <div>
                     <Link to="add">
                     <button className="btn btn-success">+add Hospital</button></Link>
                    <Link to="bed"> <button className="btn btn-success">+add Beds</button></Link>
                     <Outlet></Outlet>
                 </div>
                 </div>
)
}
export default AdminDashbord;