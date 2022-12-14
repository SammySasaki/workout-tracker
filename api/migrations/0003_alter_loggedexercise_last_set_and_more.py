# Generated by Django 4.0.6 on 2022-08-02 22:21

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_loggedexercise_last_set_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='loggedexercise',
            name='last_set',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), blank=True, default=list, size=2, verbose_name='weight(lbs), reps'),
        ),
        migrations.AlterField(
            model_name='loggedexercise',
            name='max_set',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), blank=True, default=list, size=2, verbose_name='weight(lbs), reps'),
        ),
    ]
