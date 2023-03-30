from django.contrib import admin
from .models import User, Student, Lecturer, Subject, Classs, Classs_Lecturer, Scores, News, CommentNews


admin.site.register(User)
admin.site.register(Student)
admin.site.register(Lecturer)
admin.site.register(Subject)
admin.site.register(Scores)
admin.site.register(Classs)
admin.site.register(Classs_Lecturer)
admin.site.register(News)
admin.site.register(CommentNews)


