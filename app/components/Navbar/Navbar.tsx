import React from 'react';
import { Nav, Navbar as BSNavbar, NavbarBrand, NavLink } from 'react-bootstrap';
import { BsFillHouseDoorFill } from 'react-icons/bs';

/**
 * General navbar for each page. Allows to render page specific elements
 */
class Navbar extends React.Component
{
    /**
     * Renders the navbar
     */
    render() {
        return (
            <BSNavbar bg="dark" variant="dark" expand="sm">
                <NavbarBrand href="/"><BsFillHouseDoorFill className="text-primary" style={{
                    fontSize: '2rem'
                }} /></NavbarBrand>
                <Nav className="mr-auto">
                    <NavLink href="/fight">Kampf</NavLink>
                </Nav>
                <Nav>
                    {this.props.children}
                </Nav>
            </BSNavbar>
        )
    }
}

export default Navbar;
