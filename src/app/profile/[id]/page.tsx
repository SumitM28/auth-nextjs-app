const userProfile = ({ params }: any) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1 className="text-2xl">User Profile</h1>
      <br />
      <p className="text-4xl ">User Profile Id: {params.id}</p>
    </div>
  );
};

export default userProfile;
