from .models import NPs_Physi_Chem_Properties, NPs_ClassyFire, NPs_ADMETlab, Endophyte_Data, Whole_Data, NPs_NPs_Similarity, NPs_Drug_Similarity
from django.shortcuts import render
from django.http import JsonResponse
import json

def naturalproduct_detail(request, enc_id):
    np_Physi_Chem_Properties_details = NPs_Physi_Chem_Properties.objects.filter(EMNPD_CID=enc_id).first()
    np_ClassyFire_details = NPs_ClassyFire.objects.filter(EMNPD_CID=enc_id).first()
    np_ADMETlab_details = NPs_ADMETlab.objects.filter(EMNPD_CID=enc_id).first()
    np_Whole_Data_details = Whole_Data.objects.filter(EMNPD_CID=enc_id).first()
    np_np_similarity = NPs_NPs_Similarity.objects.filter(EMNPD_CID=enc_id).first()
    np_drug_similarity = NPs_Drug_Similarity.objects.filter(EMNPD_CID=enc_id).first()
    target_active = Whole_Data.objects.filter(EMNPD_CID=enc_id).exclude(Active_Size__in=['NA'])
    list_bioactivity = []
    list_bioactivity_type = []
    list_target_organism = []
    list_target_organism_id = []
    list1 = []
    for i in target_active:
        list1.append({
            'EMNPD_SID': i.EMNPD_SID,
            'Endophyte_Name': i.Endophyte_Name,
            'Target_ID': i.EMNPD_TID,
            'Target_Name': i.Target_Name,
            'Target_Type': i.Target_Type,
            'Target_Organism': i.Target_Organism_Name,
            'Target_Organism_ID': i.EMNPD_TOID,
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

    #去重list1字典
    list1 = [dict(t) for t in set([tuple(d.items()) for d in list1])]
    #统计list1中的bioactivity、bioactivity_type、target_organism的数量
    for i in list1:
        list_bioactivity.append(i['Activity_Name'])
        list_bioactivity_type.append(i['Activity_Type'])
        list_target_organism.append(i['Target_Organism'])
        if i['Target_Organism_ID'] != 'NA':
            list_target_organism_id.append('http://127.0.0.1:8000/emnpd/target/species/' + i['Target_Organism_ID'] + '/')
        else:
            list_target_organism_id.append('NA')

    list_bioactivity_count = []
    for i in list_bioactivity:
        count = list_bioactivity.count(i)
        list_bioactivity_count.append({'value': count, 'name': i})

    list_bioactivity_type_count = []
    for i in list_bioactivity_type:
        count = list_bioactivity_type.count(i)
        list_bioactivity_type_count.append({'value': count, 'name': i})

    list_target_organism_count = []
    for i,j in zip(list_target_organism, list_target_organism_id):
        count = list_target_organism.count(i)
        if j == 'NA':
            list_target_organism_count.append({'value': count, 'name': i})
        else:
            list_target_organism_count.append({'value': count, 'name': i, 'url': j})

    #对list_bioactivity_count去重
    list_bioactivity_count = [dict(t) for t in set([tuple(d.items()) for d in list_bioactivity_count])]
    #对list_bioactivity_type_count去重
    list_bioactivity_type_count = [dict(t) for t in set([tuple(d.items()) for d in list_bioactivity_type_count])]
    #对list_target_organism_count去重
    list_target_organism_count = [dict(t) for t in set([tuple(d.items()) for d in list_target_organism_count])]

    json_data_bioactivity = json.dumps(list_bioactivity_count)
    json_data_bioactivity_type = json.dumps(list_bioactivity_type_count)
    json_data_target_organism = json.dumps(list_target_organism_count)
    return render(request, 'naturalproduct_detail.html', {'NP_Physi_Chem_Properties': np_Physi_Chem_Properties_details,
                                                          'NP_ClassyFire': np_ClassyFire_details,
                                                          'NPs_ADMETlab': np_ADMETlab_details,
                                                          'NPs_Whole_Data': np_Whole_Data_details,
                                                          'NPs_NPs_Similarity': np_np_similarity,
                                                          'NPs_Drug_Similarity': np_drug_similarity,
                                                          'data_bioactivity': json_data_bioactivity,
                                                          'data_bioactivity_type': json_data_bioactivity_type,
                                                          'data_target_organism': json_data_target_organism})

def species_source_json(request, enc_id):
    endophyte_id = Whole_Data.objects.filter(EMNPD_CID=enc_id)
    list1_endophyte_id = []
    for i in endophyte_id:
        list1_endophyte_id.append(i.EMNPD_SID)
    list1_endophyte_id = list(set(list1_endophyte_id))
    species_details = Endophyte_Data.objects.filter(EMNPD_SID__in=list1_endophyte_id).distinct()
    list1 = []
    for detail in species_details:
        list1.append({
            'Endophyte_ID': detail.EMNPD_SID,
            'Endophyte_Name': detail.Endophyte_Name,
            'Family': detail.Family,
            'Genus': detail.Genus,
            'Taxonomy_ID': detail.Tax_ID,
            'GenBank_ID': detail.GenBank_ID,
            'Closest_GenBank_ID': detail.Closest_GenBank_ID
        })

    list2 = []
    species_whole_data = Whole_Data.objects.filter(EMNPD_CID=enc_id, EMNPD_SID__in=list1_endophyte_id)
    for i in species_whole_data:
        list2.append({
            'Endophyte_ID': i.EMNPD_SID,
            'Reference': i.PMID,
            'Plant_Material': i.Plant_Material
        })

    merged_list = []
    for item1 in list1:
        found = False
        for item2 in list2:
            if item1['Endophyte_ID'] == item2['Endophyte_ID']:
                merged_dict = {**item1, **item2}
                merged_list.append(merged_dict)
                found = True
                break
        if not found:
            merged_list.append(item1)

    for item2 in list2:
        found = False
        for item in merged_list:
            if item['Endophyte_ID'] == item2['Endophyte_ID']:
                found = True
                break
        if not found:
            merged_list.append(item2)

    for d in merged_list:
        pmid = d['Reference']
        genbank = d['GenBank_ID']
        closet_genbank = d['Closest_GenBank_ID']
        tax_id = d['Taxonomy_ID']
        Endophyte_ID = d['Endophyte_ID']
        d['Reference'] = '<a href="https://pubmed.ncbi.nlm.nih.gov/' + pmid + '/"">' + pmid + '</a>'
        d['Endophyte_ID'] = '<a href="/emnpd/species/' + Endophyte_ID + '/">' + Endophyte_ID + '</a>'
        if genbank != "NA":
            d['GenBank_ID'] = '<a href="https://www.ncbi.nlm.nih.gov/nuccore/' + genbank + '/"">' + genbank + '</a>'
        if closet_genbank != "NA":
            d['Closest_GenBank_ID'] = '<a href="https://www.ncbi.nlm.nih.gov/nuccore/' + closet_genbank + '/"">' + closet_genbank + '</a>'
        if tax_id != "NA":
            d['Taxonomy_ID'] = '<a href="https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=' + tax_id + '">' + tax_id + '</a>'


    data = {'data': merged_list}
    return JsonResponse(data)

def target_active_json(request, enc_id):
    #target_active = Whole_Data.objects.filter(EMNPD_CID=enc_id).exclude(Active_Size__in=['NA', 'Inactive'])
    target_active = Whole_Data.objects.filter(EMNPD_CID=enc_id).exclude(Active_Size__in=['NA'])
    list1 = []
    for i in target_active:
        list1.append({
            'EMNPD_SID': i.EMNPD_SID,
            'Endophyte_Name': i.Endophyte_Name,
            'Target_ID': i.EMNPD_TID,
            'Target_Name': i.Target_Name,
            'Target_Type': i.Target_Type,
            'Target_Organism': i.Target_Organism_Name,
            'Target_Organism_ID': i.EMNPD_TOID,
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
    #对list_bioactivity的内容统计并去重，将统计结果放入list_bioactivity_count


    for d in list1:
        pmid = d['Reference']
        EMNPD_SID = d['EMNPD_SID']
        d['EMNPD_SID'] = '<a href="/emnpd/species/' + EMNPD_SID + '/">' + EMNPD_SID + '</a>'
        d['Reference'] = '<a href="https://pubmed.ncbi.nlm.nih.gov/' + pmid + '/"">' + pmid + '</a>'
        if d['Target_Organism_ID'] != 'NA':
            d['Target_Organism_ID'] = '<a href="/emnpd/target/species/' + d['Target_Organism_ID'] + '/">' + d['Target_Organism_ID'] + '</a>'
        if d['Target_Type'] == 'CELL LINE':
            d['Target_ID'] = '<a href="/emnpd/target/cell_line/' + d['Target_ID'] + '/">' + d['Target_ID'] + '</a>'
        elif d['Target_Type'] == 'PROTEIN':
            d['Target_ID'] = '<a href="/emnpd/target/protein/' + d['Target_ID'] + '/">' + d['Target_ID'] + '</a>'
        elif d['Target_Type'] == 'ORGANISM':
            d['Target_ID'] = '<a href="/emnpd/target/species/' + d['Target_ID'] + '/">' + d['Target_ID'] + '</a>'

    data = {'data': list1}

    return JsonResponse(data)

def target_inactive_json(request, enc_id):
    target_inactive = Whole_Data.objects.filter(EMNPD_CID=enc_id, Active_Size='Inactive')
    list1 = []
    for i in target_inactive:
        list1.append({
            'EMNPD_SID': i.EMNPD_SID,
            'Endophyte_Name': i.Endophyte_Name,
            'Target_ID': i.EMNPD_TID,
            'Target_Name': i.Target_Name,
            'Target_Type': i.Target_Type,
            'Target_Organism': i.Target_Organism_Name,
            'Target_Organism_ID': i.EMNPD_TOID,
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
    #去重list1字典
    list1 = [dict(t) for t in set([tuple(d.items()) for d in list1])]

    for d in list1:
        pmid = d['Reference']
        EMNPD_SID = d['EMNPD_SID']
        d['EMNPD_SID'] = '<a href="/emnpd/species/' + EMNPD_SID + '/">' + EMNPD_SID + '</a>'
        d['Reference'] = '<a href="https://pubmed.ncbi.nlm.nih.gov/' + pmid + '/"">' + pmid + '</a>'
        if d['Target_Organism_ID'] != 'NA':
            d['Target_Organism_ID'] = '<a href="/emnpd/target/species/' + d['Target_Organism_ID'] + '/">' + d[
                'Target_Organism_ID'] + '</a>'
        if d['Target_Type'] == 'CELL LINE':
            d['Target_ID'] = '<a href="/emnpd/target/cell_line/' + d['Target_ID'] + '/">' + d['Target_ID'] + '</a>'
        elif d['Target_Type'] == 'PROTEIN':
            d['Target_ID'] = '<a href="/emnpd/target/protein/' + d['Target_ID'] + '/">' + d['Target_ID'] + '</a>'
        elif d['Target_Type'] == 'ORGANISM':
            d['Target_ID'] = '<a href="/emnpd/target/species/' + d['Target_ID'] + '/">' + d['Target_ID'] + '</a>'

    data = {'data': list1}
    return JsonResponse(data)

def np_content_json(request, enc_id):
    np_content = Whole_Data.objects.filter(EMNPD_CID=enc_id).exclude(Compound_Content='NA')
    list1 = []
    unit_sum = {}  # Dictionary to store the sumByUnit for each unit
    for i in np_content:
        list1.append({
            'ENS_ID': i.EMNPD_SID,
            'Endophyte_Name': i.Endophyte_Name,
            'Endophyte_Type': i.Endophyte_Type,
            'Fermentation_Index': i.Fermentation_Index,
            'Content_Bar': i.Compound_Content_Value,
            'NP_Content': i.Compound_Content,
            'Content_Unit': i.Content_Unit,
            'Reference': i.PMID,
            'Fermentation_Condition': i.Fermentation,
        })

    # Remove duplicates from list1
    list1 = [dict(t) for t in set([tuple(d.items()) for d in list1])]
    for d in list1:
        pmid = d['Reference']
        ENS_ID = d['ENS_ID']
        d['Reference'] = '<a href="https://pubmed.ncbi.nlm.nih.gov/' + pmid + '/">' + pmid + '</a>'
        d['ENS_ID'] = '<a href="/emnpd/species/' + ENS_ID + '/">' + ENS_ID + '</a>'

    # 根据单位分组数据
    unit_list = []
    for d in list1:
        unit = d['Content_Unit']
        if unit not in unit_list:
            unit_list.append(unit)
    #unit_sum的值为相同单位内的最大值
    for d in list1:
        unit = d['Content_Unit']
        if unit not in unit_sum:
            unit_sum[unit] = 0
        unit_sum[unit] = max(unit_sum[unit], float(d['Content_Bar']))

    '''
    #计算每个单位的总和也就是content_bar的值
    for d in list1:
        unit = d['Content_Unit']
        if unit not in unit_sum:
            unit_sum[unit] = 0
        unit_sum[unit] += float(d['Content_Bar'])
        #将unit_sum加入到list1中
    '''
    for d in list1:
        unit = d['Content_Unit']
        d['unit_sum'] = round(unit_sum[unit], 2)

    unit_data = {}
    unit_mapping = {}  # 单位与数字的映射关系
    for i, unit in enumerate(unit_list):
        unit_data[i] = []  # 初始化每个单位的数据列表
        unit_mapping[unit] = i  # 记录单位和数字的对应关系

    for d in list1:
        unit = d['Content_Unit']
        unit_number = unit_mapping[unit]
        unit_data[unit_number].append(d)

    data = {'data': unit_data}
    print(data)
    return JsonResponse(data)

def species_source_tree(request, enc_id):
    def create_tree(nodes, keys, parent_count=None):
        """
        递归函数，根据节点属性创建树状结构
        """
        if not keys:  # 当前层级的属性列表为空时，不再继续递归
            return []
        key = keys[0]  # 取当前层级的第一个属性
        unique_values = sorted(set(node[key] for node in nodes))  # 获取当前层级属性的唯一值并进行排序
        tree = []
        for value in unique_values:
            children = [node for node in nodes if node[key] == value]  # 获取当前层级属性值为value的节点
            # 如果当前层级的属性列表不为空，则递归创建子树
            if keys[1:]:
                subtree, count = create_tree(children, keys[1:], None)  # 递归创建子树并获取子节点数量
                subtree_with_count = {
                    "name": f"{value} ({count})",  # 在节点名称后面添加子节点数量
                    "value": count,
                    "children": subtree
                }
            else:
                node_id = children[0]['EMNPD_SID']
                subtree_with_count = {
                    "name": value,
                    "value": 1,
                    "link": f"http://127.0.0.1:8000/emnpd/species/{node_id}"  # 将ID放入链接
                }

            tree.append(subtree_with_count)
        return tree, parent_count if parent_count is not None else len(nodes)

    endophyte_id = Whole_Data.objects.filter(EMNPD_CID=enc_id)
    list1_endophyte_id = []
    for i in endophyte_id:
        list1_endophyte_id.append(i.EMNPD_SID)
    list1_endophyte_id = list(set(list1_endophyte_id))
    species_details = Endophyte_Data.objects.filter(EMNPD_SID__in=list1_endophyte_id).distinct()
    list1 = []
    for i in species_details:
        list1.append({
            #'Endophyte_Name': i.EMNPD_SID,
            #'EMNPD_SID_url': '<a href="/species/' + i.EMNPD_SID + '/">' + i.EMNPD_SID + '</a>',
            #'Endophyte_Name': '<a href="http://127.0.0.1:8000/species/' + i.EMNPD_SID + '/">' + i.Endophyte_Name + '</a>',
            'Endophyte_Name': i.Endophyte_Name,
            'Superkingdom': i.Superkingdom,
            'Kingdom': i.Kingdom,
            'Phylum': i.Phylum,
            'Class': i.Class,
            'Order': i.Order,
            'Family': i.Family,
            'Genus': i.Genus,
            'EMNPD_SID': i.EMNPD_SID,
        })
    # 构造树
    keys = ["Superkingdom", "Kingdom", "Phylum", "Class", "Order", "Family", "Genus", "Endophyte_Name"]
    tree = create_tree(list1, keys)[0]
    data = {"name": enc_id, "children": tree}
    return JsonResponse(data)




