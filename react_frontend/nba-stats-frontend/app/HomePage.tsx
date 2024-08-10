'use client'
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [selectedYear, setSelectedYear] = useState("2023");

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };
  const handleSelectClick = (event: React.MouseEvent<HTMLSelectElement, MouseEvent>) => {
    event.stopPropagation();
  };
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
          <div className="p-6 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Player List</h2>
            <p>
              View all NBA players and their stats from{""}
              <select
                value={selectedYear}
                onChange={handleYearChange}
                onClick={handleSelectClick}
                className="bg-transparent border-b-2 border-black text-white-300 focus:outline-none focus:border-black font-bold"
              >
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                <option value="2011">2011</option>
                <option value="2010">2010</option>
                <option value="2009">2009</option>
                <option value="2008">2008</option>
                <option value="2007">2007</option>
                <option value="2006">2006</option>
                <option value="2005">2005</option>
                <option value="2004">2004</option>
                <option value="2003">2003</option>
                <option value="2002">2002</option>
                <option value="2001">2001</option>
                <option value="2000">2000</option>
                <option value="1999">1999</option>
                <option value="1998">1998</option>
                <option value="1997">1997</option>
                <option value="1996">1996</option>
                <option value="1995">1995</option>
                <option value="1994">1994</option>
                <option value="1993">1993</option>
                <option value="1992">1992</option>
                <option value="1991">1991</option>
                <option value="1990">1990</option>
                <option value="1989">1989</option>
                <option value="1988">1988</option>
                <option value="1987">1987</option>
                <option value="1986">1986</option>
                <option value="1985">1985</option>
                <option value="1984">1984</option>
                <option value="1983">1983</option>
                <option value="1982">1982</option>
                <option value="1981">1981</option>
                <option value="1980">1980</option>
                {/* Add more years as needed */}
              </select>
              .
            </p>
            <Link
              href={`/players?year=${selectedYear}`}
              className="mt-4 inline-block px-4 py-2 bg-black text-white rounded transition-all duration-200 hover:ring-1 hover:ring-white hover:ring-offset-1 hover:ring-offset-black"
            >
              View Players &rarr;
            </Link>
          </div>
        </div>
      </main>
      <footer className="py-4 text-center">
        <p className="text-sm text-gray-500">Built by Sohum Belhe</p>
      </footer>
    </div>
  );
}
