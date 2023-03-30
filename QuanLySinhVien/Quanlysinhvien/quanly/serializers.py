from rest_framework import serializers

from .models import Student, Classs, Lecturer, Classs_Lecturer, Subject, Scores, User, News, CommentNews, Role

# class RoleSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Role
#         fields =['id']
class UserSerializer(serializers.ModelSerializer):
    avatar_path = serializers.SerializerMethodField(source='avatar')
    # role = RoleSerializer()
    def get_avatar_path(self, obj):
        request = self.context['request']
        if obj.avatar and not obj.avatar.name.startswith("/static"):

            path = '/static/%s' % obj.avatar.name

            return request.build_absolute_uri(path)

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name',
                  'username', 'password', 'email',
                  'avatar', 'avatar_path', 'role']
        extra_kwargs = {
            'password': {
                'write_only': True
            }, 'avatar_path': {
                'read_only': True
            }, 'avatar': {
                'write_only': True
            }
        }

    def create(self, validated_data):
        data = validated_data.copy()
        user = User(**data)
        user.set_password(user.password)
        user.save()

        return user


class UserViewSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField(source='avatar')
    # role = RoleSerializer()
    def get_avatar(self, obj):
        request = self.context['request']
        if obj.avatar and not obj.avatar.name.startswith("/static"):

            path = '/static/%s' % obj.avatar.name

            return request.build_absolute_uri(path)

    class Meta:
        model = User
        fields =['id','username', 'email', 'first_name', 'last_name', 'avatar', 'role']



class ClasssSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classs
        fields = ['id', 'name']

class StudentSerializer(serializers.ModelSerializer):
    class_student = ClasssSerializer()
    class Meta:
        model = Student
        fields = ['id','student_id', 'name', 'sex', 'email', 'date_of_birth', 'hometown','class_student']


class Classs_LecturerSerializer(serializers.ModelSerializer):
    classs = ClasssSerializer()
    class Meta:
        model = Classs_Lecturer
        fields = ['classs']

class LecturerSerializer(serializers.ModelSerializer):
    classs_lecturer = Classs_LecturerSerializer(many=True)
    class Meta:
        model = Lecturer
        fields = ['id', 'lecturer_id', 'name', 'sex', 'date_of_birth', 'degree', 'classs_lecturer']

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id','subject_id', 'name', 'credits']

class ScoresSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer()
    class Meta:
        model = Scores
        fields = ['id', 'subject', 'midtern_scores', 'final_scores', 'extra_scores_1', 'extra_scores_2', 'extra_scores_3']


class ScoresDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scores
        fields = ['subject', 'midtern_scores', 'final_scores', 'extra_scores_1', 'extra_scores_2', 'extra_scores_3']
class StudentDetailSerilizer(serializers.ModelSerializer):
    scores = ScoresSerializer(many=True)
    class Meta:
        model = Student
        fields = StudentSerializer.Meta.fields + ['scores']

class NewsSerializer(serializers.ModelSerializer):
    user = UserViewSerializer()
    class Meta:
        model = News
        fields = ['id', 'user', 'topic', 'content', 'created_date']

class CreateNewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = ['user', 'topic', 'content']
class NewsCommentSerializer(serializers.ModelSerializer):
    user = UserViewSerializer()
    class Meta:
        model = CommentNews
        exclude = ['active']

class CreateNewsCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentNews
        fields = ['content', 'user', 'news']

class AuthNewsDetailSerializer(NewsSerializer):
    like = serializers.SerializerMethodField()

    def get_like(self, news):
        request = self.context.get('request')
        if request:
            return news.likes.filter(user=request.user, active=True).exists()


    class Meta:
        model = News
        fields = ['id', 'user','topic', 'content', 'like', 'created_date']