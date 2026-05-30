function Profile() {

  const userData = localStorage.getItem("user");

  let user = null;

  try {

    user = userData ? JSON.parse(userData) : null;

  }

  catch (error) {

    console.log(error);

  }

  if (!user) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center">

        <h1 className="text-3xl">
          No User Logged In
        </h1>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">

      <h1 className="text-4xl font-bold mb-4">

        Welcome {user.name}

      </h1>

      <p className="text-gray-400 mb-2">

        Email: {user.email}

      </p>

      <p className="text-gray-400">

        Role: {user.role}

      </p>

    </div>

  );

}

export default Profile;