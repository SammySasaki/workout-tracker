# Generated by Django 4.0.6 on 2022-08-03 16:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_loggedexercise_last_set_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='workout',
            name='id',
            field=models.BigAutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='workout',
            name='name',
            field=models.CharField(blank=True, default='Workout <django.db.models.fields.BigAutoField>', max_length=20),
        ),
    ]