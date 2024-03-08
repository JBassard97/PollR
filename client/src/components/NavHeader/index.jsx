import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import Auth from "../../utils/auth";
import pollRLogo from "../../assets/PollR-logo-Color.png";
import "./header.css"

function Nav() {
  const currentPage = useLocation().pathname;

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="container-fluid header mt-3">
      <div className="row">
        <h1 className="col-md-3 d-flex align-items-center">
          <Link
            to="/"
            className={currentPage === "/" ? "nav-link active" : "nav-link"}
          >
            <img src={pollRLogo} className="pollRLogo" alt="siteLogo"></img>
          </Link>
        </h1>
        <nav className="nav navbar nav-pills col-md-9 justify-content-end">
          {Auth.loggedIn() && (
            <>
              <ul className="nav-item">
                <Link
                  to="/createPoll"
                  className={
                    currentPage === "/createPoll"
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  Create Poll
                </Link>
              </ul>
              <ul className="nav-item">
                <Link
                  to="/userProfile"
                  className={
                    currentPage === "/userProfile"
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  My Profile
                </Link>
              </ul>
              <ul className="nav-item">
                <Link
                  to="/userSettings"
                  className={
                    currentPage === "/userSettings"
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  Settings
                </Link>
              </ul>
            </>
          )}
          {Auth.loggedIn() ? (
            <>
              <ul className="nav-item">
                <Link
                  to="/"
                  onClick={logout}
                  className={
                    currentPage === "" ? "nav-link active" : "nav-link"
                  }
                >
                  Log Out
                </Link>
              </ul>
            </>
          ) : (
            <>
              <ul className="nav-item">
                <Link
                  to="/login"
                  className={
                    currentPage === "/login" ? "nav-link active" : "nav-link"
                  }
                >
                  Log In
                </Link>
              </ul>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Nav;
