import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="container-flow">
      <ul className="row mt-3">
        <li className="col" style={{"listStyleType": "none"}}>
          <Link to="/">Home</Link>
        </li>
        <li className="col" style={{"listStyleType": "none"}}>
          <Link to="/profile">Profile</Link>
        </li>
        <li className="col" style={{"listStyleType": "none"}}>
          <Link to="/paintings">Paintings</Link>
        </li>
        <li className="col" style={{"listStyleType": "none"}}>
          <Link to="/paintings/add">New Painting</Link>
        </li>
      </ul>
    </div>
  );
}
