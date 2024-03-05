import GithubLogo from "../../assets/github-logo.png";
import "./footer.css";

function Footer() {
    return (
        <footer className="container-fluid">
        <div className ="row">
            <nav className="navbar col justify-content-center">
                <div style={{ color: "white"}}>
                    <h3>PollR Devs:</h3>
                </div>
                <ul>
                    <label>1</label>
                    <a href="">
                    <img src={GithubLogo} className="logo" alt=""/>
                    </a>
                    
                </ul>
                <ul>
                    <label>2</label>
                    <a href="">
                    <img src={GithubLogo} className="logo" alt=""/>
                    </a>
                </ul>
                <ul>
                    <label>3</label>
                    <a href="">
                    <img src={GithubLogo} className="logo" alt=""/>
                    </a>
                </ul>
                <ul>
                    <label>4</label>
                    <a href="">
                    <img src={GithubLogo} className="logo" alt=""/>
                    </a>
                </ul>
            </nav>
        </div>    
    </footer>
    )
};

export default Footer;