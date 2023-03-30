from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets, generics
from rest_framework import viewsets, generics, permissions, status
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Classs, Student, Lecturer, Scores, User, Subject, News, NewsAction, CommentNews
from .perms import CommentOwnerPermisson
from .serializers import ClasssSerializer, StudentSerializer, LecturerSerializer, StudentDetailSerilizer, \
    ScoresSerializer, UserSerializer, ScoresDetailSerializer, NewsSerializer, AuthNewsDetailSerializer, \
    NewsCommentSerializer, CreateNewsCommentSerializer, CreateNewsSerializer,SubjectSerializer
from django.conf import settings

class UserViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    parser_classes = [MultiPartParser, ]

    def get_permissions(self):
        if self.action == 'current_user':
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get'], url_path="current-user", detail=False)
    def current_user(self, request):
        return Response(self.serializer_class(request.user, context={'request': request}).data,
                        status=status.HTTP_200_OK)


class AuthInfo(APIView):

    def get(self, request):
        return Response(settings.OAUTH2_INFO, status=status.HTTP_200_OK)


class ClasssViewSet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    queryset = Classs.objects.all()
    serializer_class = ClasssSerializer

    @swagger_auto_schema(
        operation_description='Get the lessons of a class',
        responses={
            status.HTTP_200_OK: StudentSerializer()
        }
    )
    @action(methods=['get'], detail=True, url_path='student')
    def get_student(self, request, pk):
        classs = self.get_object()
        student = classs.student.filter(active=True)

        st = request.query_params.get('st')
        if st:
            student = student.filter(student_id=st)

        return Response(data=StudentSerializer(student, many=True, context={'request': request}).data,
                        status=status.HTTP_200_OK)


class LecturerViewset(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    queryset = Lecturer.objects.filter(active=True)
    serializer_class = LecturerSerializer
    def get_queryset(self):
        lecturer = self.queryset
        lecturer = lecturer.filter(user_id = self.request.user.id)
        return lecturer
class SubjectViewset(viewsets.ViewSet, generics.ListAPIView):
    queryset = Subject.objects.filter(active=True)
    serializer_class = SubjectSerializer

class StudentViewSet(viewsets.ViewSet,generics.ListAPIView, generics.RetrieveAPIView, generics.UpdateAPIView):
    queryset = Student.objects.filter(active=True)
    serializer_class = StudentDetailSerilizer

    def get_permissions(self):
        if self.action in ['add_scores']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    @action(methods=['post'], url_path='add-scores', detail=True)
    def add_scores(self, request, pk):
        id = request.data.get('subject')
        subject = Subject.objects.get(id = id)
        midtern_scores = request.data.get('midtern_scores')
        final_scores = request.data.get('final_scores')
        extra_scores_1 = request.data.get('extra_scores_1')
        extra_scores_2 = request.data.get('extra_scores_2')
        extra_scores_3 = request.data.get('extra_scores_3')

        if subject:
            sc = Scores.objects.create(subject=subject,
                                       student=self.get_object(),
                                       midtern_scores=midtern_scores,
                                       final_scores=final_scores,
                                       extra_scores_1=extra_scores_1,
                                       extra_scores_2=extra_scores_2,
                                       extra_scores_3=extra_scores_3,

                                       )
            return Response(ScoresDetailSerializer(sc).data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class NewsViewset(viewsets.ViewSet,generics.ListAPIView, generics.RetrieveAPIView, generics.CreateAPIView):
    queryset = News.objects.filter(active=True)
    serializer_class = NewsSerializer


    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            return AuthNewsDetailSerializer

        return NewsSerializer


    def get_permissions(self):
        if self.action in ['add-comments', 'like']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    @action(methods=['post'], url_path='add-comments', detail=True)
    def add_comment(self, request, pk):
        content = request.data.get('content')
        if content:
            c = CommentNews.objects.create(content=content,
                                           news=self.get_object(),
                                           user=request.user)
            return Response(NewsCommentSerializer(c).data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['get'], url_path='comments', detail=True)
    def get_comments(self, request, pk):
        new = self.get_object()
        comments = new.newscomments.select_related('user').filter(active=True)
        return Response(NewsCommentSerializer(comments, context={'request': request}, many=True).data,
                        status=status.HTTP_200_OK)

    @action(methods=['post'], url_path='like', detail=True)
    def like(self, request, pk):
        news = self.get_object()
        user = request.user

        l, _ = NewsAction.objects.get_or_create(news=news, user=user)
        l.active = not l.active
        try:
            l.save()
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(data=AuthNewsDetailSerializer(news, context={'request': request}).data,
                        status=status.HTTP_200_OK)


class NewsCommentViewSet(viewsets.ViewSet, generics.CreateAPIView, generics.UpdateAPIView, generics.DestroyAPIView):
    queryset = CommentNews.objects.filter(active=True)
    serializer_class = CreateNewsCommentSerializer
    # ermission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action in ['update', 'destroy']:
            return [CommentOwnerPermisson()]

        return [permissions.IsAuthenticated()]


class CreateNewsViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = News.objects.filter(active=True)
    serializer_class = CreateNewsSerializer
    # ermission_classes = [permissions.IsAuthenticated]


class StudentEmailViewset(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    queryset = Student.objects.filter(active=True)
    serializer_class = StudentDetailSerilizer
    def get_queryset(self):
        student = self.queryset
        student = student.filter(email = self.request.user.email)
        return student