# Generated by Django 4.0.3 on 2022-03-26 17:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_pokemon_managers_pokemonowned_mypokemons'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mypokemons',
            name='pokemons',
            field=models.ManyToManyField(blank=True, related_name='my_pokemons', to='api.pokemonowned'),
        ),
    ]
