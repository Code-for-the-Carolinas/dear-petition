# Generated by Django 2.2.24 on 2021-12-08 05:33

from django.db import migrations, models
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):

    dependencies = [
        ("petition", "0039_auto_20210714_0348"),
    ]

    operations = [
        migrations.CreateModel(
            name="GeneratedPetition",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "created",
                    model_utils.fields.AutoCreatedField(
                        default=django.utils.timezone.now,
                        editable=False,
                        verbose_name="created",
                    ),
                ),
                (
                    "modified",
                    model_utils.fields.AutoLastModifiedField(
                        default=django.utils.timezone.now,
                        editable=False,
                        verbose_name="modified",
                    ),
                ),
                ("username", models.CharField(max_length=255)),
                (
                    "form_type",
                    models.CharField(
                        choices=[
                            ("AOC-CR-281", "AOC-CR-281"),
                            ("AOC-CR-285", "AOC-CR-285"),
                            ("AOC-CR-287", "AOC-CR-287"),
                            ("AOC-CR-288", "AOC-CR-288"),
                            ("AOC-CR-293", "AOC-CR-293"),
                        ],
                        max_length=255,
                    ),
                ),
                ("number_of_charges", models.IntegerField()),
                ("batch_id", models.PositiveIntegerField()),
            ],
            options={
                "abstract": False,
            },
        ),
    ]
