from django.contrib import admin

from api.models import Artist, Album, Playlist, Song


@admin.register(Artist)
class ArtistAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'img_url', 'prof')
    search_fields = ('name',)

@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'name', 'img_url')
    search_fields = ('title',)

@admin.register(Playlist)
class PlaylistAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'img_url', 'user')
    search_fields = ('title',)

@admin.register(Song)
class SongAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'artist', 'album', 'img_url', 'path', 'liked')
    search_fields = ('title',)