from django.shortcuts import render
from django.db.models import Count, Q
from NaturalProduct.models import Whole_Data, NPs_Physi_Chem_Properties, Endophyte_Data, Target_Cell_Line, Target_Protein, Target_Organism
from django.shortcuts import redirect
import re
from django.views.decorators.csrf import csrf_exempt
from rdkit import Chem
from rdkit.Chem import AllChem
from rdkit import DataStructs


@csrf_exempt
def Search(request):
    if request.method == 'POST':
        formid = request.POST.get('formid')
        if formid == '0':
            text = request.POST.get('text')
            request.session['text'] = text
            NP_Name = request.POST.get('NP_Name')
            request.session['NP_Name'] = NP_Name
            return redirect('/emnpd/search_nps/')
        elif formid == '2':
            endophyte = request.POST.get('endophyte')
            request.session['endophyte'] = endophyte
            return redirect('/emnpd/search_endophyte/')
        elif formid == '3':
            target = request.POST.get('target')
            request.session['target'] = target
            return redirect('/emnpd/search_target/')
        elif formid == '4':
            select1 = request.POST.get('select1')
            select2 = request.POST.get('select2')
            request.session['select1'] = select1
            request.session['select2'] = select2
            return redirect('/emnpd/search_bioactivity/')
        elif formid == '1' or formid == '6':
            smiles = request.POST.get('smiles')
            tanimotoSlider = request.POST.get('tanimotoSlider')
            request.session['smiles'] = smiles
            request.session['tanimotoSlider'] = tanimotoSlider
            return redirect('/emnpd/search_nps_similarity/')    
            
    else:
        if request.GET.get('chart'):
            chart = request.GET.get('chart')
            if chart == '1':
                mw_range = request.GET.get('mw_range')
                request.session['mw_range'] = mw_range
                return redirect('/emnpd/search_nps/')
            elif chart == '2':
                alogp_range = request.GET.get('alogp_range')
                request.session['alogp_range'] = alogp_range
                return redirect('/emnpd/search_nps/')
            elif chart == '3':
                hba_range = request.GET.get('hba_range')
                request.session['hba_range'] = hba_range
                return redirect('/emnpd/search_nps/')
            elif chart == '4':
                hbd_range = request.GET.get('hbd_range')
                request.session['hbd_range'] = hbd_range
                return redirect('/emnpd/search_nps/')

        else:
            return render(request, 'Search.html')
            
@csrf_exempt
def Search_NPs(request):
    NP_Name = request.session.get('NP_Name')
    text = request.session.get('text')
    mw_range = request.session.get('mw_range')
    alogp_range = request.session.get('alogp_range')
    hba_range = request.session.get('hba_range')
    hbd_range = request.session.get('hbd_range')
    print(f'NP_Name: {NP_Name}')
    print(f'text: {text}')
    print(f'mw_range: {mw_range}')
    print(f'alogp_range: {alogp_range}')
    print(f'hba_range: {hba_range}')
    print(f'hbd_range: {hbd_range}')

    if NP_Name:
        query_string = request.session.get('NP_Name')
        res = query_string
        search_list = []
        NP_Name_all_data = NPs_Physi_Chem_Properties.objects.filter(Q(NP_Name__icontains=res) | Q(Iupac_name__icontains=res) | Q(NP_Synonyms__icontains=res) | Q(EMNPD_CID__icontains=res))
        NP_Name_IN_list = set(NP_Name_all_data.values_list('EMNPD_CID', flat=True).distinct())
        search_list.append(NP_Name_IN_list)
        print(f'search_list: {search_list}')
        if len(search_list) == 0:
            result = []
            Result = {
                    'search_for': text,
            }
            result.append(Result)
            return render(request, 'Search_NPs.html', {'result': result})            
        else:
            np_id_list = search_list[0]
            print(len(np_id_list))
            if len(np_id_list) == 0:
                result = []
                Result = {
                    'search_for': NP_Name,
                }
                result.append(Result)
                return render(request, 'Search_NPs.html', {'result': result})
            else:
                result = []
                for np_id in np_id_list:                    
                    np_data_filtered = NPs_Physi_Chem_Properties.objects.filter(EMNPD_CID=np_id)
                    np_name = np_data_filtered.first().NP_Name
                    np_formual = np_data_filtered.first().Molecular_Formula
                    num_endophyte = np_data_filtered.first().num_endophyte
                    num_targets = np_data_filtered.first().num_targets
                    num_activity_records = np_data_filtered.first().num_activity_records
                    num_activity = np_data_filtered.first().num_activity
                    Result = {
                        'search_for': NP_Name,
                        'np_num': len(np_id_list),
                        'np_id_list': np_id,
                        'np_name': np_name,
                        'np_formual': np_formual,
                        'num_endophyte': num_endophyte,
                        'num_targets': num_targets,
                        'num_activity_records': num_activity_records,
                        'num_activity': num_activity,
                    }
                    result.append(Result)
                request.session['NP_Name'] = None
                text = request.session.get('NP_Name')
                return render(request, 'Search_NPs.html', {'result': result})

    elif text:
        def parse_query_string(query_string):
            pattern = r'\[(?P<field>\w+): (?P<value>[^\[\] ]*?)\]'
            queries = re.findall(pattern, query_string)

            logic_pattern = r'(?<=])[A-Z]{2,3}|[A-Z]{2,3}(?=\[)'
            logics = re.findall(logic_pattern, query_string, flags=re.IGNORECASE)

            search_terms = []  # 存储多个字段-值字典
            logic_terms = []

            for query in queries:
                field, value = query
                field_dict = {}  # 单个字段-值字典

                if '=>' in value:
                    lower, upper = value.split('=>')
                    field_dict[field] = [float(lower), float(upper)]
                else:
                    field_dict[field] = value

                search_terms.append(field_dict)  # 添加至列表

            for logic in logics:
                logic_terms.append(logic)
            return search_terms, logic_terms
        query_string = request.session.get('text')
        res = parse_query_string(query_string)
        search_terms = res[0]
        logic_terms = res[1]
        search_terms_keys = []
        search_list = []
        for search_term in search_terms:
            for key, value in search_term.items():
                start = value[0]
                end = value[1]
                if key not in search_terms_keys:
                    search_terms_keys.append(key)
                if key == 'NP_Name':
                    NP_Name_all_data = NPs_Physi_Chem_Properties.objects.filter(Q(NP_Name__icontains=value) | Q(Iupac_name__icontains=value) | Q(NP_Synonyms__icontains=value) | Q(EMNPD_CID__icontains=value))
                    NP_Name_IN_list = set(NP_Name_all_data.values_list('EMNPD_CID', flat=True).distinct())
                    search_list.append(NP_Name_IN_list)
                '''
                if key == 'External_Database_ID':
                    External_Database_ID_all_data = NPs_Physi_Chem_Properties.objects.filter(Q(PubChem_CID__icontains=value) | Q(ChEMBL_ID__icontains=value) | Q(CAS__icontains=value))
                    External_Database_ID_IN_list = set(External_Database_ID_all_data.values_list('EMNPD_CID', flat=True).distinct())
                    search_list.append(External_Database_ID_IN_list)
                '''
                if key == 'Molecular_Formula':
                    Molecular_Formula_all_data = NPs_Physi_Chem_Properties.objects.filter(Molecular_Formula__icontains=value)
                    Molecular_Formula_IN_list = set(Molecular_Formula_all_data.values_list('EMNPD_CID', flat=True).distinct())
                    search_list.append(Molecular_Formula_IN_list)
                if key == 'SMILES':
                    SMILES_all_data = NPs_Physi_Chem_Properties.objects.filter(Isomeric_Smiles__icontains=value)
                    SMILES_IN_list = set(SMILES_all_data.values_list('EMNPD_CID', flat=True).distinct())
                    search_list.append(SMILES_IN_list)
                '''
                if key == 'Standard_InChI_Key':
                    Standard_InChI_Key_all_data = NPs_Physi_Chem_Properties.objects.filter(Inchikey__icontains=value)
                    Standard_InChI_Key_IN_list = set(Standard_InChI_Key_all_data.values_list('EMNPD_CID', flat=True).distinct())
                    search_list.append(Standard_InChI_Key_IN_list)
                if key == 'Standard_InChI':
                    Standard_InChI_all_data = NPs_Physi_Chem_Properties.objects.filter(Inchi__icontains=value)
                    Standard_InChI_IN_list = set(Standard_InChI_all_data.values_list('EMNPD_CID', flat=True).distinct())
                    search_list.append(Standard_InChI_IN_list)
                '''
                if key == 'Molecular_Weight':
                    Molecular_Weight_all_data = NPs_Physi_Chem_Properties.objects.filter(Molecular_Weight__range=(start, end))
                    Molecular_Weight_IN_list = set(Molecular_Weight_all_data.values_list('EMNPD_CID', flat=True).distinct())
                    search_list.append(Molecular_Weight_IN_list)
                if key == 'Rotatable_bond':
                    Rotatable_bond_all_data = NPs_Physi_Chem_Properties.objects.filter(Rotatable_Bond__range=(start, end))
                    Rotatable_bond_IN_list = set(Rotatable_bond_all_data.values_list('EMNPD_CID', flat=True).distinct())
                    search_list.append(Rotatable_bond_IN_list)
                if key == 'ALogP':
                    ALogP_all_data = NPs_Physi_Chem_Properties.objects.filter(Alogp__range=(start, end))
                    ALogP_IN_list = set(ALogP_all_data.values_list('EMNPD_CID', flat=True).distinct())
                    search_list.append(ALogP_IN_list)
                if key == 'HBA':
                    HBA_all_data = NPs_Physi_Chem_Properties.objects.filter(Hbond_Acceptor__range=(start, end))
                    HBA_IN_list = set(HBA_all_data.values_list('EMNPD_CID', flat=True).distinct())
                    search_list.append(HBA_IN_list)
                if key == 'HBD':
                    HBD_all_data = NPs_Physi_Chem_Properties.objects.filter(Hbond_Donor__range=(start, end))
                    HBD_IN_list = set(HBD_all_data.values_list('EMNPD_CID', flat=True).distinct())
                    search_list.append(HBD_IN_list)
                if key == 'TPSA':
                    TPSA_all_data = NPs_Physi_Chem_Properties.objects.filter(TPSA__range=(start, end))
                    TPSA_IN_list = set(TPSA_all_data.values_list('EMNPD_CID', flat=True).distinct())
                    search_list.append(TPSA_IN_list)
        print(f'search_list: {search_list}')
        if len(search_list) == 0:
            result = []
            Result = {
                    'search_for': text,
            }
            result.append(Result)
            print(result)
            return render(request, 'Search_NPs.html', {'result': result})
        else:
            Result = []
            for key in search_terms_keys:
                # Find the index of the current key in the search_terms_keys list
                key_idx = search_terms_keys.index(key)
                search_result = list(search_list[key_idx])
                Result.append(search_result)

            def logic_operation(querysets, logic_Terms):
                result = querysets[0]
                for i in range(1, len(querysets)):
                    if logic_terms[i - 1] == 'AND':
                        result = list(set(result) & set(querysets[i]))
                    elif logic_terms[i - 1] == 'OR':
                        result = list(set(result) | set(querysets[i]))
                    elif logic_terms[i - 1] == 'NOT':
                        result = list(set(result) - set(querysets[i]))

                return result
            if len(logic_terms) != 0:
                np_id_list = logic_operation(Result, logic_terms)
            else:
                np_id_list = list(set(Result[0]))
                print(len(np_id_list))
            if len(np_id_list) == 0:
                result = []
                Result = {
                    'search_for': text,
                }
                result.append(Result)
                return render(request, 'Search_NPs.html', {'result': result})
            else:
                result = []
                for np_id in np_id_list:
                    np_data_filtered = NPs_Physi_Chem_Properties.objects.filter(EMNPD_CID=np_id)
                    np_name = np_data_filtered.first().NP_Name
                    np_formual = np_data_filtered.first().Molecular_Formula
                    num_endophyte = np_data_filtered.first().num_endophyte
                    num_targets = np_data_filtered.first().num_targets
                    num_activity_records = np_data_filtered.first().num_activity_records
                    num_activity = np_data_filtered.first().num_activity

                    Result = {
                        'search_for': text,
                        'np_num': len(np_id_list),
                        'np_id_list': np_id,
                        'np_name': np_name,
                        'np_formual': np_formual,
                        'num_endophyte': num_endophyte,
                        'num_targets': num_targets,
                        'num_activity_records': num_activity_records,
                        'num_activity': num_activity,
                    }
                    result.append(Result)
                    #将result保存到excel
                request.session['text'] = None
                text = request.session.get('text')
                print(f'text:{text}')
                return render(request, 'Search_NPs.html', {'result': result})

    elif mw_range:
        def parse_query_string(query_string):
            pattern = r'\[(?P<field>\w+): (?P<value>[^\[\] ]*?)\]'
            queries = re.findall(pattern, query_string)
            search_terms = []  # 存储多个字段-值字典
            for query in queries:
                field, value = query
                field_dict = {}  # 单个字段-值字典
                lower, upper = value.split('=>')
                field_dict[field] = [float(lower), float(upper)]
                search_terms.append(field_dict)  # 添加至列表
            return search_terms
        query_string = request.session.get('mw_range')
        value =parse_query_string(query_string)[0]['Molecular_Weight']
        start = value[0]
        end = value[1]
        search_list = []
        end -= 0.001  # 增加一个小的量，使区间右侧变为开区间
        Molecular_Weight_all_data = NPs_Physi_Chem_Properties.objects.filter(
            Molecular_Weight__range=(start, end))
        Molecular_Weight_IN_list = set(Molecular_Weight_all_data.values_list('EMNPD_CID', flat=True).distinct())
        search_list.append(Molecular_Weight_IN_list)
        np_id_list = search_list[0]
        print(len(np_id_list))
        result = []
        for np_id in np_id_list:
            np_data_filtered = NPs_Physi_Chem_Properties.objects.filter(EMNPD_CID=np_id)
            np_name = np_data_filtered.first().NP_Name
            np_formual = np_data_filtered.first().Molecular_Formula
            num_endophyte = np_data_filtered.first().num_endophyte
            num_targets = np_data_filtered.first().num_targets
            num_activity_records = np_data_filtered.first().num_activity_records
            num_activity = np_data_filtered.first().num_activity
            Result = {
                'search_for': mw_range,
                'np_num': len(np_id_list),
                'np_id_list': np_id,
                'np_name': np_name,
                'np_formual': np_formual,
                'num_endophyte': num_endophyte,
                'num_targets': num_targets,
                'num_activity_records': num_activity_records,
                'num_activity': num_activity,
            }
            result.append(Result)
            request.session['mw_range'] = None
            mw_range = request.session.get('mw_range')
        return render(request, 'Search_NPs.html', {'result': result})

    elif alogp_range:
        def parse_query_string(query_string):
            pattern = r'\[(?P<field>\w+): (?P<value>[^\[\] ]*?)\]'
            queries = re.findall(pattern, query_string)
            search_terms = []  # 存储多个字段-值字典
            for query in queries:
                field, value = query
                field_dict = {}  # 单个字段-值字典
                lower, upper = value.split('=>')
                field_dict[field] = [float(lower), float(upper)]
                search_terms.append(field_dict)  # 添加至列表
            return search_terms
        query_string = request.session.get('alogp_range')
        value =parse_query_string(query_string)[0]['ALogP']
        start = value[0]
        end = value[1]
        search_list = []
        end -= 0.001
        ALogP_all_data = NPs_Physi_Chem_Properties.objects.filter(Alogp__range=(start, end))
        ALogP_IN_list = set(ALogP_all_data.values_list('EMNPD_CID', flat=True).distinct())
        search_list.append(ALogP_IN_list)
        np_id_list = search_list[0]
        print(len(np_id_list))
        result = []
        for np_id in np_id_list:
            np_data_filtered = NPs_Physi_Chem_Properties.objects.filter(EMNPD_CID=np_id)
            np_name = np_data_filtered.first().NP_Name
            np_formual = np_data_filtered.first().Molecular_Formula
            num_endophyte = np_data_filtered.first().num_endophyte
            num_targets = np_data_filtered.first().num_targets
            num_activity_records = np_data_filtered.first().num_activity_records
            num_activity = np_data_filtered.first().num_activity
            Result = {
                'search_for': alogp_range,
                'np_num': len(np_id_list),
                'np_id_list': np_id,
                'np_name': np_name,
                'np_formual': np_formual,
                'num_endophyte': num_endophyte,
                'num_targets': num_targets,
                'num_activity_records': num_activity_records,
                'num_activity': num_activity,
            }
            result.append(Result)
        request.session['alogp_range'] = None
        alogp_range = request.session.get('alogp_range')
        return render(request, 'Search_NPs.html', {'result': result})

    elif hba_range:
        def parse_query_string(query_string):
            pattern = r'\[(?P<field>\w+): (?P<value>[^\[\] ]*?)\]'
            queries = re.findall(pattern, query_string)
            search_terms = []  # 存储多个字段-值字典
            for query in queries:
                field, value = query
                field_dict = {}  # 单个字段-值字典
                if '=>' in value:
                    lower, upper = value.split('=>')
                    field_dict[field] = [float(lower), float(upper)]
                else:
                    field_dict[field] = value
                search_terms.append(field_dict)  # 添加至列表
            return search_terms
        query_string = request.session.get('hba_range')
        value =parse_query_string(query_string)[0]['HBA']
        search_list = []
        if len(value) > 1:
            start = value[0]
            end = value[1]
            HBA_all_data = NPs_Physi_Chem_Properties.objects.filter(Hbond_Acceptor__range=(start, end))
            HBA_IN_list = set(HBA_all_data.values_list('EMNPD_CID', flat=True).distinct())
            search_list.append(HBA_IN_list)
        else:
            HBA_all_data = NPs_Physi_Chem_Properties.objects.filter(Hbond_Acceptor=value[0])
            HBA_IN_list = set(HBA_all_data.values_list('EMNPD_CID', flat=True).distinct())
            search_list.append(HBA_IN_list)
        np_id_list = search_list[0]
        result = []
        print(len(np_id_list))
        for np_id in np_id_list:
            np_data_filtered = NPs_Physi_Chem_Properties.objects.filter(EMNPD_CID=np_id)
            np_name = np_data_filtered.first().NP_Name
            np_formual = np_data_filtered.first().Molecular_Formula
            num_endophyte = np_data_filtered.first().num_endophyte
            num_targets = np_data_filtered.first().num_targets
            num_activity_records = np_data_filtered.first().num_activity_records
            num_activity = np_data_filtered.first().num_activity
            Result = {
                'search_for': hba_range,
                'np_num': len(np_id_list),
                'np_id_list': np_id,
                'np_name': np_name,
                'np_formual': np_formual,
                'num_endophyte': num_endophyte,
                'num_targets': num_targets,
                'num_activity_records': num_activity_records,
                'num_activity': num_activity,
            }
            result.append(Result)
        request.session['hba_range'] = None
        hba_range = request.session.get('hba_range')
        print(f'hba_range: {hba_range}')
        return render(request, 'Search_NPs.html', {'result': result})
    
    elif hbd_range:
        def parse_query_string(query_string):
            pattern = r'\[(?P<field>\w+): (?P<value>[^\[\] ]*?)\]'
            queries = re.findall(pattern, query_string)
            search_terms = []  # 存储多个字段-值字典
            for query in queries:
                field, value = query
                field_dict = {}  # 单个字段-值字典
                if '=>' in value:
                    lower, upper = value.split('=>')
                    field_dict[field] = [float(lower), float(upper)]
                else:
                    field_dict[field] = value
                search_terms.append(field_dict)  # 添加至列表
            return search_terms
        query_string = request.session.get('hbd_range')
        value =parse_query_string(query_string)[0]['HBD']
        search_list = []
        if len(value) > 1:
            start = value[0]
            end = value[1]
            HBD_all_data = NPs_Physi_Chem_Properties.objects.filter(Hbond_Donor__range=(start, end))
            HBD_IN_list = set(HBD_all_data.values_list('EMNPD_CID', flat=True).distinct())
            search_list.append(HBD_IN_list)
        else:
            HBD_all_data = NPs_Physi_Chem_Properties.objects.filter(Hbond_Donor=value[0])
            HBD_IN_list = set(HBD_all_data.values_list('EMNPD_CID', flat=True).distinct())
            search_list.append(HBD_IN_list)
        np_id_list = search_list[0]
        result = []
        print(len(np_id_list))
        for np_id in np_id_list:
            np_data_filtered = NPs_Physi_Chem_Properties.objects.filter(EMNPD_CID=np_id)
            np_name = np_data_filtered.first().NP_Name
            np_formual = np_data_filtered.first().Molecular_Formula
            num_endophyte = np_data_filtered.first().num_endophyte
            num_targets = np_data_filtered.first().num_targets
            num_activity_records = np_data_filtered.first().num_activity_records
            num_activity = np_data_filtered.first().num_activity
            Result = {
                'search_for': hbd_range,
                'np_num': len(np_id_list),
                'np_id_list': np_id,
                'np_name': np_name,
                'np_formual': np_formual,
                'num_endophyte': num_endophyte,
                'num_targets': num_targets,
                'num_activity_records': num_activity_records,
                'num_activity': num_activity,
            }
            result.append(Result)
        request.session['hbd_range'] = None
        hbd_range = request.session.get('hbd_range')
        print(f'hbd_range: {hbd_range}')
        return render(request, 'Search_NPs.html', {'result': result})

    elif NP_Name == '':
        request.session['NP_Name'] = None
        text = request.session.get('NP_Name')
        print(f'NP_Name:{NP_Name}')
        return render(request, 'Search_NPs.html')
    elif text == '':
        request.session['text'] = None
        text = request.session.get('text')
        print(f'text:{text}')
        return render(request, 'Search_NPs.html')
    else:
        return render(request, 'Search.html')

@csrf_exempt
def Search_endophyte(request):
    endophyte = request.session.get('endophyte')
    print(f'endophyte: {endophyte}')
    if endophyte:
        endophyte_all_data = Endophyte_Data.objects.filter(
            Q(EMNPD_SID=endophyte) | Q(Endophyte_Name__icontains=endophyte) | Q(Tax_ID__icontains=endophyte) | Q(
                Superkingdom=endophyte) | Q(Kingdom=endophyte) | Q(Phylum=endophyte) | Q(Class=endophyte) |
            Q(Order=endophyte) | Q(Family=endophyte) | Q(Genus=endophyte) | Q(GenBank_ID=endophyte) | Q(Closest_GenBank_ID=endophyte)
        )

        endophyte_list = set(endophyte_all_data.values_list('EMNPD_SID', flat=True).distinct())
        if len(endophyte_list) == 0:
            result = []
            Result = {
                'search_for': '[' + endophyte + ']',
            }
            result.append(Result)
            return render(request, 'Search_Endophyte.html', {'result': result})
        else:
            whole_data = Whole_Data.objects.all()
            result = []
            for single_endophyte in endophyte_list:
                endophyte_data_filtered = Endophyte_Data.objects.filter(EMNPD_SID=single_endophyte)
                endophyte_data_filtered_2 = whole_data.filter(EMNPD_SID=single_endophyte)
                endophyte_id = endophyte_data_filtered.first().EMNPD_SID
                endophyte_name = endophyte_data_filtered.first().Endophyte_Name
                endophyte_Type = endophyte_data_filtered.first().Endophyte_Type
                Tax_ID = endophyte_data_filtered.first().Tax_ID
                endophyte_family = endophyte_data_filtered.first().Family
                endophyte_genus = endophyte_data_filtered.first().Genus
                agg_NPs = endophyte_data_filtered_2.exclude(EMNPD_CID='NA').aggregate(
                    num_NPs=Count('EMNPD_CID', distinct=True))
                Result = {
                    'search_for': '[' + endophyte + ']',
                    'endophyte_num': len(endophyte_list),
                    'endophyte_id': endophyte_id,
                    'endophyte_name': endophyte_name,
                    'endophyte_Type': endophyte_Type,
                    'Tax_ID': Tax_ID,
                    'endophyte_family': endophyte_family,
                    'endophyte_genus': endophyte_genus,
                    'num_NPs': agg_NPs['num_NPs']
                }
                result.append(Result)
            return render(request, 'Search_Endophyte.html', {'result': result})
    else:
        return render(request, 'Search_Endophyte.html')

@csrf_exempt
def Search_target(request):
    target = request.session.get('target')
    if target:
        if Target_Cell_Line.objects.filter(
                Q(EMNPD_TCID=target) | Q(Cell_Line_Name__icontains=target) | Q(Synonyms__icontains=target)
                | Q(Cellosaurus_ID=target) | Q(Chembl_Cell_ID=target) | Q(Chembl_Target_ID=target)
                | Q(Cell_Line_Ontology=target) | Q(Experimental_Factor_Ontology=target) | Q(
                    LINCS_Project=target)).exists():
            cell_line_all_data = Target_Cell_Line.objects.filter(
                Q(EMNPD_TCID=target) | Q(Cell_Line_Name__icontains=target) | Q(Synonyms__icontains=target)
                | Q(Cellosaurus_ID=target) | Q(Chembl_Cell_ID=target) | Q(Chembl_Target_ID=target)
                | Q(Cell_Line_Ontology=target) | Q(Experimental_Factor_Ontology=target) | Q(LINCS_Project=target))
            if len(cell_line_all_data) != 0:
                cell_line_list = set(cell_line_all_data.values_list('EMNPD_TCID', flat=True).distinct())
                print(f'cell_line_list: {cell_line_list}')
                whole_data = Whole_Data.objects.all()
                result = []
                for single_target in cell_line_list:
                    cell_line_data_filtered = cell_line_all_data.filter(EMNPD_TCID=single_target)
                    cell_line_filtered_1 = whole_data.filter(EMNPD_TID=single_target)
                    target_id = cell_line_data_filtered.first().EMNPD_TCID
                    target_name = cell_line_data_filtered.first().Cell_Line_Name
                    target_type = cell_line_data_filtered.first().Target_Type
                    target_organism = cell_line_data_filtered.first().Target_Organism_Name
                    agg_NPs = cell_line_filtered_1.exclude(EMNPD_CID='NA').aggregate(
                        num_NPs=Count('EMNPD_CID', distinct=True))
                    agg_activity_records = cell_line_filtered_1.exclude(Active_Size='NA').aggregate(
                        num_activity_records=Count('Active_Size'))
                    Result = {
                            'search_for': '[' + target + ']',
                            'target_num': len(cell_line_list),
                            'target_id': '<a href="../target/cell_line/' + target_id + '/">' + target_id + '</a>',
                            'target_name': target_name,
                            'target_type': target_type,
                            'target_organism': target_organism,
                            'num_NPs': agg_NPs['num_NPs'],
                            'num_activity_records': agg_activity_records['num_activity_records']
                    }
                    result.append(Result)
                return render(request, 'Search_Target.html', {'result': result})


        elif Target_Protein.objects.filter(
                Q(EMNPD_TPID=target) | Q(Protein_Name__icontains=target) | Q(UniProt_ID=target) | Q(ChEMBL_ID=target)
                | Q(Protein_superfamily__icontains=target) | Q(Protein_family__icontains=target) | Q(
                    Protein_subfamily__icontains=target)).exists():
            protein_all_data = Target_Protein.objects.filter(
                Q(EMNPD_TPID=target) | Q(Protein_Name__icontains=target) | Q(UniProt_ID=target) | Q(ChEMBL_ID=target)
                | Q(Protein_superfamily__icontains=target) | Q(Protein_family__icontains=target) | Q(
                    Protein_subfamily__icontains=target))
            print(f'protein_all_data: {protein_all_data}')
            if len(protein_all_data) != 0:
                protein_list = set(protein_all_data.values_list('EMNPD_TPID', flat=True).distinct())
                whole_data = Whole_Data.objects.all()
                result = []
                for single_target in protein_list:
                    protein_data_filtered = protein_all_data.filter(EMNPD_TPID=single_target)
                    protein_filtered_1 = whole_data.filter(EMNPD_TID=single_target)
                    target_id = protein_data_filtered.first().EMNPD_TPID
                    target_name = protein_data_filtered.first().Protein_Name
                    target_type = protein_data_filtered.first().Target_Type
                    target_organism = protein_data_filtered.first().Target_Organism_Name
                    agg_NPs = protein_filtered_1.exclude(EMNPD_CID='NA').aggregate(
                        num_NPs=Count('EMNPD_CID', distinct=True))
                    agg_activity_records = protein_filtered_1.exclude(Active_Size='NA').aggregate(
                        num_activity_records=Count('Active_Size'))
                    Result = {
                        'search_for': '[' + target + ']',
                        'target_num': len(protein_list),
                        'target_id': '<a href="../target/protein/' + target_id + '/">' + target_id + '</a>',
                        'target_name': target_name,
                        'target_type': target_type,
                        'target_organism': target_organism,
                        'num_NPs': agg_NPs['num_NPs'],
                        'num_activity_records': agg_activity_records['num_activity_records']
                    }
                    result.append(Result)
                return render(request, 'Search_Target.html', {'result': result})


        elif Target_Organism.objects.filter(
                Q(EMNPD_TOID=target) | Q(Target_Organism_Name__icontains=target) | Q(Tax_ID=target) | Q(
                    Superkingdom__icontains=target)
                | Q(Kingdom__icontains=target) | Q(Phylum__icontains=target) | Q(Class__icontains=target) | Q(
                    Order__icontains=target) | Q(Family__icontains=target)
                | Q(Genus__icontains=target)).exists():
            Target_Organism_all_data = Target_Organism.objects.filter(
                Q(EMNPD_TOID=target) | Q(Target_Organism_Name__icontains=target) | Q(Tax_ID=target) | Q(
                    Superkingdom__icontains=target)
                | Q(Kingdom__icontains=target) | Q(Phylum__icontains=target) | Q(Class__icontains=target) | Q(
                    Order__icontains=target) | Q(Family__icontains=target)
                | Q(Genus__icontains=target))
            print(f'Target_Organism_all_data: {Target_Organism_all_data}')
            if len(Target_Organism_all_data) != 0:
                Target_Organism_list = set(Target_Organism_all_data.values_list('EMNPD_TOID', flat=True).distinct())
                whole_data = Whole_Data.objects.all()
                result = []
                for single_target in Target_Organism_list:
                    Target_Organism_data_filtered = Target_Organism_all_data.filter(EMNPD_TOID=single_target)
                    Target_Organism_filtered_1 = whole_data.filter(EMNPD_TID=single_target)
                    target_id = Target_Organism_data_filtered.first().EMNPD_TOID
                    target_name = Target_Organism_data_filtered.first().Target_Organism_Name
                    target_type = Target_Organism_data_filtered.first().Target_Type
                    target_organism = Target_Organism_data_filtered.first().Target_Organism_Name
                    agg_NPs = Target_Organism_filtered_1.exclude(EMNPD_CID='NA').aggregate(
                        num_NPs=Count('EMNPD_CID', distinct=True))
                    agg_activity_records = Target_Organism_filtered_1.exclude(Active_Size='NA').aggregate(
                        num_activity_records=Count('Active_Size'))
                    Result = {
                        'search_for': '[' + target + ']',
                        'target_num': len(Target_Organism_list),
                        'target_id': '<a href="../target/species/' + target_id + '/">' + target_id + '</a>',
                        'target_name': target_name,
                        'target_type': target_type,
                        'target_organism': target_organism,
                        'num_NPs': agg_NPs['num_NPs'],
                        'num_activity_records': agg_activity_records['num_activity_records']
                    }
                    result.append(Result)
                return render(request, 'Search_Target.html', {'result': result})

        else:
            result = []
            Result = {
                'search_for': '[' + target + ']',
            }
            result.append(Result)

            return render(request, 'Search_Target.html', {'result': result})

    else:
        return render(request, 'Search_Target.html')

@csrf_exempt
def Search_bioactivity(request):
    select1 = request.session.get('select1')
    select2 = request.session.get('select2')
    print(f'select1: {select1}')
    print(f'select2: {select2}')
    Activity_all_data = Whole_Data.objects.filter(
        Q (Active_Size=select1) & Q (Activity=select2)
    )
    Activity_list = set(Activity_all_data.values_list('EMNPD_CID', flat=True).distinct())
    print(f'Activity_list: {Activity_list}')
    print(len(Activity_list))
    if len(Activity_list) != 0:
        result = []
        for single_activity in Activity_list:
            Activity_data_filtered = Activity_all_data.filter(EMNPD_CID=single_activity)
            NP_ID = Activity_data_filtered.first().EMNPD_CID
            NP_Name = Activity_data_filtered.first().NP_Name
            Target_ID = Activity_data_filtered.first().EMNPD_TID
            Target_Name = Activity_data_filtered.first().Target_Name
            Target_Type = Activity_data_filtered.first().Target_Type
            Bioactivity_Size = Activity_data_filtered.first().Active_Size
            Bioactivity = Activity_data_filtered.first().Activity
            Endophyte_ID = Activity_data_filtered.first().EMNPD_SID
            Endophyte_Name = Activity_data_filtered.first().Endophyte_Name
            Result = {
                'NP_ID': NP_ID,
                'NP_Name': NP_Name,
                'Target_ID': Target_ID,
                'Target_Name': Target_Name,
                'Target_Type': Target_Type,
                'Bioactivity_Size': Bioactivity_Size,
                'Bioactivity': Bioactivity,
                'Endophyte_ID': Endophyte_ID,
                'Endophyte_Name': Endophyte_Name,
                'search_for': '[' + select1 + ' | ' + select2 + ']',
                'np_num': len(Activity_list)
            }
            result.append(Result)
        print(f'result: {result}')
        return render(request, 'search_activity.html', {'result': result})
    else:
        result = []
        Result ={
            'search_for': '[' + select1 + ' | ' + select2 + ']',
        }
        result.append(Result)
        return render(request, 'search_activity.html', {'result': result})
        
@csrf_exempt
def NPs_Similarity(request):
    user_smiles = request.session.get('smiles')
    print('user_smiles: {user_smiles}')
    if user_smiles != '':
        np_similarity_threshold = request.session.get('tanimotoSlider')
        user_molecule = Chem.MolFromSmiles(user_smiles)
        user_fp = AllChem.GetMorganFingerprint(user_molecule, 2)
    
        # Assuming you have a way to get the Tanimoto Similarity Threshold from the user input
        threshold = float(np_similarity_threshold) / 100.0  # Convert percentage to a value between 0 and 1
    
        # Read the SDF file and extract the molecule names
        my_db = Chem.SDMolSupplier('static/data/EMNPD NPs SDF.sdf')
        my_db_names = [mol.GetProp('_Name') for mol in my_db if mol is not None]
    
        # Generate fingerprints for the molecules in the database
        my_db_fps = [AllChem.GetMorganFingerprint(mol, 2) for mol in my_db if mol is not None]
    
        # Calculate Tanimoto similarity between the user molecule and all molecules in the database
        similarities = [DataStructs.TanimotoSimilarity(user_fp, db_fp) for db_fp in my_db_fps]
    
        # Filter molecules that meet the threshold and sort them by similarity
        filtered_molecules = [(name, sim) for name, sim in zip(my_db_names, similarities) if sim >= threshold]
        sorted_molecules = sorted(filtered_molecules, key=lambda x: x[1], reverse=True)
    
        # Get the top 10 molecules
        search_list = sorted_molecules[:10]
        if len(search_list) == 0:
            result = []
            Result = {'search_for': user_smiles}
            result.append(Result)
            return render(request, 'Search_NPs_similarity.html', {'result': result})
        else:
            result = []
            for np_id in search_list:
                np_data_filtered = NPs_Physi_Chem_Properties.objects.filter(EMNPD_CID=np_id[0])
                np_name = np_data_filtered.first().NP_Name
                np_formual = np_data_filtered.first().Molecular_Formula
                num_endophyte = np_data_filtered.first().num_endophyte
                num_targets = np_data_filtered.first().num_targets
                num_activity_records = np_data_filtered.first().num_activity_records
                num_activity = np_data_filtered.first().num_activity
                Result = {'search_for': user_smiles,
                          'np_num': len(search_list),
                          'np_id_list': np_id[0],
                          'np_name': np_name,
                          'np_formual': np_formual,
                          'num_endophyte': num_endophyte,
                          'num_targets': num_targets,
                          'num_activity_records': num_activity_records,
                          'num_activity': num_activity,
                          'np_similarity_score': round(np_id[1],3)}
                result.append(Result)
            request.session['smiles'] = None
            return render(request, 'Search_NPs_similarity.html', {'result': result})
    else:
        result = []
        Result = {'search_for': user_smiles}
        result.append(Result)
        return render(request, 'Search_NPs_similarity.html', {'result': result}) 
