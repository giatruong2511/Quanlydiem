from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField

class Role(models.Model):
    active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    role = models.CharField(max_length=255, null=False)
    def __str__(self):
        return self.role
class User(AbstractUser):
    avatar = models.ImageField(null=True, upload_to='users/%Y/%m')
    role = models.ForeignKey(Role, null=True, on_delete=models.SET_NULL, default="3",related_name='roles')

class ModelBase(models.Model):
    active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Classs(ModelBase):
    name = models.CharField(max_length=255, null=False)

    def __str__(self):
        return self.name


class Lecturer(ModelBase):
    lecturer_id = models.CharField(max_length=10, null=False)
    name = models.CharField(max_length=255, null=False)
    sex = models.CharField(max_length=255, null=True)
    date_of_birth = models.DateTimeField(null=False)
    degree = models.CharField(max_length=255)
    user = models.ForeignKey(User,null= True, on_delete=models.SET_NULL, related_name='user_lecturer')

    def __str__(self):
        return self.lecturer_id + " " + self.name


class Student(ModelBase):
    student_id = models.CharField(max_length=10, null=False)
    name = models.CharField(max_length=255, null=False)
    sex = models.CharField(max_length=255, null=True)
    email = models.CharField(max_length=255, null=False)
    date_of_birth = models.DateTimeField(null=False)
    hometown = models.CharField(max_length=255)
    class_student = models.ForeignKey(Classs, null=True, on_delete=models.SET_NULL, related_name='student',
                                      related_query_name='my_student')
    def __str__(self):
        return self.student_id + " " + self.name


class Classs_Lecturer(ModelBase):
    classs = models.ForeignKey(Classs, on_delete=models.CASCADE)
    lecturer = models.ForeignKey(Lecturer, on_delete=models.CASCADE, related_name= 'classs_lecturer')

    def __str__(self):
        return self.classs.name + " " + self.lecturer.name


class Subject(ModelBase):
    subject_id = models.CharField(max_length=10, null=False)
    name = models.CharField(max_length=255, null=False)
    credits = models.IntegerField(null=False)
    description = RichTextField()

    def __str__(self):
        return self.subject_id + " " + self.name


class Scores(ModelBase):
    midtern_scores = models.FloatField()
    final_scores = models.FloatField()
    extra_scores_1 = models.FloatField(null=True)
    extra_scores_2 = models.FloatField(null=True)
    extra_scores_3 = models.FloatField(null=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='scores',
                                related_query_name='my_scores')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='subject',
                                related_query_name='my_subject')
    class Meta:
        ordering = ['-id']
    def __str__(self):
        return self.student.name + " " + self.subject.name


class News(ModelBase):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    topic = models.CharField(max_length=255)
    content = RichTextField()
    class Meta:
        ordering = ['-id']

class CommentNews(ModelBase):
    news = models.ForeignKey(News, on_delete=models.CASCADE, related_name='newscomments')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.CharField(max_length=255)
    class Meta:
        ordering = ['-id']
    def __str__(self):
        return self.content
class NewsAction(ModelBase):
    news = models.ForeignKey(News, on_delete=models.CASCADE, related_name='likes')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    like = models.BooleanField(default=False)
    class Meta:
        unique_together = ('user', 'news')