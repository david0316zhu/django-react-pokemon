from rest_framework import serializers
from .models import Pokemon, MyPokemons, PokemonOwned



class PokemonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pokemon
        fields = ('name', 'hp', 'attack', 'defense', 'type')

class MyPokemonsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyPokemons
        fields = ('user', 'pokemons')

class PokemonOwnedSerializer(serializers.ModelSerializer):
    class Meta:
        model = PokemonOwned
        fields = ('pokemon', 'unique_id', 'level')