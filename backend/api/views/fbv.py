from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.models import Artist, Album, Song
from api.serializers import ArtistSerializer, SongSerializer,AlbumSeriazer


@api_view(["GET", "POST"])
def artist_list(request):
    if request.method == "GET":
        artists = Artist.objects.all()
        serializer = ArtistSerializer(artists, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = ArtistSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
def artist_detail(request, pk=None):
    try:
        artist = Artist.objects.get(id=pk)
    except Artist.DoesNotExist as e:
        return Response({"error": str(e)})
    
    if request.method == "GET":
        serializer = ArtistSerializer(artist)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = ArtistSerializer(
            instance=artist, 
            data=request.data
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=400)
    elif request.method == "DELETE":
        artist.delete()
        return Response({"deleted": True})
    
@api_view(["GET"])
def artist_songs(request, pk=None):
    try:
        artist = Artist.objects.get(id=pk)
    except Artist.DoesNotExist as e:
        return Response({"error": str(e)})

    songs = Song.objects.filter(artist=artist)
    serializer = SongSerializer(songs, many=True)
    return Response(serializer.data)




@api_view(["GET", "POST"])
def album_list(request):
    if request.method == "GET":
        albums = Album.objects.all()
        serializer = AlbumSeriazer(albums, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = AlbumSeriazer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET", "PUT", "DELETE"])
def album_detail(request, pk=None):
    try:
        album = Album.objects.get(id=pk)
    except Album.DoesNotExist as e:
        return Response({"error": str(e)})

    if request.method == "GET":
        serializer = AlbumSeriazer(album)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = AlbumSeriazer(
            instance=album,
            data=request.data
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=400)
    elif request.method == "DELETE":
        album.delete()
        return Response({"deleted": True})

@api_view(["GET"])
def album_songs(request, pk=None):
    try:
        album = Album.objects.get(id=pk)
    except Album.DoesNotExist as e:
        return Response({"error": str(e)})
    
    songs = Song.objects.filter(album=album)
    serializer = SongSerializer(songs, many=True)
    return Response(serializer.data)
    