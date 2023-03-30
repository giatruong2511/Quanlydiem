from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('classs', views.ClasssViewSet)
router.register(prefix='lecturers',viewset= views.LecturerViewset, basename='lecturer')
router.register('student', views.StudentViewSet)
router.register('students', views.StudentEmailViewset)
router.register(prefix='users', viewset=views.UserViewSet, basename='user')
router.register('news', views.NewsViewset)
router.register('newss', views.CreateNewsViewSet)
router.register('subject', views.SubjectViewset)
router.register(prefix='comments', viewset=views.NewsCommentViewSet, basename='comment')

urlpatterns = [
    path('', include(router.urls)),
    path('oauth2-info/', views.AuthInfo.as_view()),
]