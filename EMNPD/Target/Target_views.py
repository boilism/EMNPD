from django.shortcuts import render
from NaturalProduct.models import Target_Cell_Line, Whole_Data, Target_Protein, Target_Organism
from django.http import JsonResponse


def Target_Cell_Line_detail(request,ent_id):
    target_cell_line_detail = Target_Cell_Line.objects.filter(EMNPD_TCID=ent_id).first()
    return render(request, 'target_cell_line_detail.html', {'Target_Cell_Line': target_cell_line_detail,
                                                            })
def target_active_json(request,ent_id):
    #target_active = Whole_Data.objects.filter(EMNPD_TID=ent_id).exclude(Active_Size__in=['NA', 'Inactive'])
    if ent_id[:4] == 'ENTO':
        target_active = Whole_Data.objects.filter(EMNPD_TOID=ent_id).exclude(Active_Size__in=['NA'])
    else:
        target_active = Whole_Data.objects.filter(EMNPD_TID=ent_id).exclude(Active_Size__in=['NA'])
    list1 = []
    for i in target_active:
        list1.append({
            'EMNPD_SID': i.EMNPD_SID,
            'Endophyte_Name': i.Endophyte_Name,
            'NPs_ID': i.EMNPD_CID,
            'NPs_Name': i.NP_Name,
            'Target_ID': i.EMNPD_TID,
            'Target_Name': i.Target_Name,
            'Target_Type': i.Target_Type,
            'Activity_Label': i.Active_Size,
            'Activity_Name': i.Activity,
            'Activity_Type': i.Activity_Type,
            'Value': i.Activity_Values,
            'Value_2': i.Activity_Values_2,
            'Unit': i.Activity_Unit,
            'NPs_Concentration': i.Compound_Concentration,
            'Concentration_Unit': i.Concentration_Unit,
            'Assay_Description': i.Assay_Description,
            'Control_Name': i.Control_Name,
            'Control_Activity_Values': i.Control_Activity_Values,
            'Reference': i.PMID
        })
    #去重list1字典
    list1 = [dict(t) for t in set([tuple(d.items()) for d in list1])]
    for d in list1:
        pmid = d['Reference']
        EMNPD_SID = d['EMNPD_SID']
        NPs_ID = d['NPs_ID']
        d['EMNPD_SID'] = '<a href="/emnpd/species/' + EMNPD_SID + '/">' + EMNPD_SID + '</a>'
        d['Reference'] = '<a href="https://pubmed.ncbi.nlm.nih.gov/' + pmid + '/"">' + pmid + '</a>'
        if int(NPs_ID[3:]) < 6152 and int(NPs_ID[3:]) != 5304 and int(NPs_ID[3:]) != 5310:
            d['NPs_ID'] = '<a href="/emnpd/naturalproducts/' + NPs_ID + '">' + NPs_ID + '</a>'
        else:
            d['NPs_ID'] = NPs_ID
        if d['Target_Type'] == 'CELL LINE':
            d['Target_ID'] = '<a href="/emnpd/target/cell_line/' + d['Target_ID'] + '/">' + d['Target_ID'] + '</a>'
        elif d['Target_Type'] == 'PROTEIN':
            d['Target_ID'] = '<a href="/emnpd/target/protein/' + d['Target_ID'] + '/">' + d['Target_ID'] + '</a>'
        elif d['Target_Type'] == 'ORGANISM':
            d['Target_ID'] = '<a href="/emnpd/target/species/' + d['Target_ID'] + '/">' + d['Target_ID'] + '</a>'


    data = {'data': list1}
    return JsonResponse(data)
def target_inactive_json(request,ent_id):
    target_inactive = Whole_Data.objects.filter(EMNPD_TID=ent_id, Active_Size='Inactive')
    list1 = []
    for i in target_inactive:
        list1.append({
            'EMNPD_SID': i.EMNPD_SID,
            'Endophyte_Name': i.Endophyte_Name,
            'NPs_ID': i.EMNPD_CID,
            'NPs_Name': i.NP_Name,
            'Activity_Label': i.Active_Size,
            'Activity_Name': i.Activity,
            'Activity_Type': i.Activity_Type,
            'Value': i.Activity_Values,
            'Unit': i.Activity_Unit,
            'NPs_Concentration': i.Compound_Concentration,
            'Concentration_Unit': i.Concentration_Unit,
            'Assay_Description': i.Assay_Description,
            'Control_Name': i.Control_Name,
            'Control_Activity_Values': i.Control_Activity_Values,
            'Reference': i.PMID
        })
    list1 = [dict(t) for t in set([tuple(d.items()) for d in list1])]
    for d in list1:
        pmid = d['Reference']
        EMNPD_SID = d['EMNPD_SID']
        NPs_ID = d['NPs_ID']
        d['EMNPD_SID'] = '<a href="/emnpd/species/' + EMNPD_SID + '/">' + EMNPD_SID + '</a>'
        d['Reference'] = '<a href="https://pubmed.ncbi.nlm.nih.gov/' + pmid + '/"">' + pmid + '</a>'
        d['NPs_ID'] = '<a href="/emnpd/naturalproducts/' + NPs_ID + '/">' + NPs_ID + '</a>'

    data = {'data': list1}
    return JsonResponse(data)



def Target_Protein_detail(request,ent_id):
    target_protein_detail = Target_Protein.objects.filter(EMNPD_TPID=ent_id).first()
    return render(request, 'target_protein_detail.html', {'Target_Protein': target_protein_detail,
                                                            })
def Target_Species(request,ent_id):
    target_species = Target_Organism.objects.filter(EMNPD_TOID=ent_id).first()
    return render(request, 'target_species.html', {'Target_Species': target_species
        ,})

def Target_Search_Result(request):
    return render(request, 'target_search_result.html')