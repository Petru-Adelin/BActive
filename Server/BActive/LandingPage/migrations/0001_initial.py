# Generated by Django 5.2.1 on 2025-05-27 17:38

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Login', '0002_alter_users_password_alter_users_table'),
    ]

    operations = [
        migrations.CreateModel(
            name='Stats',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active_minutes', models.IntegerField(default=0)),
                ('calories', models.IntegerField(default=0)),
                ('steps', models.IntegerField(default=0)),
                ('workouts', models.IntegerField(default=0)),
                ('timestamp', models.DateField(auto_now_add=True)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Login.users')),
            ],
        ),
    ]
