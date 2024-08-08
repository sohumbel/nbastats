import bs4
from bs4 import BeautifulSoup as soup
import requests
import pandas as pd
def get_value(col):
    return float(col.text) if col.text.strip() else 0.0
def get_player_stats_per_game(year):
    url = f"https://www.basketball-reference.com/leagues/NBA_{year}_per_game.html"
    response = requests.get(url)
    table = soup(response.text, 'html.parser')
    rows = table.find_all('tr')[1:]
    player_data = []
    curr_player = ''
    for row in rows:
        cols = row.find_all('td')
        if cols:
            if curr_player == cols[0].text: 
                continue
            
            player_name = cols[0].text.strip().rstrip('*')
            curr_player = player_name
            player_position = cols[1].text
            player_ppg = cols[28].text
            player_apg = cols[23].text
            player_rpg = cols[22].text
            player_data.append ({
                'name': player_name,
                'position': cols[1].text,
                'games_played': int(get_value(cols[4])),
                'games_started': int(get_value(cols[5])),
                'minutes_per_game': get_value(cols[6]),
                'field_goals': get_value(cols[7]),
                'field_goal_attempts': get_value(cols[8]),
                'field_goal_percentage': get_value(cols[9]),
                'three_point_field_goals': get_value(cols[10]),
                'three_point_attempts': get_value(cols[11]),
                'three_point_percentage': get_value(cols[12]),
                'two_point_field_goals': get_value(cols[13]),
                'two_point_attempts': get_value(cols[14]),
                'two_point_percentage': get_value(cols[15]),
                'effective_field_goal_percentage': get_value(cols[16]),
                'free_throws': get_value(cols[17]),
                'free_throw_attempts': get_value(cols[18]),
                'free_throw_percentage': get_value(cols[19]),
                'offensive_rebounds': get_value(cols[20]),
                'defensive_rebounds': get_value(cols[21]),
                'total_rebounds': get_value(cols[22]),
                'assists': get_value(cols[23]),
                'steals': get_value(cols[24]),
                'blocks': get_value(cols[25]),
                'turnovers': get_value(cols[26]),
                'personal_fouls': get_value(cols[27]),
                'points': get_value(cols[28])
            })
    return pd.DataFrame(player_data)

