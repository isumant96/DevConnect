import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        
        <h1 className="text-5xl font-bold mb-6">
          Connect. Collaborate. Code.
        </h1>

        <p className="text-lg text-gray-300 max-w-2xl mb-8">
          DevConnect helps developers connect with recruiters,
          showcase projects, and collaborate in real time.
        </p>

        <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200">
          Get Started
        </button>

      </section>

      {/* Features Section */}
      <section className="px-6 py-16">

        <h2 className="text-3xl font-bold text-center mb-12">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-gray-900 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">
              Developer Profiles
            </h3>

            <p className="text-gray-400">
              Create and showcase your developer portfolio.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">
              Real-Time Chat
            </h3>

            <p className="text-gray-400">
              Collaborate instantly with other developers.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">
              Job Board
            </h3>

            <p className="text-gray-400">
              Apply to developer jobs posted by recruiters.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;