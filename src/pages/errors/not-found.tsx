import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-12">
          <div className="d-flex justify-content-center">
            <div className="mt-5">
              <h3>Sorry, this page isn't available.</h3>
              <p>
                <span>The link you followed may be broken. </span>
                <Link to="/" className="text-decoration-none">Go back.</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
