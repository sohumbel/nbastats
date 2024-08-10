import PlayerDetail from './PlayerDetail'

export const metadata = {
  title: 'Player Details | NBA Stats',
  description: 'Detailed statistics for NBA players',
}

export default function PlayerDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <PlayerDetail id={params.id} />
    </div>
  )
}