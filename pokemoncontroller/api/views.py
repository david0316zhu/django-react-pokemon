from django.shortcuts import render
from .models import Pokemon, MyPokemons, PokemonOwned
from .serializers import PokemonSerializer, MyPokemonsSerializer, PokemonOwnedSerializer
from rest_framework import permissions, authentication
from rest_framework.generics import ListAPIView
from  rest_framework.views import APIView
from .populate_pokemon import load_pokemons
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from django.views.decorators.csrf import csrf_exempt


from uuid import uuid1
# Create your views here.
class PokemonListView(ListAPIView):
    permissions_classes = (permissions.IsAuthenticated,)
    queryset = Pokemon.all_pokemon.all()
    serializer_class = PokemonSerializer



class UnknownPokemonListView(ListAPIView):
    permissions_classes = (permissions.IsAuthenticated,)
    def get(self,request,*args, **kwargs):
        all_poke = []
        query = [poke for poke in Pokemon.all_pokemon.all()]
        if len(query) <1:
            load_pokemons()
        current_user = MyPokemons.objects.get(user_id=request.user.pk)
        pre_pross = [pokemon for pokemon in current_user.get_pokemons()]
        pross = []
        for j in pre_pross:
            pross.append(j.pokemon)
        print(pross, "pre_pross")
        for i in query:
            if i not in pross:
                serializer = PokemonSerializer(i)
                all_poke.append(serializer.data)
        print(all_poke)
        return Response(all_poke, status=HTTP_200_OK)





class MyPokemonsListView(ListAPIView):
    permissions_classes = (permissions.IsAuthenticated,)
    def get(self,request,*args, **kwargs):
        
        current_user = MyPokemons.objects.get(user_id=request.user.pk)
        print(request.user.pk)
        my_poke = [pokemon for pokemon in current_user.get_pokemons()]
        pokes = []
        for i in my_poke:
            serializer = PokemonSerializer(i.pokemon)
            data = serializer.data
            data["level"] = i.level
            data["uid"] = i.unique_id
            pokes.append(data)
        return Response(pokes, status=HTTP_200_OK)


class AddPokemonCreateView(APIView):
    permissions_classes = (permissions.IsAuthenticated,)
    def post(self,request,*args, **kwargs):
        data = self.request.data
        print(data)
        query = Pokemon.all_pokemon.get(name=data['newpokemon']['name'])
        uuid_string = uuid1().hex
        u_id = request.user.email + uuid_string
        new_pokemon = PokemonOwned(pokemon=query, unique_id = u_id,level=data["level"])
        new_pokemon.save()
        current_user = MyPokemons.objects.get(user_id=request.user.pk)
        current_user.pokemons.add(new_pokemon)
        return Response(status=HTTP_200_OK)


class ReleasePokemonCreateView(APIView):
    permissions_classes = (permissions.IsAuthenticated,)
    def post(self,request,*args, **kwargs):
        data = self.request.data
        current_user = MyPokemons.objects.get(user_id=request.user.pk)
        query =PokemonOwned.objects.get(unique_id=data["uid"])
        current_user.pokemons.remove(query)
        PokemonOwned.objects.filter(unique_id=query.unique_id).delete()
        
        return Response(status=HTTP_200_OK)