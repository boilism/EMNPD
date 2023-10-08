# Generated by Django 4.1 on 2023-05-23 06:30

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Endophyte_Data',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('EMNPD_SID', models.CharField(max_length=12)),
                ('Endophyte_Name', models.CharField(max_length=50)),
                ('Tax_ID', models.CharField(max_length=12)),
                ('Superkingdom', models.CharField(max_length=25)),
                ('Kingdom', models.CharField(max_length=25)),
                ('Phylum', models.CharField(max_length=25)),
                ('Class', models.CharField(max_length=25)),
                ('Order', models.CharField(max_length=25)),
                ('Family', models.CharField(max_length=25)),
                ('Genus', models.CharField(max_length=25)),
                ('GenBank_ID', models.CharField(max_length=12)),
                ('Closest_GenBank_ID', models.CharField(max_length=12)),
                ('Endophyte_Type', models.CharField(max_length=25)),
            ],
        ),
        migrations.CreateModel(
            name='NPs_ADMETlab',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('EMNPD_CID', models.CharField(max_length=12)),
                ('Caco_2', models.CharField(max_length=25)),
                ('MDCK', models.CharField(max_length=25)),
                ('Pgp_inh', models.CharField(max_length=25)),
                ('Pgp_sub', models.CharField(max_length=25)),
                ('HIA', models.CharField(max_length=25)),
                ('F_20', models.CharField(max_length=25)),
                ('F_30', models.CharField(max_length=25)),
                ('BBB', models.CharField(max_length=25)),
                ('PPB', models.CharField(max_length=25)),
                ('VDss', models.CharField(max_length=25)),
                ('Fu', models.CharField(max_length=25)),
                ('CYP1A2_inh', models.CharField(max_length=25)),
                ('CYP1A2_sub', models.CharField(max_length=25)),
                ('CYP2C19_inh', models.CharField(max_length=25)),
                ('CYP2C19_sub', models.CharField(max_length=25)),
                ('CYP2C9_inh', models.CharField(max_length=25)),
                ('CYP2C9_sub', models.CharField(max_length=25)),
                ('CYP2D6_inh', models.CharField(max_length=25)),
                ('CYP2D6_sub', models.CharField(max_length=25)),
                ('CYP3A4_inh', models.CharField(max_length=25)),
                ('CYP3A4_sub', models.CharField(max_length=25)),
                ('CL', models.CharField(max_length=25)),
                ('T12', models.CharField(max_length=25)),
                ('hERG', models.CharField(max_length=25)),
                ('H_HT', models.CharField(max_length=25)),
                ('DILI', models.CharField(max_length=25)),
                ('Ames', models.CharField(max_length=25)),
                ('ROA', models.CharField(max_length=25)),
                ('FDAMDD', models.CharField(max_length=25)),
                ('SkinSen', models.CharField(max_length=25)),
                ('Carcinogenicity', models.CharField(max_length=25)),
                ('EC', models.CharField(max_length=25)),
                ('EI', models.CharField(max_length=25)),
                ('Respiratory', models.CharField(max_length=25)),
                ('Reference', models.CharField(max_length=25)),
            ],
        ),
        migrations.CreateModel(
            name='NPs_ClassyFire',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('EMNPD_CID', models.CharField(max_length=12)),
                ('Kingdrom', models.CharField(max_length=25)),
                ('Superclass', models.CharField(max_length=25)),
                ('Class', models.CharField(max_length=25)),
                ('Subclass', models.CharField(max_length=25)),
                ('Direct_Parent', models.CharField(max_length=25)),
            ],
        ),
        migrations.CreateModel(
            name='NPs_Drug_Similarity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('EMNPD_CID', models.CharField(max_length=12)),
                ('Similar_Drug_Top_1', models.CharField(max_length=12)),
                ('Similar_Drug_Top_2', models.CharField(max_length=12)),
                ('Similar_Drug_Top_3', models.CharField(max_length=12)),
                ('Similar_Drug_Top_4', models.CharField(max_length=12)),
                ('Similar_Drug_Top_5', models.CharField(max_length=12)),
                ('Similar_Drug_Top_6', models.CharField(max_length=12)),
                ('Similar_Drug_Top_7', models.CharField(max_length=12)),
                ('Similar_Drug_Top_8', models.CharField(max_length=12)),
                ('Similar_Drug_Top_9', models.CharField(max_length=12)),
                ('Similar_Drug_Top_10', models.CharField(max_length=12)),
                ('Similarity_Score_Top_1', models.FloatField()),
                ('Similarity_Score_Top_2', models.FloatField()),
                ('Similarity_Score_Top_3', models.FloatField()),
                ('Similarity_Score_Top_4', models.FloatField()),
                ('Similarity_Score_Top_5', models.FloatField()),
                ('Similarity_Score_Top_6', models.FloatField()),
                ('Similarity_Score_Top_7', models.FloatField()),
                ('Similarity_Score_Top_8', models.FloatField()),
                ('Similarity_Score_Top_9', models.FloatField()),
                ('Similarity_Score_Top_10', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='NPs_NPs_Similarity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('EMNPD_CID', models.CharField(max_length=12)),
                ('Similar_NP_Top_1', models.CharField(max_length=12)),
                ('Similar_NP_Top_2', models.CharField(max_length=12)),
                ('Similar_NP_Top_3', models.CharField(max_length=12)),
                ('Similar_NP_Top_4', models.CharField(max_length=12)),
                ('Similar_NP_Top_5', models.CharField(max_length=12)),
                ('Similar_NP_Top_6', models.CharField(max_length=12)),
                ('Similar_NP_Top_7', models.CharField(max_length=12)),
                ('Similar_NP_Top_8', models.CharField(max_length=12)),
                ('Similar_NP_Top_9', models.CharField(max_length=12)),
                ('Similar_NP_Top_10', models.CharField(max_length=12)),
                ('Similarity_Score_Top_1', models.FloatField()),
                ('Similarity_Score_Top_2', models.FloatField()),
                ('Similarity_Score_Top_3', models.FloatField()),
                ('Similarity_Score_Top_4', models.FloatField()),
                ('Similarity_Score_Top_5', models.FloatField()),
                ('Similarity_Score_Top_6', models.FloatField()),
                ('Similarity_Score_Top_7', models.FloatField()),
                ('Similarity_Score_Top_8', models.FloatField()),
                ('Similarity_Score_Top_9', models.FloatField()),
                ('Similarity_Score_Top_10', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='NPs_Physi_Chem_Properties',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('EMNPD_CID', models.CharField(max_length=12)),
                ('PubChem_CID', models.CharField(max_length=255)),
                ('NP_Name', models.TextField()),
                ('CAS', models.CharField(max_length=16)),
                ('ChEMBL_ID', models.CharField(max_length=16)),
                ('NP_Synonyms', models.TextField()),
                ('Molecular_Formula', models.CharField(max_length=12)),
                ('Molecular_Weight', models.FloatField()),
                ('Molecular_Weight_source', models.CharField(max_length=255)),
                ('Isomeric_Smiles', models.TextField()),
                ('Inchi', models.TextField()),
                ('Inchikey', models.TextField()),
                ('Iupac_name', models.TextField()),
                ('Iupac_name_source', models.CharField(max_length=255)),
                ('Alogp', models.FloatField()),
                ('Alogp_source', models.CharField(max_length=255)),
                ('Molecular_Mass', models.FloatField()),
                ('Molecular_Mass_source', models.CharField(max_length=255)),
                ('TPSA', models.FloatField()),
                ('TPSA_source', models.CharField(max_length=255)),
                ('Hbond_Donor', models.IntegerField()),
                ('Hbond_Donor_source', models.CharField(max_length=255)),
                ('Hbond_Acceptor', models.IntegerField()),
                ('Hbond_Acceptor_source', models.CharField(max_length=255)),
                ('Rotatable_Bond', models.IntegerField()),
                ('Rotatable_Bond_source', models.CharField(max_length=255)),
                ('Heavy_Atom', models.IntegerField()),
                ('Heavy_Atom_source', models.CharField(max_length=255)),
                ('Aromatic_Rings', models.IntegerField()),
                ('Aromatic_Rings_source', models.CharField(max_length=255)),
                ('QED_Weighted', models.FloatField()),
                ('QED_Weighted_source', models.CharField(max_length=255)),
                ('Lipskin', models.CharField(max_length=12)),
                ('Lipskin_source', models.CharField(max_length=255)),
                ('num_endophyte', models.IntegerField()),
                ('num_targets', models.IntegerField()),
                ('num_activity_records', models.IntegerField()),
                ('num_activity', models.IntegerField()),
            ],
        ),
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
        migrations.CreateModel(
            name='Target_Organism',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('EMNPD_TOID', models.CharField(max_length=25)),
                ('Target_Organism_Name', models.CharField(max_length=25)),
                ('Target_Type', models.CharField(max_length=25)),
                ('Tax_ID', models.CharField(max_length=25)),
                ('Superkingdom', models.CharField(max_length=25)),
                ('Kingdom', models.CharField(max_length=25)),
                ('Phylum', models.CharField(max_length=25)),
                ('Class', models.CharField(max_length=25)),
                ('Order', models.CharField(max_length=25)),
                ('Family', models.CharField(max_length=25)),
                ('Genus', models.CharField(max_length=25)),
            ],
        ),
        migrations.CreateModel(
            name='Target_Protein',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('EMNPD_TPID', models.CharField(max_length=25)),
                ('Protein_Name', models.CharField(max_length=25)),
                ('Target_Type', models.CharField(max_length=25)),
                ('Target_Organism_ID', models.CharField(max_length=25)),
                ('Target_Organism_Name', models.CharField(max_length=25)),
                ('UniProt_ID', models.CharField(max_length=25)),
                ('ChEMBL_ID', models.CharField(max_length=25)),
                ('Protein_superfamily', models.CharField(max_length=25)),
                ('Protein_family', models.CharField(max_length=25)),
                ('Protein_subfamily', models.CharField(max_length=25)),
            ],
        ),
        migrations.CreateModel(
            name='Whole_Data',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('PMID', models.CharField(max_length=12)),
                ('EMNPD_SID', models.CharField(max_length=12)),
                ('Endophyte_Name', models.CharField(max_length=50)),
                ('Endophyte_Type', models.CharField(max_length=25)),
                ('Plant_Material', models.TextField()),
                ('Fermentation', models.TextField()),
                ('Fermentation_Index', models.IntegerField()),
                ('Extract_Activity', models.CharField(max_length=255)),
                ('EMNPD_CID', models.CharField(max_length=12)),
                ('NP_Name', models.CharField(max_length=255)),
                ('Molecular_Formula', models.CharField(max_length=12)),
                ('Compound_Content', models.CharField(max_length=25)),
                ('Compound_Content_Value', models.CharField(max_length=25)),
                ('Content_Unit', models.CharField(max_length=12)),
                ('Active_Size', models.CharField(max_length=50)),
                ('Activity', models.CharField(default='NA', max_length=25)),
                ('EMNPD_TOID', models.CharField(max_length=12)),
                ('Target_Organism_Name', models.CharField(max_length=50)),
                ('EMNPD_TID', models.CharField(max_length=12)),
                ('Target_Name', models.CharField(max_length=50)),
                ('Target_Type', models.CharField(max_length=25)),
                ('Assay_Description', models.TextField()),
                ('Activity_Type', models.CharField(max_length=25)),
                ('Compound_Concentration', models.CharField(max_length=25)),
                ('Concentration_Unit', models.CharField(max_length=12)),
                ('Activity_Values', models.CharField(max_length=25)),
                ('Control_Name', models.CharField(max_length=50)),
                ('Control_Activity_Values', models.CharField(max_length=25)),
                ('Activity_Unit', models.CharField(max_length=12)),
            ],
        ),
    ]