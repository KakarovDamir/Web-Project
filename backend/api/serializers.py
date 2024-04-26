from rest_framework import serializers
from api.models import Album, Playlist, Artist, Song

# class AlbumSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Album
#         fields = '__all__'

class PlaylistSerializer(serializers.ModelSerializer):
    img_url = serializers.CharField()
    title = serializers.CharField()
    user_id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Playlist
        fields = ("id", "title", "img_url", "user_id")

class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = '__all__'

class AlbumSeriazer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    img_url = serializers.CharField()
    title = serializers.CharField()
    name = serializers.CharField()

    def create(self, validated_data):
        instance = Album(img_url=validated_data.get('img_url'), title=validated_data.get('title'), name=validated_data.get('name'))
        instance.save()
        return instance
    
    def update(self, instance, validated_data):
        instance.img_url = validated_data.get('img_url', instance.img_url)
        instance.title = validated_data.get('title', instance.title)
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance
    
    def delete(self, instance):
        instance.delete()
        return instance

# class PlaylistSerializer(serializers.Serializer):
#     id = serializers.IntegerField(read_only=True)
#     title = serializers.CharField()
#     img_url = serializers.CharField()
#     user_id = serializers.IntegerField(read_only=True)

#     def create(self, validated_data):
#         instance = Playlist(title=validated_data.get('title'), img_url=validated_data.get('img_url'), user=validated_data.get('user_id'))
#         instance.save()
#         return instance
    
#     def update(self, instance, validated_data):
#         instance.title = validated_data.get('title', instance.title)
#         instance.img_url = validated_data.get('img_url', instance.img_url)
#         instance.user_id = validated_data.get('user_id', instance.user_id)
#         instance.save()
#         return instance
    
#     def delete(self, instance):
#         instance.delete()
#         return instance
    
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