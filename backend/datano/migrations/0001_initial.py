# Generated by Django 4.1.7 on 2023-03-04 18:23

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Instruction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('createdAt', models.TextField()),
                ('completedAt', models.TextField()),
                ('status', models.TextField()),
                ('instru', models.TextField()),
                ('urgency', models.TextField()),
                ('typeInstru', models.TextField()),
                ('api_key', models.TextField()),
            ],
        ),
    ]
