import React from "react";
import SideMenu from "./SideMenu";

const AdminLayout = ({children}) => {
    const menuItem = [
        {
            name:"Dashboard",
            url:"/admin/dashboard",
            icon: "fas fa-tachometer-alt",
        },
        {
            name:"New Product",
            url:"/admin/product/new",
            icon: "fas fa-plus",
        },
        {
            name:"Products",
            url:"/admin/products",
            icon: "fas fa-product-hunt",
        },
        {
            name:"Orders",
            url:"/admin/orders",
            icon: "fas fa-receipt",
        },
        {
            name:"User",
            url:"/admin/users",
            icon: "fas fa-user",
        },
        {
            name:"Reviews",
            url:"/admin/reviews",
            icon: "fas fa-star",
        },
    ];
    return (
        <div>
            <div className="mt-2 mb-4 py-4"> 
                <h2 className="text-center fw-border">Admin Dashboard</h2>
            </div>
                <div className="row justify-content-around">
                    <div className="col-12 col-lg-3">
                        <SideMenu menuItem={menuItem}></SideMenu>
                    </div>
                    <div className="col-12 col-lg-8 user-dashboadr">{children}</div>
                </div>
            </div>
    );
};

export default AdminLayout