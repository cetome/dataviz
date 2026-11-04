/**
 * cetome dataviz - EN 18031 security mechanisms
 * Copyright (C) 2024-2026 cetome. This data is licensed under CC BY 4.0 (not under the AGPL of the
 * code), see DATA-LICENSE.md. The standards it refers to remain their publishers'.
 *
 * DATA FILE. Nodes and edges of the EN 18031-1/-2/-3 mechanism dependency graph.
 * The graph logic lives in js/en18031.js; the page is en18031/index.html.
 */
const EN18031_DATA = {
        nodes: [
            {
                data: {
                    id: 'ACM-1',
                    title: 'ACM-1',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: false,
                    parent: 'ACM'
                }
            },
            {
                data: {
                    id: 'ACM-2',
                    title: 'ACM-2',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: false,
                    parent: 'ACM'
                }
            },
            {
                data: {
                    id: 'ACM-3',
                    title: 'ACM-3',
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    isParent: false,
                    parent: 'ACM'
                }
            },
            {
                data: {
                    id: 'ACM-4',
                    title: 'ACM-4',
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    isParent: false,
                    parent: 'ACM'
                }
            },
            {
                data: {
                    id: 'ACM-5',
                    title: 'ACM-5',
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    isParent: false,
                    parent: 'ACM'
                }
            },
            {
                data: {
                    id: 'ACM-6',
                    title: 'ACM-6',
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    isParent: false,
                    parent: 'ACM'
                }
            },
            {
                data: {
                    id: 'AUM-1',
                    title: 'AUM-1',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: true,
                    parent: 'AUM'
                }
            },
            {
                data: {
                    id: 'AUM-1-1',
                    title: 'AUM-1-1',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: false,
                    parent: 'AUM-1'
                }
            },
            {
                data: {
                    id: 'AUM-1-2',
                    title: 'AUM-1-2',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: false,
                    parent: 'AUM-1'
                }
            },
            {
                data: {
                    id: 'AUM-1-3',
                    title: 'AUM-1-3',
                    en18031_1: false,
                    en18031_2: false,
                    en18031_3: true,
                    isParent: false,
                    parent: 'AUM-1'
                }
            },
            {
                data: {
                    id: 'AUM-2',
                    title: 'AUM-2',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: true,
                    parent: 'AUM'
                }
            },
            {
                data: {
                    id: 'AUM-2-1',
                    title: 'AUM-2-1',
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: false,
                    parent: 'AUM-2'
                }
            },
            {
                data: {
                    id: 'AUM-2-2',
                    title: 'AUM-2-2',
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: false,
                    parent: 'AUM-2'
                }
            },
            {
                data: {
                    id: 'AUM-3',
                    title: 'AUM-3',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: false,
                    parent: 'AUM'
                }
            },
            {
                data: {
                    id: 'AUM-4',
                    title: 'AUM-4',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: false,
                    parent: 'AUM'
                }
            },
            {
                data: {
                    id: 'AUM-5',
                    title: 'AUM-5',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: true,
                    parent: 'AUM'
                }
            },
            {
                data: {
                    id: 'AUM-5-1',
                    title: 'AUM-5-1',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: false,
                    parent: 'AUM-5'
                }
            },
            {
                data: {
                    id: 'AUM-5-2',
                    title: 'AUM-5-2',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: false,
                    parent: 'AUM-5'
                }
            },
            {
                data: {
                    id: 'AUM-6',
                    title: 'AUM-6',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: false,
                    parent: 'AUM'
                }
            },
            {
                data: {
                    id: 'SUM-1',
                    title: 'SUM-1',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: false,
                    parent: 'SUM'
                }
            },
            {
                data: {
                    id: 'SUM-2',
                    title: 'SUM-2',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: false,
                    parent: 'SUM'
                }
            },
            {
                data: {
                    id: 'SUM-3',
                    title: 'SUM-3',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: false,
                    parent: 'SUM'
                }
            },
            {
                data: {
                    id: 'SSM-1',
                    title: 'SSM-1',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: false,
                    parent: 'SSM'
                }
            },
            {
                data: {
                    id: 'SSM-2',
                    title: 'SSM-2',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: false,
                    parent: 'SSM'
                }
            },
            {
                data: {
                    id: 'SSM-3',
                    title: 'SSM-3',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: false,
                    parent: 'SSM'
                }
            },
            {
                data: {
                    id: 'SCM-1',
                    title: 'SCM-1',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: false,
                    parent: 'SCM'
                }
            },
            {
                data: {
                    id: 'SCM-2',
                    title: 'SCM-2',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: false,
                    parent: 'SCM'
                }
            },
            {
                data: {
                    id: 'SCM-3',
                    title: 'SCM-3',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: false,
                    parent: 'SCM'
                }
            },
            {
                data: {
                    id: 'SCM-4',
                    title: 'SCM-4',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: false,
                    parent: 'SCM'
                }
            },
            {
                data: {
                    id: 'RLM-1',
                    title: 'RLM-1',
                    en18031_1: true,
                    en18031_2: false,
                    en18031_3: false,
                    isParent: false,
                    parent: 'RLM'
                }
            },
            {
                data: {
                    id: 'NMM-1',
                    title: 'NMM-1',
                    en18031_1: true,
                    en18031_2: false,
                    en18031_3: false,
                    isParent: false,
                    parent: 'NMM'
                }
            },
            {
                data: {
                    id: 'TCM-1',
                    title: 'TCM-1',
                    en18031_1: true,
                    en18031_2: false,
                    en18031_3: false,
                    isParent: false,
                    parent: 'TCM'
                }
            },
            {
                data: {
                    id: 'LGM-1',
                    title: 'LGM-1',
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: false,
                    parent: 'LGM'
                }
            },
            {
                data: {
                    id: 'LGM-2',
                    title: 'LGM-2',
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: false,
                    parent: 'LGM'
                }
            },
            {
                data: {
                    id: 'LGM-3',
                    title: 'LGM-3',
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: false,
                    parent: 'LGM'
                }
            },
            {
                data: {
                    id: 'LGM-4',
                    title: 'LGM-4',
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: false,
                    parent: 'LGM'
                }
            },
            {
                data: {
                    id: 'DLM-1',
                    title: 'DLM-1',
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    isParent: false,
                    parent: 'DLM'
                }
            },
            {
                data: {
                    id: 'UNM-1',
                    title: 'UNM-1',
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    isParent: false,
                    parent: 'UNM'
                }
            },
            {
                data: {
                    id: 'UNM-2',
                    title: 'UNM-2',
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    isParent: false,
                    parent: 'UNM'
                }
            },
            {
                data: {
                    id: 'CCK-1',
                    title: 'CCK-1',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: false,
                    parent: 'CCK'
                }
            },
            {
                data: {
                    id: 'CCK-2',
                    title: 'CCK-2',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: false,
                    parent: 'CCK'
                }
            },
            {
                data: {
                    id: 'CCK-3',
                    title: 'CCK-3',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: false,
                    parent: 'CCK'
                }
            },
            {
                data: {
                    id: 'GEC-1',
                    title: 'GEC-1',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: false,
                    parent: 'GEC'
                }
            },
            {
                data: {
                    id: 'GEC-2',
                    title: 'GEC-2',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: false,
                    parent: 'GEC'
                }
            },
            {
                data: {
                    id: 'GEC-3',
                    title: 'GEC-3',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: false,
                    parent: 'GEC'
                }
            },
            {
                data: {
                    id: 'GEC-4',
                    title: 'GEC-4',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: false,
                    parent: 'GEC'
                }
            },
            {
                data: {
                    id: 'GEC-5',
                    title: 'GEC-5',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: false,
                    parent: 'GEC'
                }
            },
            {
                data: {
                    id: 'GEC-6',
                    title: 'GEC-6',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: false,
                    parent: 'GEC'
                }
            },
            {
                data: {
                    id: 'GEC-7',
                    title: 'GEC-7',
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    isParent: false,
                    parent: 'GEC'
                }
            },
            {
                data: {
                    id: 'GEC-8',
                    title: 'GEC-8',
                    en18031_1: false,
                    en18031_2: false,
                    en18031_3: true,
                    isParent: false,
                    parent: 'GEC'
                }
            },
            {
                data: {
                    id: 'CRY-1',
                    title: 'CRY-1',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: false,
                    parent: 'CRY'
                }
            },
            {
                data: {
                    id: 'ACM',
                    title: 'ACM',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: true
                }
            },
            {
                data: {
                    id: 'AUM',
                    title: 'AUM',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: true
                }
            },
            {
                data: {
                    id: 'SUM',
                    title: 'SUM',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: true
                }
            },
            {
                data: {
                    id: 'SSM',
                    title: 'SSM',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: true
                }
            },
            {
                data: {
                    id: 'SCM',
                    title: 'SCM',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: true
                }
            },
            {
                data: {
                    id: 'RLM',
                    title: 'RLM',
                    en18031_1: true,
                    en18031_2: false,
                    en18031_3: false,
                    isParent: true
                }
            },
            {
                data: {
                    id: 'NMM',
                    title: 'NMM',
                    en18031_1: true,
                    en18031_2: false,
                    en18031_3: false,
                    isParent: true
                }
            },
            {
                data: {
                    id: 'TCM',
                    title: 'TCM',
                    en18031_1: true,
                    en18031_2: false,
                    en18031_3: false,
                    isParent: true
                }
            },
            {
                data: {
                    id: 'LGM',
                    title: 'LGM',
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: true
                }
            },
            {
                data: {
                    id: 'DLM',
                    title: 'DLM',
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    isParent: true
                }
            },
            {
                data: {
                    id: 'UNM',
                    title: 'UNM',
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    isParent: true
                }
            },
            {
                data: {
                    id: 'CCK',
                    title: 'CCK',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: true
                }
            },
            {
                data: {
                    id: 'GEC',
                    title: 'GEC',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: true
                }
            },
            {
                data: {
                    id: 'CRY',
                    title: 'CRY',
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    isParent: true
                }
            }
        ],
        edges: [
            {
                data: {
                    id: 'ACM-1-ACM-2',
                    source: 'ACM-1',
                    target: 'ACM-2',
                    label: 'access control'
                }
            },
            {
                data: {
                    id: 'AUM-ACM-2',
                    source: 'AUM',
                    target: 'ACM-2',
                    label: 'authentication'
                }
            },
            {
                data: {
                    id: 'ACM-1-ACM-3',
                    source: 'ACM-1',
                    target: 'ACM-3',
                    label: 'access control'
                }
            },
            {
                data: {
                    id: 'ACM-1-ACM-4',
                    source: 'ACM-1',
                    target: 'ACM-4',
                    label: 'access control'
                }
            },
            {
                data: {
                    id: 'ACM-1-ACM-5',
                    source: 'ACM-1',
                    target: 'ACM-5',
                    label: 'access control'
                }
            },
            {
                data: {
                    id: 'ACM-1-ACM-6',
                    source: 'ACM-1',
                    target: 'ACM-6',
                    label: 'access control'
                }
            },
            {
                data: {
                    id: 'ACM-1-AUM-1',
                    source: 'ACM-1',
                    target: 'AUM-1',
                    label: 'access control'
                }
            },
            {
                data: {
                    id: 'ACM-1-AUM-1-1',
                    source: 'ACM-1',
                    target: 'AUM-1-1',
                    label: 'access control'
                }
            },
            {
                data: {
                    id: 'ACM-1-AUM-1-2',
                    source: 'ACM-1',
                    target: 'AUM-1-2',
                    label: 'access control'
                }
            },
            {
                data: {
                    id: 'ACM-1-AUM-1-3',
                    source: 'ACM-1',
                    target: 'AUM-1-3',
                    label: 'access control'
                }
            },
            {
                data: {
                    id: 'AUM-1-1-AUM-2',
                    source: 'AUM-1-1',
                    target: 'AUM-2',
                    label: 'authentication'
                }
            },
            {
                data: {
                    id: 'AUM-1-2-AUM-2',
                    source: 'AUM-1-2',
                    target: 'AUM-2',
                    label: 'authentication'
                }
            },
            {
                data: {
                    id: 'AUM-1-1-AUM-2-1',
                    source: 'AUM-1-1',
                    target: 'AUM-2-1',
                    label: 'authentication'
                }
            },
            {
                data: {
                    id: 'AUM-1-2-AUM-2-1',
                    source: 'AUM-1-2',
                    target: 'AUM-2-1',
                    label: 'authentication'
                }
            },
            {
                data: {
                    id: 'AUM-1-3-AUM-2-1',
                    source: 'AUM-1-3',
                    target: 'AUM-2-1',
                    label: 'authentication'
                }
            },
            {
                data: {
                    id: 'AUM-1-1-AUM-2-2',
                    source: 'AUM-1-1',
                    target: 'AUM-2-2',
                    label: 'authentication'
                }
            },
            {
                data: {
                    id: 'AUM-1-2-AUM-2-2',
                    source: 'AUM-1-2',
                    target: 'AUM-2-2',
                    label: 'authentication'
                }
            },
            {
                data: {
                    id: 'AUM-1-3-AUM-2-2',
                    source: 'AUM-1-3',
                    target: 'AUM-2-2',
                    label: 'authentication'
                }
            },
            {
                data: {
                    id: 'AUM-1-1-AUM-3',
                    source: 'AUM-1-1',
                    target: 'AUM-3',
                    label: 'authentication'
                }
            },
            {
                data: {
                    id: 'AUM-1-2-AUM-3',
                    source: 'AUM-1-2',
                    target: 'AUM-3',
                    label: 'authentication'
                }
            },
            {
                data: {
                    id: 'AUM-1-3-AUM-3',
                    source: 'AUM-1-3',
                    target: 'AUM-3',
                    label: 'authentication'
                }
            },
            {
                data: {
                    id: 'AUM-1-1-AUM-4',
                    source: 'AUM-1-1',
                    target: 'AUM-4',
                    label: 'authentication'
                }
            },
            {
                data: {
                    id: 'AUM-1-2-AUM-4',
                    source: 'AUM-1-2',
                    target: 'AUM-4',
                    label: 'authentication'
                }
            },
            {
                data: {
                    id: 'AUM-1-3-AUM-4',
                    source: 'AUM-1-3',
                    target: 'AUM-4',
                    label: 'authentication'
                }
            },
            {
                data: {
                    id: 'AUM-1-1-AUM-5',
                    source: 'AUM-1-1',
                    target: 'AUM-5',
                    label: 'authentication'
                }
            },
            {
                data: {
                    id: 'AUM-1-2-AUM-5',
                    source: 'AUM-1-2',
                    target: 'AUM-5',
                    label: 'authentication'
                }
            },
            {
                data: {
                    id: 'AUM-1-3-AUM-5',
                    source: 'AUM-1-3',
                    target: 'AUM-5',
                    label: 'authentication'
                }
            },
            {
                data: {
                    id: 'AUM-1-1-AUM-5-1',
                    source: 'AUM-1-1',
                    target: 'AUM-5-1',
                    label: 'authentication'
                }
            },
            {
                data: {
                    id: 'AUM-1-2-AUM-5-1',
                    source: 'AUM-1-2',
                    target: 'AUM-5-1',
                    label: 'authentication'
                }
            },
            {
                data: {
                    id: 'AUM-1-3-AUM-5-1',
                    source: 'AUM-1-3',
                    target: 'AUM-5-1',
                    label: 'authentication'
                }
            },
            {
                data: {
                    id: 'AUM-1-1-AUM-5-2',
                    source: 'AUM-1-1',
                    target: 'AUM-5-2',
                    label: 'authentication'
                }
            },
            {
                data: {
                    id: 'AUM-1-2-AUM-5-2',
                    source: 'AUM-1-2',
                    target: 'AUM-5-2',
                    label: 'authentication'
                }
            },
            {
                data: {
                    id: 'AUM-1-3-AUM-5-2',
                    source: 'AUM-1-3',
                    target: 'AUM-5-2',
                    label: 'authentication'
                }
            },
            {
                data: {
                    id: 'AUM-1-1-AUM-6',
                    source: 'AUM-1-1',
                    target: 'AUM-6',
                    label: 'authentication'
                }
            },
            {
                data: {
                    id: 'AUM-1-2-AUM-6',
                    source: 'AUM-1-2',
                    target: 'AUM-6',
                    label: 'authentication'
                }
            },
            {
                data: {
                    id: 'AUM-1-3-AUM-6',
                    source: 'AUM-1-3',
                    target: 'AUM-6',
                    label: 'authentication'
                }
            },
            {
                data: {
                    id: 'SUM-1-SUM-2',
                    source: 'SUM-1',
                    target: 'SUM-2',
                    label: 'update'
                }
            },
            {
                data: {
                    id: 'CRY-1-SUM-2',
                    source: 'CRY-1',
                    target: 'SUM-2',
                    label: 'update'
                }
            },
            {
                data: {
                    id: 'SCM-1-SUM-2',
                    source: 'SCM-1',
                    target: 'SUM-2',
                    label: 'update'
                }
            },
            {
                data: {
                    id: 'ACM-2-SUM-2',
                    source: 'ACM-2',
                    target: 'SUM-2',
                    label: 'update'
                }
            },
            {
                data: {
                    id: 'SUM-1-SUM-3',
                    source: 'SUM-1',
                    target: 'SUM-3',
                    label: 'update'
                }
            },
            {
                data: {
                    id: 'SSM-1-SSM-2',
                    source: 'SSM-1',
                    target: 'SSM-2',
                    label: 'secure storage'
                }
            },
            {
                data: {
                    id: 'SSM-1-SSM-3',
                    source: 'SSM-1',
                    target: 'SSM-3',
                    label: 'secure storage'
                }
            },
            {
                data: {
                    id: 'CRY-1-SCM-1',
                    source: 'CRY-1',
                    target: 'SCM-1',
                    label: 'best practice'
                }
            },
            {
                data: {
                    id: 'SCM-1-SCM-2',
                    source: 'SCM-1',
                    target: 'SCM-2',
                    label: 'secure communication'
                }
            },
            {
                data: {
                    id: 'CRY-1-SCM-2',
                    source: 'CRY-1',
                    target: 'SCM-2',
                    label: 'best practice'
                }
            },
            {
                data: {
                    id: 'GEC-1-SCM-2',
                    source: 'GEC-1',
                    target: 'SCM-2',
                    label: 'vulnerability review'
                }
            },
            {
                data: {
                    id: 'SCM-1-SCM-3',
                    source: 'SCM-1',
                    target: 'SCM-3',
                    label: 'secure communication'
                }
            },
            {
                data: {
                    id: 'CRY-1-SCM-3',
                    source: 'CRY-1',
                    target: 'SCM-3',
                    label: 'best practice'
                }
            },
            {
                data: {
                    id: 'GEC-1-SCM-3',
                    source: 'GEC-1',
                    target: 'SCM-3',
                    label: 'vulnerability review'
                }
            },
            {
                data: {
                    id: 'SCM-1-SCM-4',
                    source: 'SCM-1',
                    target: 'SCM-4',
                    label: 'secure communication'
                }
            },
            {
                data: {
                    id: 'CRY-1-SCM-4',
                    source: 'CRY-1',
                    target: 'SCM-4',
                    label: 'best practice'
                }
            },
            {
                data: {
                    id: 'LGM-1-LGM-2',
                    source: 'LGM-1',
                    target: 'LGM-2',
                    label: 'logging'
                }
            },
            {
                data: {
                    id: 'LGM-1-LGM-3',
                    source: 'LGM-1',
                    target: 'LGM-3',
                    label: 'log data stored on device'
                }
            },
            {
                data: {
                    id: 'LGM-1-LGM-4',
                    source: 'LGM-1',
                    target: 'LGM-4',
                    label: 'log data stored on device'
                }
            },
            {
                data: {
                    id: 'UNM-1-UNM-2',
                    source: 'UNM-1',
                    target: 'UNM-2',
                    label: 'notification'
                }
            },
            {
                data: {
                    id: 'CRY-1-CCK-1',
                    source: 'CRY-1',
                    target: 'CCK-1',
                    label: 'best practice'
                }
            },
            {
                data: {
                    id: 'CCK-2-CCK-1',
                    source: 'CCK-2',
                    target: 'CCK-1',
                    label: 'documentation'
                }
            },
            {
                data: {
                    id: 'CRY-1-CCK-2',
                    source: 'CRY-1',
                    target: 'CCK-2',
                    label: 'best practice'
                }
            },
            {
                data: {
                    id: 'SUM-1-CRY-1',
                    source: 'SUM-1',
                    target: 'CRY-1',
                    label: 'update'
                }
            },
            {
                data: {
                    id: 'CRY-1-AUM',
                    source: 'CRY-1',
                    target: 'AUM',
                    label: 'best practice'
                }
            },
            {
                data: {
                    id: 'CRY-1-SUM',
                    source: 'CRY-1',
                    target: 'SUM',
                    label: 'best practice'
                }
            },
            {
                data: {
                    id: 'CRY-1-SSM',
                    source: 'CRY-1',
                    target: 'SSM',
                    label: 'best practice'
                }
            },
            {
                data: {
                    id: 'CRY-1-SCM',
                    source: 'CRY-1',
                    target: 'SCM',
                    label: 'best practice'
                }
            }
        ]
};
