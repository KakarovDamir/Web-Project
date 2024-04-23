from rest_framework import serializers
from api.models import Album, Playlist, Artist, Song

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = '__all__'

class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = '__all__'

class PlaylistSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField()
    img_url = serializers.CharField()

    def create(self, validated_data):
        instance = Playlist(title=validated_data.get('title'), img_url=validated_data.get('img_url'))
        instance.save()
        return instance
    
    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.img_url = validated_data.get('img_url', instance.img_url)
        instance.save()
        return instance
    
    def delete(self, instance):
        instance.delete()
        return instance
    
class ArtistSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()
    img_url = serializers.CharField()
    prof = serializers.CharField()

    def create(self, validated_data):
        instance = Artist(name=validated_data.get('name'), img_url=validated_data.get('img_url'), prof=validated_data.get('prof'))
        instance.save()
        return instance
    
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.img_url = validated_data.get('img_url', instance.img_url)
        instance.prof = validated_data.get('prof', instance.prof)
        instance.save()
        return instance
    
    def delete(self, instance):
        instance.delete()
        return instance