import React from 'react';
import { Link } from 'react-router-dom';

export default () => {

  return (
    <div className="row">
      <div className="col-lg-2 col-md-2 col-sm-3">
        <img src="university-building.svg" className="logo" />
      </div>
      <div className="col-lg-10 col-md-10 col-sm-9">
        <ul className="nav nav-pills">
          <li>
            <Link to="/campuses" >Campuses</Link>
          </li>
          <li>
            <Link to="/students" >Students</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
