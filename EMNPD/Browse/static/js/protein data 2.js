
  var dom = document.getElementById('container6_2');
  var myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
  });
  var app = {};

  var option;

  var data =
      [{'name': 'AB hydrolase superfamily (1)', 'value': 1, 'children': [{'name': 'Lipase family (1)', 'value': 1, 'children': [{'name': 'Unclassified (1)', 'value': 1, 'children': [{'name': 'ENTP00014: Sus scrofa Pancreatic lipase', 'value': 1, 'link': '../target/protein/ENTP00014'}]}]}]}, {'name': 'Metallo-dependent hydrolases superfamily (2)', 'value': 2, 'children': [{'name': 'Adenosine and AMP deaminases family (1)', 'value': 1, 'children': [{'name': 'Unclassified (1)', 'value': 1, 'children': [{'name': 'ENTP00061: Bos taurus Adenosine deaminase', 'value': 1, 'link': '../target/protein/ENTP00061'}]}]}, {'name': 'Urease alpha subunit family (1)', 'value': 1, 'children': [{'name': 'Unclassified (1)', 'value': 1, 'children': [{'name': 'ENTP00065: Canavalia ensiformis Urease', 'value': 1, 'link': '../target/protein/ENTP00065'}]}]}]}, {'name': 'Protein kinase superfamily (36)', 'value': 36, 'children': [{'name': 'CAMK Ser/Thr protein kinase family (1)', 'value': 1, 'children': [{'name': 'SNF1 subfamily (1)', 'value': 1, 'children': [{'name': 'ENTP00068: ARK5', 'value': 1, 'link': '../target/protein/ENTP00068'}]}]}, {'name': 'CMGC Ser/Thr protein kinase family (4)', 'value': 4, 'children': [{'name': 'CDC2/CDKX subfamily (4)', 'value': 4, 'children': [{'name': 'ENTP00047: Human Cyclin-dependent kinase 1', 'value': 1, 'link': '../target/protein/ENTP00047'}, {'name': 'ENTP00048: Human Cyclin-dependent kinase 2', 'value': 1, 'link': '../target/protein/ENTP00048'}, {'name': 'ENTP00049: Human Cyclin-dependent kinase 3', 'value': 1, 'link': '../target/protein/ENTP00049'}, {'name': 'ENTP00050: Human Cyclin-dependent kinase 4', 'value': 1, 'link': '../target/protein/ENTP00050'}]}]}, {'name': 'STE Ser/Thr protein kinase family (1)', 'value': 1, 'children': [{'name': 'COT1 subfamily (1)', 'value': 1, 'children': [{'name': 'ENTP00074: COT', 'value': 1, 'link': '../target/protein/ENTP00074'}]}]}, {'name': 'Ser/Thr protein kinase family (5)', 'value': 5, 'children': [{'name': 'Aurora subfamily (2)', 'value': 2, 'children': [{'name': 'ENTP00069: Aurora-A', 'value': 1, 'link': '../target/protein/ENTP00069'}, {'name': 'ENTP00070: Aurora-B', 'value': 1, 'link': '../target/protein/ENTP00070'}]}, {'name': 'CDC5/Polo subfamily (2)', 'value': 2, 'children': [{'name': 'ENTP00085: PLK1', 'value': 1, 'link': '../target/protein/ENTP00085'}, {'name': 'ENTP00086: CK2-alpha1', 'value': 1, 'link': '../target/protein/ENTP00086'}]}, {'name': 'Tie subfamily (1)', 'value': 1, 'children': [{'name': 'ENTP00087: SAK', 'value': 1, 'link': '../target/protein/ENTP00087'}]}]}, {'name': 'TKL Ser/Thr protein kinase family (1)', 'value': 1, 'children': [{'name': 'RAF subfamily (1)', 'value': 1, 'children': [{'name': 'ENTP00071: B-RAF-VE', 'value': 1, 'link': '../target/protein/ENTP00071'}]}]}, {'name': 'Tyr protein kinase family (24)', 'value': 24, 'children': [{'name': 'ABL subfamily (1)', 'value': 1, 'children': [{'name': 'ENTP00036: ABL1', 'value': 1, 'link': '../target/protein/ENTP00036'}]}, {'name': 'BRK/PTK6/SIK subfamily (1)', 'value': 1, 'children': [{'name': 'ENTP00037: BRK', 'value': 1, 'link': '../target/protein/ENTP00037'}]}, {'name': 'CSF-1/PDGF receptor subfamily (5)', 'value': 5, 'children': [{'name': 'ENTP00033: KDR', 'value': 1, 'link': '../target/protein/ENTP00033'}, {'name': 'ENTP00034: PDGFR α', 'value': 1, 'link': '../target/protein/ENTP00034'}, {'name': 'ENTP00035: PDGFR β', 'value': 1, 'link': '../target/protein/ENTP00035'}, {'name': 'ENTP00081: FLT3', 'value': 1, 'link': '../target/protein/ENTP00081'}, {'name': 'ENTP00084: PDGFR-beta', 'value': 1, 'link': '../target/protein/ENTP00084'}]}, {'name': 'CSK subfamily (1)', 'value': 1, 'children': [{'name': 'ENTP00039: CSK', 'value': 1, 'link': '../target/protein/ENTP00039'}]}, {'name': 'EGF receptor subfamily (4)', 'value': 4, 'children': [{'name': 'ENTP00028: EGFR', 'value': 1, 'link': '../target/protein/ENTP00028'}, {'name': 'ENTP00029: HER2', 'value': 1, 'link': '../target/protein/ENTP00029'}, {'name': 'ENTP00030: HER4', 'value': 1, 'link': '../target/protein/ENTP00030'}, {'name': 'ENTP00076: ERBB2', 'value': 1, 'link': '../target/protein/ENTP00076'}]}, {'name': 'Ephrin receptor subfamily (1)', 'value': 1, 'children': [{'name': 'ENTP00075: EPHB4', 'value': 1, 'link': '../target/protein/ENTP00075'}]}, {'name': 'FAK subfamily (1)', 'value': 1, 'children': [{'name': 'ENTP00077: FAK', 'value': 1, 'link': '../target/protein/ENTP00077'}]}, {'name': 'Insulin receptor subfamily (3)', 'value': 3, 'children': [{'name': 'ENTP00031: IGF1R', 'value': 1, 'link': '../target/protein/ENTP00031'}, {'name': 'ENTP00032: InsR', 'value': 1, 'link': '../target/protein/ENTP00032'}, {'name': 'ENTP00082: INS-R', 'value': 1, 'link': '../target/protein/ENTP00082'}]}, {'name': 'SRC subfamily (4)', 'value': 4, 'children': [{'name': 'ENTP00040: FYN A', 'value': 1, 'link': '../target/protein/ENTP00040'}, {'name': 'ENTP00041: LCK', 'value': 1, 'link': '../target/protein/ENTP00041'}, {'name': 'ENTP00042: LYN B', 'value': 1, 'link': '../target/protein/ENTP00042'}, {'name': 'ENTP00078: SRC', 'value': 1, 'link': '../target/protein/ENTP00078'}]}, {'name': 'TEC subfamily (1)', 'value': 1, 'children': [{'name': 'ENTP00038: BTK', 'value': 1, 'link': '../target/protein/ENTP00038'}]}, {'name': 'Tie subfamily (1)', 'value': 1, 'children': [{'name': 'ENTP00088: TIE2', 'value': 1, 'link': '../target/protein/ENTP00088'}]}, {'name': 'Unclassified (1)', 'value': 1, 'children': [{'name': 'ENTP00083: MET', 'value': 1, 'link': '../target/protein/ENTP00083'}]}]}]}, {'name': 'Unclassified (55)', 'value': 55, 'children': [{'name': 'ATR family (1)', 'value': 1, 'children': [{'name': 'Unclassified (1)', 'value': 1, 'children': [{'name': 'ENTP00025: Human Anthrax toxin receptor 2', 'value': 1, 'link': '../target/protein/ENTP00025'}]}]}, {'name': 'Aldo/keto reductase family (1)', 'value': 1, 'children': [{'name': 'Unclassified (1)', 'value': 1, 'children': [{'name': 'ENTP00066: Human Aldose reductase', 'value': 1, 'link': '../target/protein/ENTP00066'}]}]}, {'name': 'Coronaviruses polyprotein 1ab family (1)', 'value': 1, 'children': [{'name': 'Unclassified (1)', 'value': 1, 'children': [{'name': 'ENTP00006: SARS coronavirus 3C-like proteinase', 'value': 1, 'link': '../target/protein/ENTP00006'}]}]}, {'name': 'Cyclic nucleotide phosphodiesterase family (1)', 'value': 1, 'children': [{'name': 'Unclassified (1)', 'value': 1, 'children': [{'name': 'ENTP00020: Human Phosphodiesterase 5A', 'value': 1, 'link': '../target/protein/ENTP00020'}]}]}, {'name': 'Cytochrome P450 family (1)', 'value': 1, 'children': [{'name': 'Unclassified (1)', 'value': 1, 'children': [{'name': 'ENTP00011: Aromatase', 'value': 1, 'link': '../target/protein/ENTP00011'}]}]}, {'name': 'Flavin monoamine oxidase family (2)', 'value': 2, 'children': [{'name': 'Unclassified (2)', 'value': 2, 'children': [{'name': 'ENTP00018: Rat Monoamine oxidase', 'value': 1, 'link': '../target/protein/ENTP00018'}, {'name': 'ENTP00094: Rat Monoamine oxidase B', 'value': 1, 'link': '../target/protein/ENTP00094'}]}]}, {'name': 'Glycosyl hydrolase 13 family (6)', 'value': 6, 'children': [{'name': 'Unclassified (6)', 'value': 6, 'children': [{'name': 'ENTP00001: Saccharomyces cerevisiae α-glucosidase', 'value': 1, 'link': '../target/protein/ENTP00001'}, {'name': 'ENTP00002: α-glucosidase', 'value': 1, 'link': '../target/protein/ENTP00002'}, {'name': 'ENTP00012: Geobacillus stearothermophilus α-glucosidase', 'value': 1, 'link': '../target/protein/ENTP00012'}, {'name': 'ENTP00013: Spodoptera litura α-glucosidase', 'value': 1, 'link': '../target/protein/ENTP00013'}, {'name': 'ENTP00043: Sus scrofa α-amylase', 'value': 1, 'link': '../target/protein/ENTP00043'}, {'name': 'ENTP00063: Human α-glucosidase', 'value': 1, 'link': '../target/protein/ENTP00063'}]}]}, {'name': 'Glycosyl hydrolase 34 family (1)', 'value': 1, 'children': [{'name': 'Unclassified (1)', 'value': 1, 'children': [{'name': 'ENTP00045: Neuraminidase', 'value': 1, 'link': '../target/protein/ENTP00045'}]}]}, {'name': 'Glycosyl hydrolase 35 family (1)', 'value': 1, 'children': [{'name': 'Unclassified (1)', 'value': 1, 'children': [{'name': 'ENTP00053: Bos taurus β-glucuronidase', 'value': 1, 'link': '../target/protein/ENTP00053'}]}]}, {'name': 'Indoleamine 2,3-dioxygenase family (1)', 'value': 1, 'children': [{'name': 'Unclassified (1)', 'value': 1, 'children': [{'name': 'ENTP00023: Indoleamine 2,3-dioxygenase 2', 'value': 1, 'link': '../target/protein/ENTP00023'}]}]}, {'name': 'Isocitrate and isopropylmalate dehydrogenases family (1)', 'value': 1, 'children': [{'name': 'Unclassified (1)', 'value': 1, 'children': [{'name': 'ENTP00007: Lsocitrate dehydrogenase [NADP] cytoplasmic', 'value': 1, 'link': '../target/protein/ENTP00007'}]}]}, {'name': 'Lipase family (4)', 'value': 4, 'children': [{'name': 'Unclassified (4)', 'value': 4, 'children': [{'name': 'ENTP00003: Acetylcholinesterase', 'value': 1, 'link': '../target/protein/ENTP00003'}, {'name': 'ENTP00009: Human Butyrylcholinesterase', 'value': 1, 'link': '../target/protein/ENTP00009'}, {'name': 'ENTP00022: Butyrylcholinesterase', 'value': 1, 'link': '../target/protein/ENTP00022'}, {'name': 'ENTP00026: Human Carboxylesterase 2', 'value': 1, 'link': '../target/protein/ENTP00026'}]}]}, {'name': 'NOS family (1)', 'value': 1, 'children': [{'name': 'Unclassified (1)', 'value': 1, 'children': [{'name': 'ENTP00015: Mouse Nitric oxide synthase, inducible', 'value': 1, 'link': '../target/protein/ENTP00015'}]}]}, {'name': 'Nuclear hormone receptor family (1)', 'value': 1, 'children': [{'name': 'NR1 subfamily (1)', 'value': 1, 'children': [{'name': 'ENTP00005: Human sapiens Peroxisome proliferator-activated receptor alpha', 'value': 1, 'link': '../target/protein/ENTP00005'}]}]}, {'name': 'PDGF/VEGF growth factor family (2)', 'value': 2, 'children': [{'name': 'Unclassified (2)', 'value': 2, 'children': [{'name': 'ENTP00079: VEGF-R2', 'value': 1, 'link': '../target/protein/ENTP00079'}, {'name': 'ENTP00080: VEGF-R3', 'value': 1, 'link': '../target/protein/ENTP00080'}]}]}, {'name': 'PI3/PI4-kinase family (1)', 'value': 1, 'children': [{'name': 'Unclassified (1)', 'value': 1, 'children': [{'name': 'ENTP00019: PI3Kα', 'value': 1, 'link': '../target/protein/ENTP00019'}]}]}, {'name': 'Peptidase A1 family (1)', 'value': 1, 'children': [{'name': 'Unclassified (1)', 'value': 1, 'children': [{'name': 'ENTP00090: Sus scrofa Pepsin A', 'value': 1, 'link': '../target/protein/ENTP00090'}]}]}, {'name': 'Peptidase M2 family (1)', 'value': 1, 'children': [{'name': 'Unclassified (1)', 'value': 1, 'children': [{'name': 'ENTP00008: Human Angiotensin-converting enzyme', 'value': 1, 'link': '../target/protein/ENTP00008'}]}]}, {'name': 'Peptidase S1 family (2)', 'value': 2, 'children': [{'name': 'Unclassified (2)', 'value': 2, 'children': [{'name': 'ENTP00021: Rat Thrombin', 'value': 1, 'link': '../target/protein/ENTP00021'}, {'name': 'ENTP00027: Human Trypsin', 'value': 1, 'link': '../target/protein/ENTP00027'}]}]}, {'name': 'Peptidase S8 family (1)', 'value': 1, 'children': [{'name': 'Unclassified (1)', 'value': 1, 'children': [{'name': 'ENTP00089: Bacillus subtilis Subtilisin', 'value': 1, 'link': '../target/protein/ENTP00089'}]}]}, {'name': 'Peptidase T1B family (1)', 'value': 1, 'children': [{'name': 'Unclassified (1)', 'value': 1, 'children': [{'name': 'ENTP00064: Human 20S proteasome', 'value': 1, 'link': '../target/protein/ENTP00064'}]}]}, {'name': 'Potassium channel family (1)', 'value': 1, 'children': [{'name': 'Plant (TC 1.A.1.4) subfamily (1)', 'value': 1, 'children': [{'name': 'ENTP00067: AKT1', 'value': 1, 'link': '../target/protein/ENTP00067'}]}]}, {'name': 'Prostaglandin G/H synthase family (3)', 'value': 3, 'children': [{'name': 'Unclassified (3)', 'value': 3, 'children': [{'name': 'ENTP00024: Human Cyclooxygenase-2', 'value': 1, 'link': '../target/protein/ENTP00024'}, {'name': 'ENTP00046: Human Cyclooxygenase-1', 'value': 1, 'link': '../target/protein/ENTP00046'}, {'name': 'ENTP00052: Ovis aries Cyclooxygenase-2', 'value': 1, 'link': '../target/protein/ENTP00052'}]}]}, {'name': 'Protein-tyrosine phosphatase family (3)', 'value': 3, 'children': [{'name': 'Non-receptor class 1 subfamily (1)', 'value': 1, 'children': [{'name': 'ENTP00062: PTP1B', 'value': 1, 'link': '../target/protein/ENTP00062'}]}, {'name': 'Unclassified (2)', 'value': 2, 'children': [{'name': 'ENTP00059: Mycobacterium tuberculosis Phosphotyrosine-protein phosphatase PTPB', 'value': 1, 'link': '../target/protein/ENTP00059'}, {'name': 'ENTP00093: mptpB', 'value': 1, 'link': '../target/protein/ENTP00093'}]}]}, {'name': 'Short-chain dehydrogenases/reductases (SDR) family (1)', 'value': 1, 'children': [{'name': 'Unclassified (1)', 'value': 1, 'children': [{'name': 'ENTP00060: Human 11-β-hydroxysteroid dehydrogenase 1', 'value': 1, 'link': '../target/protein/ENTP00060'}]}]}, {'name': 'Sodium:neurotransmitter symporter (SNF) (TC 2.A.22) family (1)', 'value': 1, 'children': [{'name': 'SLC6A3 subfamily (1)', 'value': 1, 'children': [{'name': 'ENTP00017: Rat Dopamine transporter', 'value': 1, 'link': '../target/protein/ENTP00017'}]}]}, {'name': 'Type IB topoisomerase family (2)', 'value': 2, 'children': [{'name': 'Unclassified (2)', 'value': 2, 'children': [{'name': 'ENTP00016: Human DNA topoisomerase I', 'value': 1, 'link': '../target/protein/ENTP00016'}, {'name': 'ENTP00056: Bos taurus Topoisomerase I', 'value': 1, 'link': '../target/protein/ENTP00056'}]}]}, {'name': 'Type II topoisomerase family (2)', 'value': 2, 'children': [{'name': 'Unclassified (2)', 'value': 2, 'children': [{'name': 'ENTP00057: Bos taurus Topoisomerase II', 'value': 1, 'link': '../target/protein/ENTP00057'}, {'name': 'ENTP00058: Human Topoisomerase II', 'value': 1, 'link': '../target/protein/ENTP00058'}]}]}, {'name': 'Tyrosinase family (2)', 'value': 2, 'children': [{'name': 'Unclassified (2)', 'value': 2, 'children': [{'name': 'ENTP00010: Tyrosinase', 'value': 1, 'link': '../target/protein/ENTP00010'}, {'name': 'ENTP00051: Agaricus bisporus Tyrosinase', 'value': 1, 'link': '../target/protein/ENTP00051'}]}]}, {'name': 'Unclassified (7)', 'value': 7, 'children': [{'name': 'Unclassified (7)', 'value': 7, 'children': [{'name': 'ENTP00044: Oryza sativa NADPH oxidases', 'value': 1, 'link': '../target/protein/ENTP00044'}, {'name': 'ENTP00054: Human LDL', 'value': 1, 'link': '../target/protein/ENTP00054'}, {'name': 'ENTP00055: Human HDL', 'value': 1, 'link': '../target/protein/ENTP00055'}, {'name': 'ENTP00072: CDK2/CycA', 'value': 1, 'link': '../target/protein/ENTP00072'}, {'name': 'ENTP00073: CDK4/CycD1', 'value': 1, 'link': '../target/protein/ENTP00073'}, {'name': 'ENTP00091: LAG3/MHC II', 'value': 1, 'link': '../target/protein/ENTP00091'}, {'name': 'ENTP00092: LAG3/FGL1', 'value': 1, 'link': '../target/protein/ENTP00092'}]}]}, {'name': 'Xanthine dehydrogenase family (1)', 'value': 1, 'children': [{'name': 'Unclassified (1)', 'value': 1, 'children': [{'name': 'ENTP00004: Bos taurus Xanthine oxidase', 'value': 1, 'link': '../target/protein/ENTP00004'}]}]}]}
]
  ;


option = {
  title: {
    text: 'Sunburst Chart of Protein Family',
    subtext: 'Representation of the protein family classification hierarchies. \n' +
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
      { min: 40, max: 55 },
      { min: 25, max: 40 },
      { min: 10, max: 25 },
      { min: 5, max: 10 },
      { min: 1, max: 5 },
      { min: 0, max: 1 },
    ],
    min: 0,
    max: 94,
    inRange: {
      color: ['#8ACE7D', '#FE875A', '#F9CB66',
        '#F06869', '#73BEDC', '#2DA375'],
    },
    itemWidth: 40, // 调整 visualMap 宽度
    itemHeight: 20, // 调整 visualMap 高度
  },
  series: {
    type: 'sunburst',
    data: data,
    radius: [0, '95%'],
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
        r0: '15%',
        r: '30%',
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
        label: {
          align: 'right',
          fontSize: 15,
          rotate: '',
          color: '#3369e7',
          fontWeight: 'bold'
        }
      },
      {
        r0: '60%',
        r: '75%',
        label: {
          position: 'outside',
          padding: 3,
          silent: false,
          rotate: '',
          fontSize: 15,
          color: '#3369e7',
          fontWeight: 'bold'
        },
        itemStyle: {
          borderWidth: 3
        }
      },
      {
        r0: '75%',
        r: '78%',
        label: {
          show: false,
          position: 'outside',
          padding: 3,
          rotate: 'tangential',
          silent: false,
          fontSize: 15,
          color: '#3369e7',
          fontWeight: 'bold'
        },
        itemStyle: {
          borderWidth: 3
        }
      }
    ],
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


