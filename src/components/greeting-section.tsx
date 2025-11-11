export default function GreetingSection() {
  return (
    <div className="flex-1 flex flex-col items-center">
      {/* Заголовок всегда сверху */}
      <h1 className="text-3xl font-semibold w-full text-center mt-20 flex-shrink-0">
        Welcome to the AIT Jazz Bar
      </h1>
      {/* Центрируем картинку */}
      <div className="flex-1 flex flex-col items-center justify-center w-full overflow-hidden">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Louis_Armstrong_restored.jpg/1200px-Louis_Armstrong_restored.jpg"
          alt="Louis Armstrong — Jazz Bar"
          className="w-[30vw] rounded-xl shadow-lg object-cover"
          style={{ objectPosition: "top" }}
        />
      </div>
      {/* Текст — футер */}
      <footer className="w-full flex justify-center">
        <p className="max-w-[30vw] italic text-xl text-center mb-20">
          Here you can enjoy the best jazz music from around the world. A cozy
          atmosphere, great drinks, and unforgettable performances await you.
        </p>
      </footer>
    </div>
  );
}
