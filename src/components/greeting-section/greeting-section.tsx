export default function GreetingSection() {
  return (
    // <div
    //   style={{
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     padding: "3rem 1rem",
    //     gap: "1rem",
    //     background: "brown",
    //     color: "black",
    //     minHeight: "100vh",
    //     width: "400px",
    //     textAlign: "center",
    //     fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    //   }}
    // >
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-[800px] flex flex-col items-center justify-center px-4 py-12 gap-4 text-center min-h-screen">
      <h1 className="text-4xl font-semibold m-0">Welcome to the Jazz-Bar</h1>
      <p className="max-w-[720px] opacity-95 text-lg mt-2">
        Here you can enjoy the best jazz music from around the world. A cozy
        atmosphere, great drinks, and unforgettable performances await you.
      </p>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Louis_Armstrong_restored.jpg/1200px-Louis_Armstrong_restored.jpg"
        alt="Louis Armstrong — Jazz Bar"
        className="w-full max-w-[480px] rounded-xl shadow-lg mt-4 object-cover home-image"
      />
      </div>
    </div>
  );
}