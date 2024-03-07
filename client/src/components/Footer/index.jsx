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
            <a href="">
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
