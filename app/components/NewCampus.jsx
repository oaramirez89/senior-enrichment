import React from 'react';

export default (props) => {
 return (
  <form className="form-horizontal">
  <fieldset>
    <legend>New Campus</legend>
    <div className="form-group">
      <label htmlFor="inputName" className="col-lg-1 control-label">Name</label>
      <div className="col-lg-11">
        <input type="text" className="form-control" id="inputName" placeholder="Name" />
      </div>
    </div>
    <div className="form-group">
      <label htmlFor="inputImage" className="col-lg-1 control-label">Logo</label>
      <div className="col-lg-11">
        <input type="text" className="form-control" id="inputImage" placeholder="Paste an image link here" />
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
