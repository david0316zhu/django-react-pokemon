from contextlib import AsyncExitStack
from pyexpat import model
from unicodedata import name
from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
User = get_user_model()


class Pokemon(models.Model):
    name = models.CharField(max_length=100, unique=True)
    hp = models.IntegerField()
    attack = models.IntegerField()
    defense = models.IntegerField()
    type = models.CharField(max_length=100)
    
    all_pokemon = models.Manager()
    def __str__(self):
        return f'{self.name} Profile'

class PokemonOwned(models.Model):
    pokemon = models.ForeignKey(Pokemon, on_delete=models.CASCADE)
    unique_id = models.CharField(max_length=200)
    level = models.IntegerField(default=1)


class MyPokemons(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    pokemons = models.ManyToManyField(PokemonOwned, blank=True, related_name="my_pokemons")

    def __str__(self):
        return f"{self.user.username}'s Pokemons"


    def get_pokemons(self):
        return self.pokemons.all()
