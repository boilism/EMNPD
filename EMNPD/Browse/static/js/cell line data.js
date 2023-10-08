
  var dom = document.getElementById('container7');
  var myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
  });
  var app = {};

  var option;

  var data =
      [{'name': 'Cancer cell line (234)', 'value': 234, 'children': [{'name': 'Bladder Cancer (5)', 'value': 5, 'children': [{'name': 'ENTC00034: BXF 1218L', 'value': 1, 'link': '../target/cell_line/ENTC00034'}, {'name': 'ENTC00035: BXF 1352L', 'value': 1, 'link': '../target/cell_line/ENTC00035'}, {'name': 'ENTC00036: BXF T 24', 'value': 1, 'link': '../target/cell_line/ENTC00036'}, {'name': 'ENTC00192: NBT-T2', 'value': 1, 'link': '../target/cell_line/ENTC00192'}, {'name': 'ENTC00265: T24', 'value': 1, 'link': '../target/cell_line/ENTC00265'}]}, {'name': 'Bone Cancer (6)', 'value': 6, 'children': [{'name': 'ENTC00001: 143B', 'value': 1, 'link': '../target/cell_line/ENTC00001'}, {'name': 'ENTC00014: A-673', 'value': 1, 'link': '../target/cell_line/ENTC00014'}, {'name': 'ENTC00050: CHP-100', 'value': 1, 'link': '../target/cell_line/ENTC00050'}, {'name': 'ENTC00106: HT-1080', 'value': 1, 'link': '../target/cell_line/ENTC00106'}, {'name': 'ENTC00176: MG-63', 'value': 1, 'link': '../target/cell_line/ENTC00176'}, {'name': 'ENTC00275: U2OS', 'value': 1, 'link': '../target/cell_line/ENTC00275'}]}, {'name': 'Brain Cancer (8)', 'value': 8, 'children': [{'name': 'ENTC00059: Daoy', 'value': 1, 'link': '../target/cell_line/ENTC00059'}, {'name': 'ENTC00147: LN-229', 'value': 1, 'link': '../target/cell_line/ENTC00147'}, {'name': 'ENTC00246: SF268', 'value': 1, 'link': '../target/cell_line/ENTC00246'}, {'name': 'ENTC00247: SF295', 'value': 1, 'link': '../target/cell_line/ENTC00247'}, {'name': 'ENTC00249: SH-SY5Y', 'value': 1, 'link': '../target/cell_line/ENTC00249'}, {'name': 'ENTC00256: SNB-19', 'value': 1, 'link': '../target/cell_line/ENTC00256'}, {'name': 'ENTC00273: U-251MG', 'value': 1, 'link': '../target/cell_line/ENTC00273'}, {'name': 'ENTC00276: U-87MG ATCC', 'value': 1, 'link': '../target/cell_line/ENTC00276'}]}, {'name': 'Breast Cancer (16)', 'value': 16, 'children': [{'name': 'ENTC00004: 4T1', 'value': 1, 'link': '../target/cell_line/ENTC00004'}, {'name': 'ENTC00023: BC', 'value': 1, 'link': '../target/cell_line/ENTC00023'}, {'name': 'ENTC00030: BT-20', 'value': 1, 'link': '../target/cell_line/ENTC00030'}, {'name': 'ENTC00031: BT-474', 'value': 1, 'link': '../target/cell_line/ENTC00031'}, {'name': 'ENTC00032: BT-549', 'value': 1, 'link': '../target/cell_line/ENTC00032'}, {'name': 'ENTC00077: HCC1954', 'value': 1, 'link': '../target/cell_line/ENTC00077'}, {'name': 'ENTC00146: LM3', 'value': 1, 'link': '../target/cell_line/ENTC00146'}, {'name': 'ENTC00163: MAXF 401NL', 'value': 1, 'link': '../target/cell_line/ENTC00163'}, {'name': 'ENTC00164: MAXF MCF 7', 'value': 1, 'link': '../target/cell_line/ENTC00164'}, {'name': 'ENTC00165: MAXF MDA 231', 'value': 1, 'link': '../target/cell_line/ENTC00165'}, {'name': 'ENTC00168: MCF-7', 'value': 1, 'link': '../target/cell_line/ENTC00168'}, {'name': 'ENTC00169: MDA-MB-231', 'value': 1, 'link': '../target/cell_line/ENTC00169'}, {'name': 'ENTC00171: MDA-MB-468', 'value': 1, 'link': '../target/cell_line/ENTC00171'}, {'name': 'ENTC00189: MRMT-1', 'value': 1, 'link': '../target/cell_line/ENTC00189'}, {'name': 'ENTC00250: SK-BR-3', 'value': 1, 'link': '../target/cell_line/ENTC00250'}, {'name': 'ENTC00266: T-47D', 'value': 1, 'link': '../target/cell_line/ENTC00266'}]}, {'name': 'Cervical Cancer (17)', 'value': 17, 'children': [{'name': 'ENTC00026: BEL-7402', 'value': 1, 'link': '../target/cell_line/ENTC00026'}, {'name': 'ENTC00027: BEL-7404', 'value': 1, 'link': '../target/cell_line/ENTC00027'}, {'name': 'ENTC00028: BGC-823', 'value': 1, 'link': '../target/cell_line/ENTC00028'}, {'name': 'ENTC00044: Ca Ski', 'value': 1, 'link': '../target/cell_line/ENTC00044'}, {'name': 'ENTC00090: HeLa', 'value': 1, 'link': '../target/cell_line/ENTC00090'}, {'name': 'ENTC00091: HeLa S3', 'value': 1, 'link': '../target/cell_line/ENTC00091'}, {'name': 'ENTC00093: HEp-2', 'value': 1, 'link': '../target/cell_line/ENTC00093'}, {'name': 'ENTC00115: Intestine 407', 'value': 1, 'link': '../target/cell_line/ENTC00115'}, {'name': 'ENTC00124: KB', 'value': 1, 'link': '../target/cell_line/ENTC00124'}, {'name': 'ENTC00125: KB-3-1', 'value': 1, 'link': '../target/cell_line/ENTC00125'}, {'name': 'ENTC00126: KB-VIN', 'value': 1, 'link': '../target/cell_line/ENTC00126'}, {'name': 'ENTC00137: L-02', 'value': 1, 'link': '../target/cell_line/ENTC00137'}, {'name': 'ENTC00235: QGY-7701', 'value': 1, 'link': '../target/cell_line/ENTC00235'}, {'name': 'ENTC00236: QSG-7701', 'value': 1, 'link': '../target/cell_line/ENTC00236'}, {'name': 'ENTC00248: SGC-7901', 'value': 1, 'link': '../target/cell_line/ENTC00248'}, {'name': 'ENTC00255: SMMC-7721', 'value': 1, 'link': '../target/cell_line/ENTC00255'}, {'name': 'ENTC00257: SPC-A1', 'value': 1, 'link': '../target/cell_line/ENTC00257'}]}, {'name': 'Colon Cancer (22)', 'value': 22, 'children': [{'name': 'ENTC00040: Caco-2', 'value': 1, 'link': '../target/cell_line/ENTC00040'}, {'name': 'ENTC00053: COLO 201', 'value': 1, 'link': '../target/cell_line/ENTC00053'}, {'name': 'ENTC00054: CT26', 'value': 1, 'link': '../target/cell_line/ENTC00054'}, {'name': 'ENTC00055: CXF 269L', 'value': 1, 'link': '../target/cell_line/ENTC00055'}, {'name': 'ENTC00056: CXF HCT 116', 'value': 1, 'link': '../target/cell_line/ENTC00056'}, {'name': 'ENTC00057: CXF HT 29', 'value': 1, 'link': '../target/cell_line/ENTC00057'}, {'name': 'ENTC00058: CXF RKO', 'value': 1, 'link': '../target/cell_line/ENTC00058'}, {'name': 'ENTC00071: H116', 'value': 1, 'link': '../target/cell_line/ENTC00071'}, {'name': 'ENTC00080: HCT', 'value': 1, 'link': '../target/cell_line/ENTC00080'}, {'name': 'ENTC00081: HCT 116', 'value': 1, 'link': '../target/cell_line/ENTC00081'}, {'name': 'ENTC00082: HCT 15', 'value': 1, 'link': '../target/cell_line/ENTC00082'}, {'name': 'ENTC00083: HCT-29', 'value': 1, 'link': '../target/cell_line/ENTC00083'}, {'name': 'ENTC00084: HCT 8', 'value': 1, 'link': '../target/cell_line/ENTC00084'}, {'name': 'ENTC00108: HT-29', 'value': 1, 'link': '../target/cell_line/ENTC00108'}, {'name': 'ENTC00148: LoVo', 'value': 1, 'link': '../target/cell_line/ENTC00148'}, {'name': 'ENTC00149: LS174T', 'value': 1, 'link': '../target/cell_line/ENTC00149'}, {'name': 'ENTC00218: P6C', 'value': 1, 'link': '../target/cell_line/ENTC00218'}, {'name': 'ENTC00240: RKO', 'value': 1, 'link': '../target/cell_line/ENTC00240'}, {'name': 'ENTC00259: SW1116', 'value': 1, 'link': '../target/cell_line/ENTC00259'}, {'name': 'ENTC00261: SW480', 'value': 1, 'link': '../target/cell_line/ENTC00261'}, {'name': 'ENTC00262: SW620', 'value': 1, 'link': '../target/cell_line/ENTC00262'}, {'name': 'ENTC00267: T84', 'value': 1, 'link': '../target/cell_line/ENTC00267'}]}, {'name': 'Esophageal Cancer (4)', 'value': 4, 'children': [{'name': 'ENTC00063: Eca-109', 'value': 1, 'link': '../target/cell_line/ENTC00063'}, {'name': 'ENTC00134: KYSE-450', 'value': 1, 'link': '../target/cell_line/ENTC00134'}, {'name': 'ENTC00135: KYSE-510 cisplatin-resistant', 'value': 1, 'link': '../target/cell_line/ENTC00135'}, {'name': 'ENTC00136: KYSE-510 sensitive to cisplatin', 'value': 1, 'link': '../target/cell_line/ENTC00136'}]}, {'name': 'Gastric Cancer (10)', 'value': 10, 'children': [{'name': 'ENTC00016: ACP01', 'value': 1, 'link': '../target/cell_line/ENTC00016'}, {'name': 'ENTC00018: AGS', 'value': 1, 'link': '../target/cell_line/ENTC00018'}, {'name': 'ENTC00070: GXF 251 L', 'value': 1, 'link': '../target/cell_line/ENTC00070'}, {'name': 'ENTC00096: HGC-27', 'value': 1, 'link': '../target/cell_line/ENTC00096'}, {'name': 'ENTC00123: KATO III', 'value': 1, 'link': '../target/cell_line/ENTC00123'}, {'name': 'ENTC00175: MFC', 'value': 1, 'link': '../target/cell_line/ENTC00175'}, {'name': 'ENTC00177: MGC', 'value': 1, 'link': '../target/cell_line/ENTC00177'}, {'name': 'ENTC00178: MGC-803', 'value': 1, 'link': '../target/cell_line/ENTC00178'}, {'name': 'ENTC00181: MKN45', 'value': 1, 'link': '../target/cell_line/ENTC00181'}, {'name': 'ENTC00205: NCI-N87', 'value': 1, 'link': '../target/cell_line/ENTC00205'}]}, {'name': 'Head And Neck Cancer (2)', 'value': 2, 'children': [{'name': 'ENTC00101: HNXF CAL 27', 'value': 1, 'link': '../target/cell_line/ENTC00101'}, {'name': 'ENTC00272: Tu 212', 'value': 1, 'link': '../target/cell_line/ENTC00272'}]}, {'name': 'Leukemia (21)', 'value': 21, 'children': [{'name': 'ENTC00013: A4/Fukuda', 'value': 1, 'link': '../target/cell_line/ENTC00013'}, {'name': 'ENTC00098: HL-60', 'value': 1, 'link': '../target/cell_line/ENTC00098'}, {'name': 'ENTC00099: HLK 210', 'value': 1, 'link': '../target/cell_line/ENTC00099'}, {'name': 'ENTC00118: Jurkat', 'value': 1, 'link': '../target/cell_line/ENTC00118'}, {'name': 'ENTC00119: Jurkat J1', 'value': 1, 'link': '../target/cell_line/ENTC00119'}, {'name': 'ENTC00120: Jurkat J16', 'value': 1, 'link': '../target/cell_line/ENTC00120'}, {'name': 'ENTC00121: K-562', 'value': 1, 'link': '../target/cell_line/ENTC00121'}, {'name': 'ENTC00133: Ku812F', 'value': 1, 'link': '../target/cell_line/ENTC00133'}, {'name': 'ENTC00138: L1210', 'value': 1, 'link': '../target/cell_line/ENTC00138'}, {'name': 'ENTC00140: L-5178-Y', 'value': 1, 'link': '../target/cell_line/ENTC00140'}, {'name': 'ENTC00185: MOLM-13', 'value': 1, 'link': '../target/cell_line/ENTC00185'}, {'name': 'ENTC00186: MOLT-3', 'value': 1, 'link': '../target/cell_line/ENTC00186'}, {'name': 'ENTC00187: MOLT-4', 'value': 1, 'link': '../target/cell_line/ENTC00187'}, {'name': 'ENTC00190: MV4-11', 'value': 1, 'link': '../target/cell_line/ENTC00190'}, {'name': 'ENTC00191: NB4', 'value': 1, 'link': '../target/cell_line/ENTC00191'}, {'name': 'ENTC00207: NFS-60', 'value': 1, 'link': '../target/cell_line/ENTC00207'}, {'name': 'ENTC00238: RAW 264.7', 'value': 1, 'link': '../target/cell_line/ENTC00238'}, {'name': 'ENTC00239: RBL-2H3', 'value': 1, 'link': '../target/cell_line/ENTC00239'}, {'name': 'ENTC00252: SKM-1', 'value': 1, 'link': '../target/cell_line/ENTC00252'}, {'name': 'ENTC00270: THP-1', 'value': 1, 'link': '../target/cell_line/ENTC00270'}, {'name': 'ENTC00277: U-937', 'value': 1, 'link': '../target/cell_line/ENTC00277'}]}, {'name': 'Liver Cancer (19)', 'value': 19, 'children': [{'name': 'ENTC00047: Chang Liver', 'value': 1, 'link': '../target/cell_line/ENTC00047'}, {'name': 'ENTC00072: H22', 'value': 1, 'link': '../target/cell_line/ENTC00072'}, {'name': 'ENTC00073: H4-II-E', 'value': 1, 'link': '../target/cell_line/ENTC00073'}, {'name': 'ENTC00078: HCCC-9810', 'value': 1, 'link': '../target/cell_line/ENTC00078'}, {'name': 'ENTC00079: HCC-S102', 'value': 1, 'link': '../target/cell_line/ENTC00079'}, {'name': 'ENTC00092: Hep 3B2.1-7', 'value': 1, 'link': '../target/cell_line/ENTC00092'}, {'name': 'ENTC00094: Hep-G2', 'value': 1, 'link': '../target/cell_line/ENTC00094'}, {'name': 'ENTC00095: Hep-G2/2.2.15', 'value': 1, 'link': '../target/cell_line/ENTC00095'}, {'name': 'ENTC00109: HuCC-A1', 'value': 1, 'link': '../target/cell_line/ENTC00109'}, {'name': 'ENTC00110: HuCC-T1', 'value': 1, 'link': '../target/cell_line/ENTC00110'}, {'name': 'ENTC00111: Huh-7', 'value': 1, 'link': '../target/cell_line/ENTC00111'}, {'name': 'ENTC00127: KKU-100', 'value': 1, 'link': '../target/cell_line/ENTC00127'}, {'name': 'ENTC00128: KKU-M139', 'value': 1, 'link': '../target/cell_line/ENTC00128'}, {'name': 'ENTC00129: KKU-213C', 'value': 1, 'link': '../target/cell_line/ENTC00129'}, {'name': 'ENTC00130: KKU-213A', 'value': 1, 'link': '../target/cell_line/ENTC00130'}, {'name': 'ENTC00131: KKU-213B', 'value': 1, 'link': '../target/cell_line/ENTC00131'}, {'name': 'ENTC00142: LIXF 575L', 'value': 1, 'link': '../target/cell_line/ENTC00142'}, {'name': 'ENTC00179: MHCC97-H', 'value': 1, 'link': '../target/cell_line/ENTC00179'}, {'name': 'ENTC00251: SK-HEP-1', 'value': 1, 'link': '../target/cell_line/ENTC00251'}]}, {'name': 'Lung Cancer (22)', 'value': 22, 'children': [{'name': 'ENTC00046: ChaGo', 'value': 1, 'link': '../target/cell_line/ENTC00046'}, {'name': 'ENTC00051: CLS-54', 'value': 1, 'link': '../target/cell_line/ENTC00051'}, {'name': 'ENTC00097: HL 251', 'value': 1, 'link': '../target/cell_line/ENTC00097'}, {'name': 'ENTC00143: LLC', 'value': 1, 'link': '../target/cell_line/ENTC00143'}, {'name': 'ENTC00150: Lu1', 'value': 1, 'link': '../target/cell_line/ENTC00150'}, {'name': 'ENTC00151: Lu-65', 'value': 1, 'link': '../target/cell_line/ENTC00151'}, {'name': 'ENTC00153: LXFA 289L', 'value': 1, 'link': '../target/cell_line/ENTC00153'}, {'name': 'ENTC00154: LXFA 526L', 'value': 1, 'link': '../target/cell_line/ENTC00154'}, {'name': 'ENTC00155: LXFA 629L', 'value': 1, 'link': '../target/cell_line/ENTC00155'}, {'name': 'ENTC00156: LXFL 1121L', 'value': 1, 'link': '../target/cell_line/ENTC00156'}, {'name': 'ENTC00157: LXFL 529L', 'value': 1, 'link': '../target/cell_line/ENTC00157'}, {'name': 'ENTC00158: LXFL H 460', 'value': 1, 'link': '../target/cell_line/ENTC00158'}, {'name': 'ENTC00193: NCI-H125', 'value': 1, 'link': '../target/cell_line/ENTC00193'}, {'name': 'ENTC00194: NCI-H1299', 'value': 1, 'link': '../target/cell_line/ENTC00194'}, {'name': 'ENTC00195: NCI-H1650', 'value': 1, 'link': '../target/cell_line/ENTC00195'}, {'name': 'ENTC00196: NCI-H1688', 'value': 1, 'link': '../target/cell_line/ENTC00196'}, {'name': 'ENTC00197: NCI-H187', 'value': 1, 'link': '../target/cell_line/ENTC00197'}, {'name': 'ENTC00198: NCI-H1975', 'value': 1, 'link': '../target/cell_line/ENTC00198'}, {'name': 'ENTC00199: NCI-H2228', 'value': 1, 'link': '../target/cell_line/ENTC00199'}, {'name': 'ENTC00201: NCI-H358', 'value': 1, 'link': '../target/cell_line/ENTC00201'}, {'name': 'ENTC00202: NCI-H446', 'value': 1, 'link': '../target/cell_line/ENTC00202'}, {'name': 'ENTC00203: NCI-H460', 'value': 1, 'link': '../target/cell_line/ENTC00203'}]}, {'name': 'Lymphoma (8)', 'value': 8, 'children': [{'name': 'ENTC00060: DG-75', 'value': 1, 'link': '../target/cell_line/ENTC00060'}, {'name': 'ENTC00066: Farage', 'value': 1, 'link': '../target/cell_line/ENTC00066'}, {'name': 'ENTC00105: HT', 'value': 1, 'link': '../target/cell_line/ENTC00105'}, {'name': 'ENTC00117: JeKo-1', 'value': 1, 'link': '../target/cell_line/ENTC00117'}, {'name': 'ENTC00122: Karpas-299', 'value': 1, 'link': '../target/cell_line/ENTC00122'}, {'name': 'ENTC00208: OCILY17R', 'value': 1, 'link': '../target/cell_line/ENTC00208'}, {'name': 'ENTC00217: P388', 'value': 1, 'link': '../target/cell_line/ENTC00217'}, {'name': 'ENTC00237: Ramos', 'value': 1, 'link': '../target/cell_line/ENTC00237'}]}, {'name': 'Melanoma (16)', 'value': 16, 'children': [{'name': 'ENTC00007: A2058', 'value': 1, 'link': '../target/cell_line/ENTC00007'}, {'name': 'ENTC00011: A-375', 'value': 1, 'link': '../target/cell_line/ENTC00011'}, {'name': 'ENTC00020: B16', 'value': 1, 'link': '../target/cell_line/ENTC00020'}, {'name': 'ENTC00021: B16-F10', 'value': 1, 'link': '../target/cell_line/ENTC00021'}, {'name': 'ENTC00159: M14', 'value': 1, 'link': '../target/cell_line/ENTC00159'}, {'name': 'ENTC00170: MDA-MB-435', 'value': 1, 'link': '../target/cell_line/ENTC00170'}, {'name': 'ENTC00172: MEXF 1341L', 'value': 1, 'link': '../target/cell_line/ENTC00172'}, {'name': 'ENTC00173: MEXF 462NL', 'value': 1, 'link': '../target/cell_line/ENTC00173'}, {'name': 'ENTC00174: MEXF 276L', 'value': 1, 'link': '../target/cell_line/ENTC00174'}, {'name': 'ENTC00182: MM1.R', 'value': 1, 'link': '../target/cell_line/ENTC00182'}, {'name': 'ENTC00183: MM1.S', 'value': 1, 'link': '../target/cell_line/ENTC00183'}, {'name': 'ENTC00204: NCI-H929', 'value': 1, 'link': '../target/cell_line/ENTC00204'}, {'name': 'ENTC00209: OCI-My5', 'value': 1, 'link': '../target/cell_line/ENTC00209'}, {'name': 'ENTC00210: OPM-2', 'value': 1, 'link': '../target/cell_line/ENTC00210'}, {'name': 'ENTC00253: SK-MEL', 'value': 1, 'link': '../target/cell_line/ENTC00253'}, {'name': 'ENTC00274: U266B1', 'value': 1, 'link': '../target/cell_line/ENTC00274'}]}, {'name': 'Myeloma (3)', 'value': 3, 'children': [{'name': 'ENTC00132: KMS-34', 'value': 1, 'link': '../target/cell_line/ENTC00132'}, {'name': 'ENTC00139: L-363', 'value': 1, 'link': '../target/cell_line/ENTC00139'}, {'name': 'ENTC00242: RPMI-8226', 'value': 1, 'link': '../target/cell_line/ENTC00242'}]}, {'name': 'Nasopharyngeal carcinoma (1)', 'value': 1, 'children': [{'name': 'ENTC00102: HONE-1', 'value': 1, 'link': '../target/cell_line/ENTC00102'}]}, {'name': 'Others (6)', 'value': 6, 'children': [{'name': 'ENTC00160: MA-10', 'value': 1, 'link': '../target/cell_line/ENTC00160'}, {'name': 'ENTC00200: NCI-H226', 'value': 1, 'link': '../target/cell_line/ENTC00200'}, {'name': 'ENTC00232: PXF 1118L', 'value': 1, 'link': '../target/cell_line/ENTC00232'}, {'name': 'ENTC00233: PXF 1752L', 'value': 1, 'link': '../target/cell_line/ENTC00233'}, {'name': 'ENTC00234: PXF 698L', 'value': 1, 'link': '../target/cell_line/ENTC00234'}, {'name': 'ENTC00282: Y-79', 'value': 1, 'link': '../target/cell_line/ENTC00282'}]}, {'name': 'Ovarian Cancer (10)', 'value': 10, 'children': [{'name': 'ENTC00008: A2780', 'value': 1, 'link': '../target/cell_line/ENTC00008'}, {'name': 'ENTC00009: A2780-cisR', 'value': 1, 'link': '../target/cell_line/ENTC00009'}, {'name': 'ENTC00010: A2780/S', 'value': 1, 'link': '../target/cell_line/ENTC00010'}, {'name': 'ENTC00114: IGROV-1/Pt', 'value': 1, 'link': '../target/cell_line/ENTC00114'}, {'name': 'ENTC00212: OVCAR-3', 'value': 1, 'link': '../target/cell_line/ENTC00212'}, {'name': 'ENTC00213: OVCAR-4', 'value': 1, 'link': '../target/cell_line/ENTC00213'}, {'name': 'ENTC00214: OVCAR-5', 'value': 1, 'link': '../target/cell_line/ENTC00214'}, {'name': 'ENTC00215: OVXF 899L', 'value': 1, 'link': '../target/cell_line/ENTC00215'}, {'name': 'ENTC00216: OVXF OVCAR3', 'value': 1, 'link': '../target/cell_line/ENTC00216'}, {'name': 'ENTC00254: SK-OV-3', 'value': 1, 'link': '../target/cell_line/ENTC00254'}]}, {'name': 'Pancreatic Cancer (9)', 'value': 9, 'children': [{'name': 'ENTC00019: AsPC-1', 'value': 1, 'link': '../target/cell_line/ENTC00019'}, {'name': 'ENTC00037: BxPC-3', 'value': 1, 'link': '../target/cell_line/ENTC00037'}, {'name': 'ENTC00043: Capan-2', 'value': 1, 'link': '../target/cell_line/ENTC00043'}, {'name': 'ENTC00180: MIA PaCa-2', 'value': 1, 'link': '../target/cell_line/ENTC00180'}, {'name': 'ENTC00219: PANC-1', 'value': 1, 'link': '../target/cell_line/ENTC00219'}, {'name': 'ENTC00220: PAXF 1657L', 'value': 1, 'link': '../target/cell_line/ENTC00220'}, {'name': 'ENTC00221: PAXF PANC 1', 'value': 1, 'link': '../target/cell_line/ENTC00221'}, {'name': 'ENTC00222: PAXF546', 'value': 1, 'link': '../target/cell_line/ENTC00222'}, {'name': 'ENTC00260: SW1990', 'value': 1, 'link': '../target/cell_line/ENTC00260'}]}, {'name': 'Pituitary Cancer (2)', 'value': 2, 'children': [{'name': 'ENTC00068: GH3', 'value': 1, 'link': '../target/cell_line/ENTC00068'}, {'name': 'ENTC00184: MMQ', 'value': 1, 'link': '../target/cell_line/ENTC00184'}]}, {'name': 'Prostate Cancer (10)', 'value': 10, 'children': [{'name': 'ENTC00002: 22Rv1', 'value': 1, 'link': '../target/cell_line/ENTC00002'}, {'name': 'ENTC00038: C24B', 'value': 1, 'link': '../target/cell_line/ENTC00038'}, {'name': 'ENTC00061: DU145', 'value': 1, 'link': '../target/cell_line/ENTC00061'}, {'name': 'ENTC00225: PC-3', 'value': 1, 'link': '../target/cell_line/ENTC00225'}, {'name': 'ENTC00226: PC-3M', 'value': 1, 'link': '../target/cell_line/ENTC00226'}, {'name': 'ENTC00228: PRXF 22RV1', 'value': 1, 'link': '../target/cell_line/ENTC00228'}, {'name': 'ENTC00229: PRXF DU 145', 'value': 1, 'link': '../target/cell_line/ENTC00229'}, {'name': 'ENTC00230: PRXF LNCAP', 'value': 1, 'link': '../target/cell_line/ENTC00230'}, {'name': 'ENTC00231: PRXF PC3M', 'value': 1, 'link': '../target/cell_line/ENTC00231'}, {'name': 'ENTC00279: VCaP', 'value': 1, 'link': '../target/cell_line/ENTC00279'}]}, {'name': 'Renal Cancer (10)', 'value': 10, 'children': [{'name': 'ENTC00006: 786-O', 'value': 1, 'link': '../target/cell_line/ENTC00006'}, {'name': 'ENTC00015: ACHN', 'value': 1, 'link': '../target/cell_line/ENTC00015'}, {'name': 'ENTC00144: LLC-PK', 'value': 1, 'link': '../target/cell_line/ENTC00144'}, {'name': 'ENTC00145: LLC-PK11', 'value': 1, 'link': '../target/cell_line/ENTC00145'}, {'name': 'ENTC00211: OS-RC-2', 'value': 1, 'link': '../target/cell_line/ENTC00211'}, {'name': 'ENTC00224: PC12', 'value': 1, 'link': '../target/cell_line/ENTC00224'}, {'name': 'ENTC00243: RXF 1781L', 'value': 1, 'link': '../target/cell_line/ENTC00243'}, {'name': 'ENTC00244: RXF 393L', 'value': 1, 'link': '../target/cell_line/ENTC00244'}, {'name': 'ENTC00245: RXF 486L', 'value': 1, 'link': '../target/cell_line/ENTC00245'}, {'name': 'ENTC00271: TK-10', 'value': 1, 'link': '../target/cell_line/ENTC00271'}]}, {'name': 'Sarcomas (3)', 'value': 3, 'children': [{'name': 'ENTC00116: J774A1', 'value': 1, 'link': '../target/cell_line/ENTC00116'}, {'name': 'ENTC00263: SXF SAOS2', 'value': 1, 'link': '../target/cell_line/ENTC00263'}, {'name': 'ENTC00264: SXF TE671', 'value': 1, 'link': '../target/cell_line/ENTC00264'}]}, {'name': 'Tongue Cancer (2)', 'value': 2, 'children': [{'name': 'ENTC00041: CAL-27 cisplatin-resistant', 'value': 1, 'link': '../target/cell_line/ENTC00041'}, {'name': 'ENTC00042: CAL-27 sensitive to cisplatin', 'value': 1, 'link': '../target/cell_line/ENTC00042'}]}, {'name': 'Uterus Cancer (1)', 'value': 1, 'children': [{'name': 'ENTC00278: UXF 1138L', 'value': 1, 'link': '../target/cell_line/ENTC00278'}]}, {'name': 'Vulvar Cancer (1)', 'value': 1, 'children': [{'name': 'ENTC00012: A-431', 'value': 1, 'link': '../target/cell_line/ENTC00012'}]}]}, {'name': 'Finite cell line (5)', 'value': 5, 'children': [{'name': 'Epithelial (1)', 'value': 1, 'children': [{'name': 'ENTC00113: IEC-6', 'value': 1, 'link': '../target/cell_line/ENTC00113'}]}, {'name': 'Fibroblast (2)', 'value': 2, 'children': [{'name': 'ENTC00069: GM07492', 'value': 1, 'link': '../target/cell_line/ENTC00069'}, {'name': 'ENTC00104: Hs27', 'value': 1, 'link': '../target/cell_line/ENTC00104'}]}, {'name': 'Lung (2)', 'value': 2, 'children': [{'name': 'ENTC00188: MRC-5', 'value': 1, 'link': '../target/cell_line/ENTC00188'}, {'name': 'ENTC00281: WI-38', 'value': 1, 'link': '../target/cell_line/ENTC00281'}]}]}, {'name': 'Hybrid cell line (3)', 'value': 3, 'children': [{'name': 'Others (3)', 'value': 3, 'children': [{'name': 'ENTC00005: 5-8F', 'value': 1, 'link': '../target/cell_line/ENTC00005'}, {'name': 'ENTC00052: CNE-2', 'value': 1, 'link': '../target/cell_line/ENTC00052'}, {'name': 'ENTC00062: EA.hy 926', 'value': 1, 'link': '../target/cell_line/ENTC00062'}]}]}, {'name': 'Others (12)', 'value': 12, 'children': [{'name': 'Blood (4)', 'value': 4, 'children': [{'name': 'ENTC00064: Rabbit Erythrocyte', 'value': 1, 'link': '../target/cell_line/ENTC00064'}, {'name': 'ENTC00065: Human Erythrocyte', 'value': 1, 'link': '../target/cell_line/ENTC00065'}, {'name': 'ENTC00103: hPBMC', 'value': 1, 'link': '../target/cell_line/ENTC00103'}, {'name': 'ENTC00223: PBMC', 'value': 1, 'link': '../target/cell_line/ENTC00223'}]}, {'name': 'Fibroblast (1)', 'value': 1, 'children': [{'name': 'ENTC00206: NFF', 'value': 1, 'link': '../target/cell_line/ENTC00206'}]}, {'name': 'Lymphoma (4)', 'value': 4, 'children': [{'name': 'ENTC00024: Mouse B-cell', 'value': 1, 'link': '../target/cell_line/ENTC00024'}, {'name': 'ENTC00258: Mouse Splenocyte', 'value': 1, 'link': '../target/cell_line/ENTC00258'}, {'name': 'ENTC00268: Mouse T-cell', 'value': 1, 'link': '../target/cell_line/ENTC00268'}, {'name': 'ENTC00269: Human T-cell', 'value': 1, 'link': '../target/cell_line/ENTC00269'}]}, {'name': 'Others (1)', 'value': 1, 'children': [{'name': 'ENTC00161: Mouse Macrophage', 'value': 1, 'link': '../target/cell_line/ENTC00161'}]}, {'name': 'Peritoneum (1)', 'value': 1, 'children': [{'name': 'ENTC00227: Mouse Peritoneal Macrophages', 'value': 1, 'link': '../target/cell_line/ENTC00227'}]}, {'name': 'Pituitary (1)', 'value': 1, 'children': [{'name': 'ENTC00241: RPC', 'value': 1, 'link': '../target/cell_line/ENTC00241'}]}]}, {'name': 'Spontaneously immortalized cell line (12)', 'value': 12, 'children': [{'name': 'Breast (1)', 'value': 1, 'children': [{'name': 'ENTC00167: MCF-10A', 'value': 1, 'link': '../target/cell_line/ENTC00167'}]}, {'name': 'Cardiomyoblast (1)', 'value': 1, 'children': [{'name': 'ENTC00074: H9c2(2-1)', 'value': 1, 'link': '../target/cell_line/ENTC00074'}]}, {'name': 'Fibroblast (4)', 'value': 4, 'children': [{'name': 'ENTC00003: 3T3-L1', 'value': 1, 'link': '../target/cell_line/ENTC00003'}, {'name': 'ENTC00022: BALB/3T3 clone A31', 'value': 1, 'link': '../target/cell_line/ENTC00022'}, {'name': 'ENTC00045: NCTC clone 929', 'value': 1, 'link': '../target/cell_line/ENTC00045'}, {'name': 'ENTC00166: MC3T3-E1', 'value': 1, 'link': '../target/cell_line/ENTC00166'}]}, {'name': 'Kidney (2)', 'value': 2, 'children': [{'name': 'ENTC00162: MARC-145', 'value': 1, 'link': '../target/cell_line/ENTC00162'}, {'name': 'ENTC00280: Vero', 'value': 1, 'link': '../target/cell_line/ENTC00280'}]}, {'name': 'Liver (1)', 'value': 1, 'children': [{'name': 'ENTC00029: BRL-3A', 'value': 1, 'link': '../target/cell_line/ENTC00029'}]}, {'name': 'Ovary (2)', 'value': 2, 'children': [{'name': 'ENTC00048: CHO', 'value': 1, 'link': '../target/cell_line/ENTC00048'}, {'name': 'ENTC00049: CHO-K1', 'value': 1, 'link': '../target/cell_line/ENTC00049'}]}, {'name': 'Skin (1)', 'value': 1, 'children': [{'name': 'ENTC00075: HaCaT', 'value': 1, 'link': '../target/cell_line/ENTC00075'}]}]}, {'name': 'Transformed cell line (16)', 'value': 16, 'children': [{'name': 'Blood (1)', 'value': 1, 'children': [{'name': 'ENTC00039: C8166', 'value': 1, 'link': '../target/cell_line/ENTC00039'}]}, {'name': 'Brain (2)', 'value': 2, 'children': [{'name': 'ENTC00033: BV-2', 'value': 1, 'link': '../target/cell_line/ENTC00033'}, {'name': 'ENTC00107: HT22', 'value': 1, 'link': '../target/cell_line/ENTC00107'}]}, {'name': 'Breast (1)', 'value': 1, 'children': [{'name': 'ENTC00067: fR2', 'value': 1, 'link': '../target/cell_line/ENTC00067'}]}, {'name': 'Bronchus (2)', 'value': 2, 'children': [{'name': 'ENTC00025: BEAS-2B', 'value': 1, 'link': '../target/cell_line/ENTC00025'}, {'name': 'ENTC00076: HBE1', 'value': 1, 'link': '../target/cell_line/ENTC00076'}]}, {'name': 'Endometrial (1)', 'value': 1, 'children': [{'name': 'ENTC00100: HMEC', 'value': 1, 'link': '../target/cell_line/ENTC00100'}]}, {'name': 'Epithelial (1)', 'value': 1, 'children': [{'name': 'ENTC00112: HUVEC', 'value': 1, 'link': '../target/cell_line/ENTC00112'}]}, {'name': 'Kidney (6)', 'value': 6, 'children': [{'name': 'ENTC00017: AD-293', 'value': 1, 'link': '../target/cell_line/ENTC00017'}, {'name': 'ENTC00085: HEK293', 'value': 1, 'link': '../target/cell_line/ENTC00085'}, {'name': 'ENTC00086: HEK293-F', 'value': 1, 'link': '../target/cell_line/ENTC00086'}, {'name': 'ENTC00087: HEK293-FT', 'value': 1, 'link': '../target/cell_line/ENTC00087'}, {'name': 'ENTC00088: HEK293T', 'value': 1, 'link': '../target/cell_line/ENTC00088'}, {'name': 'ENTC00089: HEK-Blue hTLR4', 'value': 1, 'link': '../target/cell_line/ENTC00089'}]}, {'name': 'Liver (1)', 'value': 1, 'children': [{'name': 'ENTC00152: LX-2', 'value': 1, 'link': '../target/cell_line/ENTC00152'}]}, {'name': 'Myoblast (1)', 'value': 1, 'children': [{'name': 'ENTC00141: L6', 'value': 1, 'link': '../target/cell_line/ENTC00141'}]}]}]

  ;


option = {
  title: {
    text: 'Sunburst Chart of Cell Line Category',
    subtext: 'Representation of the cell line classification hierarchies. \n' +
        'Click on a section to expand it and then click on the last node exploring the classification level in more detail.',
    textStyle: {
      fontSize: 20,
      align: 'center'
    },
    subtextStyle: {
        fontSize: 15,
      align: 'center'
    },
    left: 'center',  // 将标题居中
    top: '0%'  // 调整标题与树图的距离
  },
  visualMap: {
    type: 'piecewise',
    left: 'left', // 将 visualMap 左对齐
    top: 'middle', // 将 visualMap 上下居中
    bottom: 'middle',
    pieces: [
      { min: 22, max: 234 },
      { min: 10, max: 22 },
      { min: 5, max: 10 },
      { min: 3, max: 5 },
      { min: 1, max: 3 },
      { min: 0, max: 1 },
    ],
    min: 0,
    max: 282,
    inRange: {
      color: ['#73BEDC', '#2DA375', '#F9CB66',
        '#F06869', '#8ACE7D', '#FE875A'],
    },
    itemWidth: 40, // 调整 visualMap 宽度
    itemHeight: 20, // 调整 visualMap 高度
  },
  series: {
    type: 'sunburst',
    data: data,
    radius: [0, '50%'],
    label: {
      show: false,
      rotate: '',
      emphasis: {
        show: true
      }
    },
    emphasis: {
      focus: 'ancestor',
      itemStyle: {
        color: '#ff6600'
      }
    },
    levels: [{},
      {
        r0: '30%',
        r: '45%',
        itemStyle: {
          borderWidth: 2
        },
        label: {
          rotate: '',
          fontSize: 15,
          color: '#3369e7',
          fontWeight: 'bold'
        }
      },
      {
        r0: '45%',
        r: '60%',
        itemStyle: {
          borderWidth: 2
        },
        label: {
          rotate: '',
          fontSize: 15,
          color: '#3369e7',
          fontWeight: 'bold'
        }
      },
      {
        r0: '60%',
        r: '75%',
        label: {
          align: 'right',
          rotate: '',
          fontSize: 15,
          color: '#3369e7',
          fontWeight: 'bold'
        }
      },
      {
        r0: '75%',
        r: '80%',
        label: {
          position: 'outside',
          padding: 3,
          silent: false,
          rotate: 'tangential',
          fontSize: 15,
          color: '#3369e7',
          fontWeight: 'bold'
        },
        itemStyle: {
          borderWidth: 3
        }
      },
    ]
  }
};


var isOuterLinkClicked = false;  // 跟踪最外层链接是否被点击

// Handle node click event
myChart.on('click', function(params) {
  var node = params.data;

  // 判断是否点击了最外层链接
  if (node.link && !isOuterLinkClicked) {
    isOuterLinkClicked = true;  // 标记最外层链接已点击
  } else {
    if (node.link) {
      // 在新页面打开链接
      window.open(node.link, '_blank');
      isOuterLinkClicked = false;
    }
  }
});


if (option && typeof option === 'object') {
  myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);


