# Generated by Django 4.2.7 on 2023-12-14 02:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='notification',
            options={},
        ),
        migrations.AddField(
            model_name='notification',
            name='chat',
            field=models.ForeignKey(default=12581, on_delete=django.db.models.deletion.CASCADE, to='chat.customerchat'),
            preserve_default=False,
        ),
    ]