# Generated by Django 5.0.4 on 2024-04-23 19:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_album_img_url_alter_artist_img_url_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='song',
            name='playlist',
        ),
        migrations.AddField(
            model_name='song',
            name='playlist',
            field=models.ManyToManyField(related_name='songs', to='api.playlist'),
        ),
    ]
