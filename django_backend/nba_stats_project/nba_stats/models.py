from django.db import models

class Player(models.Model):
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=10)
    year = models.IntegerField()
    games_played = models.IntegerField()
    games_started = models.IntegerField()
    minutes_per_game = models.FloatField()
    field_goals = models.FloatField()
    field_goal_attempts = models.FloatField()
    field_goal_percentage = models.FloatField()
    three_point_field_goals = models.FloatField()
    three_point_attempts = models.FloatField()
    three_point_percentage = models.FloatField()
    two_point_field_goals = models.FloatField()
    two_point_attempts = models.FloatField()
    two_point_percentage = models.FloatField()
    effective_field_goal_percentage = models.FloatField()
    free_throws = models.FloatField()
    free_throw_attempts = models.FloatField()
    free_throw_percentage = models.FloatField()
    offensive_rebounds = models.FloatField()
    defensive_rebounds = models.FloatField()
    total_rebounds = models.FloatField()
    assists = models.FloatField()
    steals = models.FloatField()
    blocks = models.FloatField()
    turnovers = models.FloatField()
    personal_fouls = models.FloatField()
    points = models.FloatField()

    class Meta:
        unique_together = ('name', 'year')

    def __str__(self):
        return f"{self.name} ({self.year})"