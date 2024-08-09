import PlayerList from './PlayerList'

export const metadata = {
  title: 'NBA Players | NBA Stats',
  description: 'List of NBA players and their stats',
}

export default function PlayersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">NBA Players</h1>
      <PlayerList />
    </div>
  )
}
