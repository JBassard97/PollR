import GithubLogo from "../../assets/github-logo.png";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <nav className="navbar justify-content-center">
        <div style={{ color: "white" }}>
          <h3>PollR Devs:</h3>
        </div>
        <ul>
          <li>
            <a href="">
              <img src={GithubLogo} className="logo" alt="" />
            </a>
          </li>
          <li>
            <a href="">
              <img src={GithubLogo} className="logo" alt="" />
            </a>
          </li>
          <li>
            <a href="">
              <img src={GithubLogo} className="logo" alt="" />
            </a>
          </li>
          <li>
            <a href="">
              <img src={GithubLogo} className="logo" alt="" />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
