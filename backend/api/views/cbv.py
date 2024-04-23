from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import Playlist, Song
from api.serializers import PlaylistSerializer, SongSerializer


class PlaylistList(APIView):
    def get(self, request):
        playlists = Playlist.objects.all()
        serializer = PlaylistSerializer(playlists, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = PlaylistSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    

class PlaylistDetail(APIView):
    def get_object(self, pk):
        try:
            playlist = Playlist.objects.get(id=pk)
            return playlist
        except Playlist.DoesNotExist as e:
            return Response({"error": str(e)})
    
    def get(self, request, pk):
        playlist = self.get_object(pk)
        serializer = PlaylistSerializer(playlist)
        return Response(serializer.data)
    
    def put(self, request, pk):
        playlist = self.get_object(pk)
        serializer = PlaylistSerializer(playlist, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    def delete(self, request, pk=None):
        playlist = self.get_object(pk)
        playlist.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
class PlaylistSongs(APIView):
    def get(self, request, pk):
        playlist = Playlist.objects.get(id=pk)
        songs = Song.objects.filter(playlist=playlist)
        serializer = SongSerializer(songs, many=True)
        return Response(serializer.data)



class SongList(APIView):
    def get(self, request):
        songs = Song.objects.all()
        serializer = SongSerializer(songs, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SongSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    
class SongDetail(APIView):
    def get_object(self, pk):
        try:
            song = Song.objects.get(id=pk)
            return song
        except Song.DoesNotExist as e:
            return Response({"error": str(e)})

    def get(self, request, pk):
        song = self.get_object(pk)
        serializer = SongSerializer(song)
        return Response(serializer.data)

    def put(self, request, pk):
        song = self.get_object(pk)
        serializer = SongSerializer(song, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
