# Generated by Django 4.2.7 on 2023-11-30 13:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0002_rename_from_user_customerchat_is_read_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customerchat',
            name='group_name',
        ),
    ]