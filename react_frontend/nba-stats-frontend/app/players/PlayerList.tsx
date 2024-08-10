'use client'

import { useEffect, useState,Suspense} from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'

interface Player {
  id: number;
  name: string;
  team: string;
  position: string;
}

  function PlayerListContent() {
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams();
  const year = searchParams.get('year') || '2023';

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true)
      try {
        const response = await axios.get<Player[]>(`https://nbastats-uyhu.onrender.com/api/stats/${year}/`, {
          params: { search: searchTerm }
        })
        setPlayers(response.data)
      } catch (error) {
        console.error('Error fetching players:', error)
        setError('Failed to load players. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    const debounce = setTimeout(() => {
      fetchPlayers()
    }, 300)

    return () => clearTimeout(debounce)
  }, [searchTerm, year])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">NBA Player Stats for {year} </h1>
      <input
        type="text"
        placeholder="Search players..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 mb-4 border rounded bg-black text-white"
      />
      {loading ? (
        <div className="text-center mt-8">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {players.length === 0 ? (
            <p>No players found.</p>
          ) : (
            players.map((player) => (
              <Link href={`/players/${encodeURIComponent(player.name)}`} key={player.id} className="block p-4 border rounded-lg hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold">{player.name}</h2>
                <p className="text-gray-600">{player.team} - {player.position}</p>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default function PlayerList() {
  return (
    <Suspense fallback={<div className="text-center mt-8">Loading...</div>}>
      <PlayerListContent />
    </Suspense>
  )
}