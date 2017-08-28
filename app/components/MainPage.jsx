import React from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import NavigationBar from './NavigationBar'
import AllCampuses from './AllCampuses'
import SingleCampus from './SingleCampus'
import AllStudents from './AllStudents'
import SingleStudent from './SingleStudent'
import NewCampus from './NewCampus'
import NewStudent from './NewStudent'

export default () => {

  return (
        <Router>
        <div>
          <NavigationBar />
        <div id="main" className="container-fluid">
          <div className="col-xs-12">
            <Switch>
              <Route exact path="/campuses" component={AllCampuses} />
              <Route path="/campuses/:campusId" component={SingleCampus} />
              <Route exact path="/students" component={AllStudents} />
              <Route path="/students/:studentId" component={SingleStudent} />
              <Route path="campuses/new-campus" component={NewCampus} />
              <Route path="students/new-student" component={NewStudent} />
              <Route component={AllCampuses} />
            </Switch>
          </div>
        </div>
        </div>
      </Router>
  )
}
