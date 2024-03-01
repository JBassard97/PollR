import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../App.css'

function Nav() {
    const currentPage = useLocation().pathname;

    return (
      <header className="container-fluid header mt-3" style={{ marginBottom: 25 }}>
        <div>
                <h1>PollR</h1>
        </div>
        <div className ="row" >
            <nav className="nav navbar nav-pills col-md justify-content-end">
                <ul className="nav-item">
                    <Link 
                        to="/"
                        className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
                    >
                        Home
                    </Link>
                </ul>
                <ul className="nav-item">
                    <Link 
                        to="/createPoll"
                        className={currentPage === '/createPoll' ? 'nav-link active' : 'nav-link'}
                          
                    >
                        Create Poll
                    </Link>
                </ul>
                <ul className="nav-item">
                    <Link 
                        to="/userSettings"
                        className={currentPage === '/userSettings' ? 'nav-link active' : 'nav-link'}
                    >
                        User Settings
                      </Link>
                </ul >
                <ul className="nav-item">
                    <Link 
                        to="/userProfile"
                        className={currentPage === '/userProfile' ? 'nav-link active' : 'nav-link'}
                    >
                        User Profile
                    </Link>
                </ul>
                <ul className="nav-item">
                    <Link 
                        to="/login"
                        className={currentPage === '/login' ? 'nav-link active' : 'nav-link'}
                          
                    >
                        Log In
                    </Link>
                </ul>
            </nav>
        </div>    
      </header>
  )
}

export default Nav;