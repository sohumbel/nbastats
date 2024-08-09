import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import axios from 'axios'

interface PlayerStats {
  id: number;
  name: string;
  team: string;
  position: string;
  points_per_game: number;
  rebounds_per_game: number;
  assists_per_game: number;
  // Add other relevant stats
}

export default function PlayerDetail() {
  const router = useRouter()
  const { id } = router.query
  const [player, setPlayer] = useState<PlayerStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      const fetchPlayerDetails = async () => {
        try {
          const response = await axios.get<PlayerStats>(`https://your-api-url.render.com/api/players/${id}`)
          setPlayer(response.data)
        } catch (error) {
          console.error('Error fetching player details:', error)
        } finally {
          setLoading(false)
        }
      }

      fetchPlayerDetails()
    }
  }, [id])

  if (loading) return <div className="text-center mt-8">Loading...</div>
  if (!player) return <div className="text-center mt-8">Player not found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>{player.name} | NBA Stats</title>
        <meta name="description" content={`Statistics for ${player.name}`} />
      </Head>

      <h1 className="text-3xl font-bold mb-6">{player.name}</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="mb-2"><strong>Team:</strong> {player.team}</p>
        <p className="mb-2"><strong>Position:</strong> {player.position}</p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">Stats</h2>
        <p className="mb-2"><strong>Points per game:</strong> {player.points_per_game.toFixed(1)}</p>
        <p className="mb-2"><strong>Rebounds per game:</strong> {player.rebounds_per_game.toFixed(1)}</p>
        <p className="mb-2"><strong>Assists per game:</strong> {player.assists_per_game.toFixed(1)}</p>
        {/* Add other stats as needed */}
      </div>
    </div>
  )
}