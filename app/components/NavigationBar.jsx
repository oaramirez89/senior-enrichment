import React from 'react';
import { Link } from 'react-router-dom';

export default () => {

  return (
    <div>
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <img src="university-building.svg" className="logo" />
          <Link className="navbar-brand" to="/"></Link>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li><Link to="/campuses">Campuses</Link></li>
            <li><Link to="/students">Students</Link></li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
