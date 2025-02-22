# Generated by Django 3.0.6 on 2020-05-25 14:48

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('duckevents', '0003_add_food_types'),
    ]

    operations = [
        migrations.AddField(
            model_name='feedentry',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='country',
            name='code',
            field=models.CharField(max_length=10, unique=True),
        ),
    ]
