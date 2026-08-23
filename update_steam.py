import json
import urllib.request

API_KEY = '180DD50F8CAFD92090C6C9BDB3DCDFEC'
STEAM_ID = '76561198121767578'

url = f"http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key={API_KEY}&steamid={STEAM_ID}&format=json&include_appinfo=true"

try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode('utf-8'))
        
    games_list = data.get('response', {}).get('games', [])
    
    result = {}
    for game in games_list:
        name = game['name']
        hours = round(game['playtime_forever'] / 60, 1)
        result[name] = {
            "hours": hours,
            "appid": game['appid']
        }
    
    with open('data.json', 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
        
    print("Успех! Файл data.json успешно создан/обновлен.")

except Exception as e:
    print(f"Ошибка получения данных: {e}")