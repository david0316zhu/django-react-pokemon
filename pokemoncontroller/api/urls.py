from django.contrib import admin
from django.urls import path
from api.views import PokemonListView, MyPokemonsListView, AddPokemonCreateView, UnknownPokemonListView, ReleasePokemonCreateView

urlpatterns = [
    path('allpokemon/', PokemonListView.as_view()),
    path('mypokemon/', MyPokemonsListView.as_view()),
    path('unownedpokemon/', UnknownPokemonListView.as_view()),
    path('addpokemon/', AddPokemonCreateView.as_view()),
    path('releasepokemon/', ReleasePokemonCreateView.as_view())
    
]
