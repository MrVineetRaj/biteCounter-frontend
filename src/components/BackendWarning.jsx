const BackendWarning = () => {
  return (
    <>
      <div className="alert alert-warning" role="alert">
        As I am using a free backend server ( powered by render.com ) so in free
        teir they shutdown the server if Server is inactive for 15 min So kindly
        wait for <b>8 - 10 min</b> after clicking on Login or Sign-up button
      </div>
      <div className="alert alert-success" role="alert">
        for now you can use any random email for testing for e.g i stored{" "}
        <b>abc@gmail.com and password Red12345!</b> so you can run using this or
        you can create new one to
      </div>
    </>
  );
};
export default BackendWarning;
