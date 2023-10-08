import pandas as pd
from rdkit import Chem
from rdkit.Chem import AllChem

suppl = Chem.SDMolSupplier('EMNPD NPs SDF.sdf')
names = [mol.GetProp('_Name') for mol in suppl if mol is not None]

suppl = Chem.SDMolSupplier('EMNPD NPs SDF.sdf')
fps = [AllChem.GetMorganFingerprint(mol, 2) for mol in suppl if mol is not None]

similarity_matrix = []
for i in range(len(fps)):
    similarity_row = []
    for j in range(len(fps)):
        similarity_row.append(AllChem.DataStructs.TanimotoSimilarity(fps[i], fps[j]))
    similarity_matrix.append(similarity_row)

df = pd.DataFrame(similarity_matrix, index=names, columns=names)

top_n = 11
result_df = pd.DataFrame(columns=['Molecule', 'Similar Molecule', 'Similarity'])
for i in range(len(fps)):
    sorted_indices = df.iloc[i].sort_values(ascending=False).index.map(lambda x: names.index(x))[:top_n]
    top_similarities = df.iloc[i][sorted_indices]
    for j in range(1, len(sorted_indices)):
        if names[i] == names[sorted_indices[j]]:
            continue
        row = [names[i], names[sorted_indices[j]], top_similarities[j]]
        # 将每个化合物相似度前十的化合物存储到一个DataFrame中
        top_similar_df = pd.DataFrame([row], columns=['Molecule', 'Similar Molecule', 'Similarity'])
        result_df = pd.concat([result_df, top_similar_df])

result_df.to_excel('NPs-Nps_similarity.xlsx', index=False)


