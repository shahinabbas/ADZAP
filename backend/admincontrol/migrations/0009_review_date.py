# Generated by Django 5.0 on 2024-01-04 15:33

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('admincontrol', '0008_rename_star_review_stars'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='date',
            field=models.TimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
