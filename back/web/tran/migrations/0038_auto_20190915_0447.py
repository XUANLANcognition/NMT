# Generated by Django 2.2.3 on 2019-09-15 04:47

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('tran', '0037_followrela'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='followrela',
            unique_together={('user', 'follow')},
        ),
    ]
