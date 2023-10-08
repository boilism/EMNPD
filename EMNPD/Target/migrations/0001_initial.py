# Generated by Django 4.1 on 2023-04-22 02:46

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Target_Cell_Line',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('EMNPD_TCID', models.CharField(max_length=25)),
                ('Cell_Line_Name', models.CharField(max_length=25)),
                ('Target_Type', models.CharField(max_length=25)),
                ('Cell_Type', models.CharField(max_length=25)),
                ('Cell_Line_Classification', models.CharField(max_length=25)),
                ('Synonyms', models.TextField()),
                ('Target_Organism_ID', models.CharField(max_length=25)),
                ('Target_Organism_Name', models.CharField(max_length=25)),
                ('Cellosaurus_ID', models.CharField(max_length=25)),
                ('Chembl_Cell_ID', models.CharField(max_length=25)),
                ('Chembl_Target_ID', models.CharField(max_length=25)),
                ('Cell_Line_Ontology', models.CharField(max_length=25)),
                ('Experimental_Factor_Ontology', models.CharField(max_length=25)),
                ('LINCS_Project', models.CharField(max_length=25)),
            ],
        ),
    ]