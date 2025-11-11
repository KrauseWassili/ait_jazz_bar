export default function GreetingSection() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1rem",
        gap: "1rem",
        background: "brown",
        color: "black",
        minHeight: "60vh",
        textAlign: "center",
        fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <h1 style={{ fontSize: "2.25rem", margin: 0 }}>
        Welcome to the Jazz-Bar
      </h1>
      <p
        style={{
          maxWidth: 720,
          opacity: 0.95,
          fontSize: "1.125rem",
          marginTop: ".5rem",
        }}
      >
        Here you can enjoy the best jazz music from around the world. A cozy
        atmosphere, great drinks, and unforgettable performances await you.
      </p>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Louis_Armstrong_restored.jpg/1200px-Louis_Armstrong_restored.jpg"
        alt="Louis Armstrong — Jazz Bar"
        style={{
          width: "100%",
          maxWidth: 480,
          borderRadius: 12,
          boxShadow: "0 8px 24px rgba(2,6,23,0.6)",
          marginTop: "1rem",
          objectFit: "cover",
        }}
        className="home-image"
      />
    </div>
  );
}
