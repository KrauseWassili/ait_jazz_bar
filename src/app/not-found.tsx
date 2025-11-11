export default function NotFound() {
  return (
    <div className="p-4 min-h-screen" style={{ backgroundColor: "#688C8C" }}>
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-8">The page you are looking for does not exist.</p>
      <a href="/" className="text-blue-600 hover:underline">
        Go back Home
      </a>
    </div>
  );
}
