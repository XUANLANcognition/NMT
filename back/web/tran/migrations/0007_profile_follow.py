# Generated by Django 2.1.2 on 2019-05-03 15:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tran', '0006_auto_20190502_0606'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='follow',
            field=models.ManyToManyField(related_name='followed_by', to='tran.Profile'),
        ),
    ]