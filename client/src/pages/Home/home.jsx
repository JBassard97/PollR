import Auth from "../../utils/auth";
import Poll from "../../components/Poll";

export default function Home() {
  return (
    <>
      {Auth.loggedIn() ? (
        <>
        <main className="container" style={{ color: "white"}}>
          <h1>Welcome to PollR!</h1>
          <div className ="row">
            <div className="col-4 m-5">
              <Poll />
              <Poll />
            </div>
            <div className="col-4 m-5">
              <Poll />
              <Poll />
            </div>
          </div>
        </main>
       
        </>
      ) : (
        <>
        <main className="container" style={{ color: "white", height: 500}}>
          <h3>To access all PollR has to offer, please Log-in or Sign-up!</h3>
        </main>  
        </>
      )}
    </>
  );
}
