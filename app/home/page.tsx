export default function HomePage() {
  return (
    <main
      className="min-h-screen bg-white text-zinc-900"
      style={{
        backgroundImage: "url('/themes/father3/background.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "120px",
        fontFamily: "Apple Kid, sans-serif",
      }}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-6 py-12 sm:px-8 lg:px-12">
        <h1 className="text-8xl">
          Hello This Is Ness From The Hit Game Earthbound
        </h1>
      </div>
    </main>
  );
}
