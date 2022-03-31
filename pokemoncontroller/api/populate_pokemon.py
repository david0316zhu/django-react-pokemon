
import csv
from .models import Pokemon

def load_pokemons():
    with open('../pokemon.csv') as f:
            reader = csv.reader(f)
            for row in reader:
                _, created = Pokemon.objects.get_or_create(
                    name=row[0],
                    hp=row[1],
                    attack=row[2],
                    defense=row[3],
                    type=row[4],
                    
                    )
                
    return