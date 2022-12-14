# Generated by Django 4.0.6 on 2022-08-03 23:08

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_workout_id_alter_workout_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='loggedexercise',
            name='last_set',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(blank=True, default=0), blank=True, default=[0, 0], size=2, verbose_name='last: weight(lbs), reps'),
        ),
        migrations.AlterField(
            model_name='loggedexercise',
            name='max_set',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(blank=True, default=0), blank=True, default=[0, 0], size=2, verbose_name='max: weight(lbs), reps'),
        ),
    ]
