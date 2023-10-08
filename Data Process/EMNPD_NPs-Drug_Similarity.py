import pandas as pd
from rdkit import Chem
from rdkit.Chem import AllChem

# Read the two SDF files and extract the molecule names
my_db = Chem.SDMolSupplier('EMNPD NPs SDF.sdf')
my_db_names = [mol.GetProp('_Name') for mol in my_db if mol is not None]

approved_drugs = Chem.SDMolSupplier('approved drug.sdf')
approved_drugs_names = [mol.GetProp('_Name') for mol in approved_drugs if mol is not None]

# Generate fingerprints for both sets of molecules
my_db_fps = [AllChem.GetMorganFingerprint(mol, 2) for mol in my_db if mol is not None]
approved_drugs_fps = [AllChem.GetMorganFingerprint(mol, 2) for mol in approved_drugs if mol is not None]

# Calculate Tanimoto similarity between all pairs of molecules and store in a DataFrame
similarity_matrix = []
for i in range(len(my_db_fps)):
    similarity_row = []
    for j in range(len(approved_drugs_fps)):
        similarity_row.append(AllChem.DataStructs.TanimotoSimilarity(my_db_fps[i], approved_drugs_fps[j]))
    similarity_matrix.append(similarity_row)

df = pd.DataFrame(similarity_matrix, index=my_db_names, columns=approved_drugs_names)

# Select the top_n most similar molecules for each molecule in the database
top_n = 10
result_df = pd.DataFrame(columns=['Molecule', 'Similar Molecule', 'Similarity'])
for i in range(len(my_db_fps)):
    sorted_indices = df.iloc[i].sort_values(ascending=False).index.map(lambda x: approved_drugs_names.index(x))[:top_n]
    top_similarities = df.iloc[i][sorted_indices]
    for j in range(len(sorted_indices)):
        row = [my_db_names[i], approved_drugs_names[sorted_indices[j]], top_similarities[j]]
        # Store the top_n most similar molecules in a DataFrame
        top_similar_df = pd.DataFrame([row], columns=['Molecule', 'Similar Molecule', 'Similarity'])
        result_df = pd.concat([result_df, top_similar_df])

# Save the results to an Excel file
result_df.to_excel('NP-drug_similarity.xlsx', index=False)



