import GithubLogo from "../../assets/github-logo.png";
import PollR from "../../assets/PollR-logo-Inverse.png";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer p-4 m-2">
      <nav className="navbar justify-content-center">
        <div style={{ color: "white" }}>
          <h3 className="me-4"><img src={PollR} className="poll-logo"/> Devs:</h3>
        </div>
        <ul>
          <li>
            <a href="https://github.com/JBassard97">
              <img src={GithubLogo} className="logo" alt="githubLogo" />
            </a>
            <p>Jonathan</p>
          </li>
          <li>
            <a href="https://github.com/Ant-M84">
              <img src={GithubLogo} className="logo" alt="githubLogo" />
            </a>
            <p>Anthony</p>
          </li>
          <li>
            <a href="https://github.com/Ianreynolds01">
              <img src={GithubLogo} className="logo" alt="githubLogo" />
            </a>
            <p>Ian</p>
          </li>
          <li>
            <a href="https://github.com/MLevey92">
              <img src={GithubLogo} className="logo" alt="githubLogo" />
            </a>
            <p>Mike</p>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
