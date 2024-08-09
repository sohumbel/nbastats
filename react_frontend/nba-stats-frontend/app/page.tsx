import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>NBA Stats</title>
        <meta name="description" content="NBA Statistics Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen py-16 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to NBA Stats</h1>

        <p className="text-xl mb-8">Explore player statistics</p>

        <div className="grid grid-cols-1 gap-4">
          <Link
            href="/players"
            className="p-6 border rounded-lg hover:border-blue-500 transition-colors duration-200"
          >
            <h2 className="text-2xl font-semibold mb-2">Player List &rarr;</h2>
            <p>View all NBA players and their stats.</p>
          </Link>
        </div>
      </main>
      <footer className="py-4 text-center">
        <p className="text-sm text-gray-500">Built by Sohum Belhe</p>
      </footer>
    </div>
  );
}
