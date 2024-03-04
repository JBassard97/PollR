import Auth from "../../utils/auth";

export default function Home() {
  return (
    <>
      {Auth.loggedIn() ? (
        <>
        <div className="container" style={{ color: "white", height: 500}}>
          <h1>Welcome to PollR!</h1>
        </div>
        </>
      ) : (
        <>
        <div className="container" style={{ color: "white", height: 500}}>
          <h3>To access all PollR has to offer, please Log-in or Sign-up!</h3>
        </div>  
        </>
      )}
    </>
  );
}
