import React from "react";
import SideMenu from "./SideMenu";

const UserLayout = ({children}) => {
    const menuItem = [
        {
            name:"Profile",
            url:"/me/profile",
            icon: "fas fa-user",
        },
        {
            name:"Update Profile",
            url:"/me/update_profile",
            icon: "fas fa-user",
        },
        {
            name:"Update Password",
            url:"/me/update_password",
            icon: "fas fa-lock",
        },
    ];
    return (
        <div>
            <div className="mt-2 mb-4 py-4"> 
                <h2 className="text-center fw-border">User Settings</h2>
            </div>
            <div className="container">
                <div className="row justify-content-around">
                    <div className="col-12 col-lg-3">
                        <SideMenu menuItem={menuItem}></SideMenu>
                    </div>
                    <div className="col-12 col-lg-8 user-dashboadr">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default UserLayout