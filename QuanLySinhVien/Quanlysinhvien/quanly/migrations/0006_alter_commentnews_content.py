# Generated by Django 3.2.12 on 2023-03-25 11:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quanly', '0005_alter_news_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='commentnews',
            name='content',
            field=models.CharField(max_length=255),
        ),
    ]
