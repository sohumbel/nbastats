'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'

interface Player {
  id: number;
  name: string;
  team: string;
  position: string;
}

export default function PlayerList() {
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get<Player[]>('https://nbastats-uyhu.onrender.com/api/players')
        setPlayers(response.data)
      } catch (error) {
        console.error('Error fetching players:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPlayers()
  }, [])

  if (loading) return <div className="text-center mt-8">Loading...</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {players.map((player) => (
        <Link href={`/players/${player.id}`} key={player.id} className="block p-4 border rounded-lg hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold">{player.name}</h2>
          <p className="text-gray-600">{player.team} - {player.position}</p>
        </Link>
      ))}
    </div>
  )
}