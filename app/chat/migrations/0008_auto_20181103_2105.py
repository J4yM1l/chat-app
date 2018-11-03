# Generated by Django 2.1.2 on 2018-11-03 21:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0007_auto_20181018_0210'),
    ]

    operations = [
        migrations.AddField(
            model_name='channel',
            name='channel_url',
            field=models.SlugField(blank=True, null=True, unique=True),
        ),
        migrations.AddField(
            model_name='channel',
            name='topic',
            field=models.TextField(blank=True, max_length=40, null=True),
        ),
        migrations.AlterField(
            model_name='channel',
            name='channel_name',
            field=models.TextField(db_index=True, unique=True),
        ),
    ]
