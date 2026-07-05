export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-6 py-12 sm:px-8 lg:px-12">
        <div className="w-full rounded-3xl border border-zinc-200 bg-zinc-50 p-8 shadow-sm sm:p-12">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Blank canvas
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Start building your portfolio here.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-600">
            This page is intentionally minimal so you can shape it freely with
            your own layout, content, and theme ideas.
          </p>
        </div>
      </div>
    </main>
  );
}
