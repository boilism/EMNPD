from django.shortcuts import render
from django.http import JsonResponse
from NaturalProduct.models import Endophyte_Data, Whole_Data
from django.db.models import Count
import json

def species_detail(request, ens_id):
    endophyte_data = Endophyte_Data.objects.filter(EMNPD_SID=ens_id).first()
    np_data = Whole_Data.objects.filter(EMNPD_SID=ens_id)
    np_all_data = Whole_Data.objects.all()
    #获得EMNPD_CID
    np_id_list = list(np_data.values_list('EMNPD_CID', flat=True).distinct())
    result = []
    list_bioactivity = []
    list_endophyte = []
    list_target = []
    for np_id in np_id_list:
        np_data_filtered = np_all_data.filter(EMNPD_CID=np_id)
        np_name = np_data_filtered.first().NP_Name
        agg_endophyte = np_data_filtered.exclude(EMNPD_SID='NA').aggregate(num_endophyte=Count('EMNPD_SID', distinct=True))
        agg_targets = np_data_filtered.exclude(EMNPD_TID='NA').aggregate(num_targets=Count('EMNPD_TID', distinct=True))
        agg_activity_records = np_data_filtered.exclude(Active_Size='NA').aggregate(num_activity_records=Count('Active_Size'))
        agg_activity = np_data_filtered.exclude(Activity='NA').aggregate(num_activity=Count('Activity', distinct=True))
        np_id_sliced = np_id[3:]
        if int(np_id[3:]) < 6152 and int(np_id[3:]) != 5304 and int(np_id[3:]) != 5310:
            url = 'http://127.0.0.1:8000/emnpd/naturalproducts/' + np_id + '/'
        else:
            url = 'NA'       

        Result = {
            'np_id_list': np_id,
            'np_name': np_name,
            'NP_2D_Structure': '<img src="/static/images/PubChem_compound_id_list_images/'
                               + np_id + '.png" class="img-fluid compound-image" style="width: 100px; height: 100px">',            
            'num_endophyte': agg_endophyte['num_endophyte'],
            'num_targets': agg_targets['num_targets'],
            'num_activity_records': agg_activity_records['num_activity_records'],
            'num_activity': agg_activity['num_activity'],
            'np_id_sliced': np_id_sliced
        }
        if agg_activity['num_activity'] > 0:
            if url == 'NA':
                list_bioactivity.append({"value": agg_activity['num_activity'], "name": np_name.replace("'", "′")})
            else:
                list_bioactivity.append({"value": agg_activity['num_activity'], "name": np_name.replace("'", "′"), "url": url})
        if agg_endophyte['num_endophyte'] > 0:
            if url == 'NA':
                list_endophyte.append({"value": agg_endophyte['num_endophyte'], "name": np_name.replace("'", "′")})
            else:
                list_endophyte.append({"value": agg_endophyte['num_endophyte'], "name": np_name.replace("'", "′"), "url": url})
        if agg_targets['num_targets'] > 0:
            if url == 'NA':
                list_target.append({"value": agg_targets['num_targets'], "name": np_name.replace("'", "′")})
            else:
                list_target.append({"value": agg_targets['num_targets'], "name": np_name.replace("'", "′"), "url": url})
        result.append(Result)

    json_data_bioactivity = json.dumps(list_bioactivity)
    json_data_endophyte = json.dumps(list_endophyte)
    json_data_target = json.dumps(list_target)
    return render(request, 'species_detail.html', {'Endophyte_Data': endophyte_data,
                                                   'result': result,
                                                   'data_bioactivity': json_data_bioactivity,
                                                   'data_endophyte': json_data_endophyte,
                                                   'data_target': json_data_target
                                                   })

def species_np_content_json(request, ens_id):
    np_content = Whole_Data.objects.filter(EMNPD_SID=ens_id).exclude(Compound_Content='NA')
    list1 = []
    unit_sum = {}
    for i in np_content:
        list1.append({
            'ENC_ID': i.EMNPD_CID,
            'NPs_Name': i.NP_Name,
            'NP_2D_Structure': '<img src="/static/images/PubChem_compound_id_list_images/'
                               + i.EMNPD_CID + '.png" class="img-fluid compound-image" style="width: 100px; height: 100px">',
            'Fermentation_Index': i.Fermentation_Index,
            'Content_Bar': i.Compound_Content_Value,
            'NP_Content': i.Compound_Content,
            'Content_Unit': i.Content_Unit,
            'Reference': i.PMID,
            'Fermentation_Condition': i.Fermentation,
            'Plant_Material': i.Plant_Material,
            'Extract_Activity': i.Extract_Activity,
        })
    list1 = [dict(t) for t in set([tuple(d.items()) for d in list1])]
    for d in list1:
        pmid = d['Reference']
        d['Reference'] = '<a href="https://pubmed.ncbi.nlm.nih.gov/' + pmid + '/"">' + pmid + '</a>'
        if int(d['ENC_ID'][3:]) < 6152 and int(d['ENC_ID'][3:]) != 5304 and int(d['ENC_ID'][3:]) != 5310:
            np_id = d['ENC_ID']
            d['ENC_ID'] = '<a href="/emnpd/naturalproducts/' + np_id + '">' + np_id + '</a>'
        else:
            d['NP_2D_Structure'] = 'NA'

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
        #将unit_sum加入到list1中
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
    return JsonResponse(data)
