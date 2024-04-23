from django.urls import path

from api.views import *

urlpatterns = [
    path('artists/', artist_list),
    path('artists/<int:pk>/', artist_detail),
    path('artists/<int:pk>/songs/', artist_songs),

    path('albums/',album_list),
    path('albums/<int:pk>/', album_detail),
    path('albums/<int:pk>/songs/', album_songs),

    path('playlists/', PlaylistList.as_view()),
    path('playlists/<int:pk>/', PlaylistDetail.as_view()),
    path('playlists/<int:pk>/songs/', PlaylistSongs.as_view()),

    path('songs/', SongList.as_view()),
    path('songs/<int:pk>/', SongDetail.as_view()),
]