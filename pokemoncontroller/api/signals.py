from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from .models import MyPokemons
from django.contrib.auth import get_user_model

User = get_user_model()
@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        MyPokemons.objects.create(user=instance)