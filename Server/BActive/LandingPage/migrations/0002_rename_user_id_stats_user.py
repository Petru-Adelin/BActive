# Generated by Django 5.2.1 on 2025-05-27 18:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('LandingPage', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='stats',
            old_name='user_id',
            new_name='user',
        ),
    ]
