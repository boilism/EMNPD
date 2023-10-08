import pandas as pd
from tqdm import tqdm
from STOUT import translate_forward

test_set = pd.read_csv('test set.csv')
SMILES = test_set['SMILES'].tolist()
IUPAC = test_set['IUPAC'].tolist()

predicted_IUPAC = [translate_forward(smiles) for smiles in tqdm(SMILES, desc="Translating")]

correct_predictions = sum([
    str(predicted).replace(" ", "") == str(actual).replace(" ", "")
    for predicted, actual in zip(predicted_IUPAC, IUPAC)
])
accuracy = correct_predictions / len(IUPAC)

print(f"Accuracy: {accuracy * 100:.2f}%")

df = pd.DataFrame({"SMILES": SMILES, "Predicted IUPAC": predicted_IUPAC, "Actual IUPAC": IUPAC})
df.to_excel('IUPAC_predictions.xlsx', index=False)
