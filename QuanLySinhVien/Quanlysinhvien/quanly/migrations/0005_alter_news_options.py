# Generated by Django 3.2.12 on 2023-03-24 16:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('quanly', '0004_news_topic'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='news',
            options={'ordering': ['-id']},
        ),
    ]
