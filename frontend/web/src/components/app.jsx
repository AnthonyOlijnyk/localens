import React, { Component } from 'react';
import Headers from "./common/headers";
import Footers from "./common/footers";
import { Outlet } from 'react-router-dom';

class Layout extends Component {
    render() {
        return (
            <>
                <Headers />
                <Outlet />  {/* Nested routes will be rendered here */}
                <Footers />
            </>
        );
    }
}

export default Layout;
