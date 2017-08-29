import React from 'react';

export default (props) => {
  return (
    <form className="form-horizontal">
      <fieldset>
        <legend>New Student Profile</legend>
        <div className="form-group">
          <label htmlFor="inputName" className="col-lg-1 control-label">Name</label>
          <div className="col-lg-11">
            <input type="text" className="form-control" id="inputName" placeholder="Name" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputEmail" className="col-lg-1 control-label">Email</label>
          <div className="col-lg-11">
            <input type="text" className="form-control" id="inputEmail" placeholder="Email" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="select" className="col-lg-1 control-label">Campus</label>
          <div className="col-lg-11">
            <select className="form-control" id="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <div className="col-lg-10 col-lg-offset-1">
            <button type="reset" className="btn btn-default">Cancel</button>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </fieldset>
    </form>
  )
}
