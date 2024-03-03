export default function SignedIn({ userEmail }: { userEmail: string }) {
  return (
    <div>
      <div className="landing-background"></div>
      <div className="ml-60 pt-72 ">
        <h1 className="text-6xl">Welcome {userEmail}</h1>
        <p className="text-4xl mt-10">
          hello and welcome to the paddy form app.
        </p>
        <p className="text-3xl mt-2">
          Click a link in the top right to get started
        </p>
      </div>
    </div>
  );
}
