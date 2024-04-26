from django.db import models
from django.contrib.auth.models import User

class Album(models.Model):
    img_url = models.TextField()
    title = models.CharField(max_length=255)
    name = models.CharField(max_length=255)

    def __str__(self):
        return f"ID: {self.id}, Title: {self.title}, Name: {self.name}, Img_url: {self.img_url}"
    
    def to_json(self):
        return {
            "id": self.id,
            "title": self.title,
            "name": self.name,
            "img_url": self.img_url
        }
    
    class Meta:
        verbose_name = "Album"
        verbose_name_plural = "Albums"

class Playlist(models.Model):
    img_url = models.TextField()
    title = models.CharField(max_length=255)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="playlists",
        null=True,blank=True
    )

    def __str__(self):
        return f"ID: {self.id}, Title: {self.title}, Img_url: {self.img_url}"
    
    def to_json(self):
        return {
            "id": self.id,
            "title": self.title,
            "img_url": self.img_url
        }
    
    class Meta:
        verbose_name = "Playlist"
        verbose_name_plural = "Playlists"

class Artist(models.Model):
    img_url = models.TextField()
    name = models.CharField(max_length=255)
    prof = models.CharField(max_length=255)

    def __str__(self):
        return f"ID: {self.id}, Name: {self.name}, Img_url: {self.img_url}, Prof: {self.prof}"
    
    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "img_url": self.img_url,
            "prof": self.prof
        }
    
    class Meta:
        verbose_name = "Artist"
        verbose_name_plural = "Artists"

class Song(models.Model):
    title = models.CharField(max_length=255)
    img_url = models.TextField()
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, blank=True, null=True)
    album = models.ForeignKey(Album, on_delete=models.CASCADE, blank=True, null=True)
    path = models.CharField(max_length=255)
    liked = models.BooleanField()
    playlist = models.ManyToManyField(Playlist, related_name='songs', null=True, blank=True)

    def __str__(self):
        return f"ID: {self.id}, Title: {self.title}, Artist: {self.artist}, Album: {self.album}, Path: {self.path}, Liked: {self.liked}, Playlist: {self.playlist}"
    
    def to_json(self):
        return {
            "id": self.id,
            "title": self.title,
            "img_url": self.img_url,
            "artist": self.artist.to_json(),
            "album": self.album.to_json(),
            "path": self.path,
            "liked": self.liked,
            "playlist": self.playlist.to_json()
        }
    
    class Meta:
        verbose_name = "Song"
        verbose_name_plural = "Songs"
