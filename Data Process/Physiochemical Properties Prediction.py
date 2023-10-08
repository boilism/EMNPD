from rdkit import Chem
from rdkit.Chem import Crippen, Lipinski, Descriptors
from rdkit.Chem.rdMolDescriptors import CalcMolFormula
import pandas as pd

file = 'EMNPD NPs SDF.sdf'
suppl = Chem.SDMolSupplier(file)
Result = []

for mol in suppl:
    if mol is not None:
        Alogp = round(Crippen.MolLogP(mol), 1)
        name = mol.GetProp('_Name')
        Smiles = Chem.MolToSmiles(mol)  #SMILES
        Formula = CalcMolFormula(mol)
        Molecular_Weight = round(Descriptors.MolWt(mol),2)
        Inchi = Chem.MolToInchi(mol)   #InChI
        Inchikey = Chem.InchiToInchiKey(Inchi)   #InChIKey
        Alogp = round(Crippen.MolLogP(mol),1)    #LogP
        TPSA = round(Descriptors.TPSA(mol),1)   #TPSA
        HBD = Lipinski.NumHDonors(mol)   #NumHDonors
        HBA = Lipinski.NumHAcceptors(mol)       #NumHAcceptors
        Molecular_Mass = round(Descriptors.ExactMolWt(mol),4)  #ExactMolWt
        Rotatable_Bonds = Chem.Lipinski.NumRotatableBonds(mol)  #NumRotatableBonds
        Ring_Count = Chem.Lipinski.RingCount(mol)  #RingCount
        Heavy_Atom_Count = Chem.Lipinski.HeavyAtomCount(mol)  #HeavyAtomCount
        Result.append({"name": name, "Smiles": Smiles, "Formula": Formula, "Molecular_Weight": Molecular_Weight,
                       "Inchi": Inchi, "Inchikey": Inchikey, "Alogp": Alogp,
                       "TPSA": TPSA, "HBD": HBD, "HBA": HBA, "Molecular_Mass": Molecular_Mass,
                       "Rotatable_Bonds": Rotatable_Bonds, "Ring_Count": Ring_Count,
                       "Heavy_Atom_Count": Heavy_Atom_Count})

df = pd.DataFrame(Result)
df.to_excel('result.xlsx', index=False, engine='openpyxl')


