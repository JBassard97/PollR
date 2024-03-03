import Auth from "../../utils/auth";

export default function Home() {
  return (
    <>
      {Auth.loggedIn() ? (
        <>
          <h1>You're logged in stud!</h1>
        </>
      ) : (
        <>
          <h1>Nah not logged in bud...</h1>
        </>
      )}
    </>
  );
}
