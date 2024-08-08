from django.core.management.base import BaseCommand
from django.db import transaction
from nba_stats.models import Player
from nba_stats.statscraper import get_player_stats_per_game

class Command(BaseCommand):
    help = 'Scrapes NBA player stats and populates the database'
    def add_arguments(self, parser):
        parser.add_argument('year', type=int, help='Year to scrape stats for')
    def handle(self, *args, **options):
        year = options['year']
        df = get_player_stats_per_game(year)
        with transaction.atomic():
            for _, row in df.iterrows():
                Player.objects.update_or_create(
                    name=row['name'],
                    year=year,
                    defaults={
                        'position': row['position'],
                        'games_played': int(row['games_played']),
                        'games_started': int(row['games_started']),
                        'minutes_per_game': float(row['minutes_per_game']),
                        'field_goals': float(row['field_goals']),
                        'field_goal_attempts': float(row['field_goal_attempts']),
                        'field_goal_percentage': float(row['field_goal_percentage']),
                        'three_point_field_goals': float(row['three_point_field_goals']),
                        'three_point_attempts': float(row['three_point_attempts']),
                        'three_point_percentage': float(row['three_point_percentage']),
                        'two_point_field_goals': float(row['two_point_field_goals']),
                        'two_point_attempts': float(row['two_point_attempts']),
                        'two_point_percentage': float(row['two_point_percentage']),
                        'effective_field_goal_percentage': float(row['effective_field_goal_percentage']),
                        'free_throws': float(row['free_throws']),
                        'free_throw_attempts': float(row['free_throw_attempts']),
                        'free_throw_percentage': float(row['free_throw_percentage']),
                        'offensive_rebounds': float(row['offensive_rebounds']),
                        'defensive_rebounds': float(row['defensive_rebounds']),
                        'total_rebounds': float(row['total_rebounds']),
                        'assists': float(row['assists']),
                        'steals': float(row['steals']),
                        'blocks': float(row['blocks']),
                        'turnovers': float(row['turnovers']),
                        'personal_fouls': float(row['personal_fouls']),
                        'points': float(row['points']),
                    }
                )
        
        self.stdout.write(self.style.SUCCESS(f'Successfully scraped and stored stats for {year}'))