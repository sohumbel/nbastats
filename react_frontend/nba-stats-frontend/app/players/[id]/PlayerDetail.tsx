'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

interface PlayerStats {
    id: number;
    name: string;
    position: string;
    year: number;
    games_played: number;
    games_started: number;
    minutes_per_game: number;
    field_goals: number;
    field_goal_attempts: number;
    field_goal_percentage: number;
    three_point_field_goals: number;
    three_point_attempts: number;
    three_point_percentage: number;
    two_point_field_goals: number;
    two_point_attempts: number;
    two_point_percentage: number;
    effective_field_goal_percentage: number;
    free_throws: number;
    free_throw_attempts: number;
    free_throw_percentage: number;
    offensive_rebounds: number;
    defensive_rebounds: number;
    total_rebounds: number;
    assists: number;
    steals: number;
    blocks: number;
    turnovers: number;
    personal_fouls: number;
    points: number;
  }

  const StatRow = ({ label, value, decimals = 1 }: { label: string; value: number | string; decimals?: number }) => (
    <div className="flex justify-between py-2 border-b">
      <span className="font-medium">{label}</span>
      <span>{value}</span>
    </div>
  );
export default function PlayerDetail({ id }: { id: string }) {
  const [player, setPlayer] = useState<PlayerStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      try {
        const response = await axios.get<PlayerStats[]>(`https://nbastats-uyhu.onrender.com/api/players/${id}/`)
        if (response.data.length > 0) {

            const mostRecentPlayer = response.data[0]
            setPlayer(mostRecentPlayer)
          } 
      } catch (error) {
        console.error('Error fetching player details:', error)
        setError('Failed to load player details. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchPlayerDetails()
  }, [id])


  if (loading) return <div className="text-center mt-8">Loading...</div>
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>
  if (!player) return <div className="text-center mt-8">Player not found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4">{`${player.name}'s ${player.year} Statistics`}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">General Info</h2>
            <StatRow label="Position" value={player.position} decimals={0} />
            <StatRow label="Year" value={player.year} decimals={0} />
            <StatRow label="Games Played" value={player.games_played} decimals={0} />
            <StatRow label="Games Started" value={player.games_started} decimals={0} />
            <StatRow label="Minutes Per Game" value={player.minutes_per_game} />
            
            <h2 className="text-2xl font-semibold mt-4 mb-2">Scoring</h2>
            <StatRow label="Points Per Game" value={player.points} />
            <StatRow label="Field Goals Per Game" value={player.field_goals} />
            <StatRow label="Field Goal Attempts Per Game" value={player.field_goal_attempts} />
            <StatRow label="Field Goal %" value={player.field_goal_percentage != 0? Math.round(player.field_goal_percentage * 10000)/100 : 0} />
            <StatRow label="Effective Field Goal %" value={player.effective_field_goal_percentage != 0? Math.round(player.effective_field_goal_percentage * 10000)/100 : 0} />
            
            <h2 className="text-2xl font-semibold mt-4 mb-2">Three Pointers</h2>
            <StatRow label="Three Pointers Per Game" value={player.three_point_field_goals} />
            <StatRow label="Three Point Attempts Per Game" value={player.three_point_attempts} />
            <StatRow label="Three Point %" value={player.three_point_percentage != 0? Math.round(player.three_point_percentage * 10000)/100 : 0} />
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-2">Two Pointers</h2>
            <StatRow label="Two Pointers Per Game" value={player.two_point_field_goals} />
            <StatRow label="Two Point Attempts Per Game" value={player.two_point_attempts} />
            <StatRow label="Two Point %" value={player.two_point_percentage != 0? Math.round(player.two_point_percentage * 10000)/100 : 0} />
            
            <h2 className="text-2xl font-semibold mt-4 mb-2">Free Throws</h2>
            <StatRow label="Free Throws Per Game" value={player.free_throws} />
            <StatRow label="Free Throw Attempts Per Game" value={player.free_throw_attempts} />
            <StatRow label="Free Throw %" value={player.free_throw_percentage!= 0? Math.round(player.free_throw_percentage * 10000)/100 : 0} />
            
            <h2 className="text-2xl font-semibold mt-4 mb-2">Rebounds</h2>
            <StatRow label="Offensive Rebounds Per Game" value={player.offensive_rebounds} />
            <StatRow label="Defensive Rebounds Per Game" value={player.defensive_rebounds} />
            <StatRow label="Total Rebounds Per Game" value={player.total_rebounds} />
            
            <h2 className="text-2xl font-semibold mt-4 mb-2">Other Stats</h2>
            <StatRow label="Assists Per Game" value={player.assists} />
            <StatRow label="Steals Per Game" value={player.steals} />
            <StatRow label="Blocks Per Game" value={player.blocks} />
            <StatRow label="Turnovers Per Game" value={player.turnovers} />
            <StatRow label="Personal Fouls Per Game" value={player.personal_fouls} />
          </div>
        </div>
      </div>
    </div>
  )
}