# Generated by Django 3.1.5 on 2021-01-08 08:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='todo',
            old_name='descriptions',
            new_name='description',
        ),
    ]
