/**
 * cetome dataviz - EN 303 645 / TS 103 701
 * Copyright (C) 2024-2026 cetome. This data is licensed under CC BY 4.0 (not under the AGPL of the
 * code), see DATA-LICENSE.md. The standards it refers to remain their publishers'.
 *
 * DATA FILE. Nodes and edges of the EN 303 645 provisions / TS 103 701 IXIT graph, and the saved node positions.
 * The graph logic lives in js/en303645.js; the page is en303645/index.html.
 */
const EN303645_DATA = {
        nodes: [
        { data: { id: '4', title: '4 Reporting implementation', type: 'parent' } },
        { data: { id: '5.1', title: '5.1 No universal default password', type: 'parent' } },
        { data: { id: '5.2', title: '5.2 Implement a means to manage reports of vulnerabilities', type: 'parent' } },
        { data: { id: '5.3', title: '5.3 Keep software updated', type: 'parent' } },
        { data: { id: '5.4', title: '5.4 Securely store sensitive security parameters', type: 'parent' } },
        { data: { id: '5.5', title: '5.5 Communicate securely', type: 'parent' } },
        { data: { id: '5.6', title: '5.6 Minimize exposed attack surfaces', type: 'parent' } },
        { data: { id: '5.7', title: '5.7 Ensure software integrity', type: 'parent' } },
        { data: { id: '5.8', title: '5.8 Ensure that personal data is secure', type: 'parent' } },
        { data: { id: '5.9', title: '5.9 Make system resilient to outages', type: 'parent' } },
        { data: { id: '5.10', title: '5.10 Examine system telemetry data', type: 'parent' } },
        { data: { id: '5.11', title: '5.11 Make it easy for users to delete user data', type: 'parent' } },
        { data: { id: '5.12', title: '5.12 Make installation and maintenance of devices easy', type: 'parent' } },
        { data: { id: '5.13', title: '5.13 Validate input data', type: 'parent' } },
        { data: { id: '6', title: '6 Data protection provision for consumer IoT', type: 'parent' } },

        { data: { id: '4-1', parent: '4', type: 'mandatory' } },

        { data: { id: '5.1-1', parent: '5.1', type: 'mandatory', condition: 'c1' } },
        { data: { id: '5.1-2', parent: '5.1', type: 'mandatory', condition: 'c2' } },
        { data: { id: '5.1-3', parent: '5.1', type: 'mandatory' } },
        { data: { id: '5.1-4', parent: '5.1', type: 'mandatory', condition: 'c8' } },
        { data: { id: '5.1-5', parent: '5.1', type: 'mandatory' } },

        { data: { id: '5.2-1', parent: '5.2', type: 'mandatory'  } },
        { data: { id: '5.2-2', parent: '5.2', type: 'recommended' } },
        { data: { id: '5.2-3', parent: '5.2', type: 'recommended' } },

        { data: { id: '5.3-1', parent: '5.3', type: 'recommended' } },
        { data: { id: '5.3-2', parent: '5.3', type: 'mandatory', condition: 'c5' } },
        { data: { id: '5.3-3', parent: '5.3', type: 'mandatory', condition: 'c12' } },
        { data: { id: '5.3-4', parent: '5.3', type: 'recommended', condition: 'c12' } },
        { data: { id: '5.3-5', parent: '5.3', type: 'recommended', condition: ['c9', 'c12'] } },
        { data: { id: '5.3-6', parent: '5.3', type: 'recommended', condition: 'c12' } },
        { data: { id: '5.3-7', parent: '5.3', type: 'mandatory', condition: 'c12' } },
        { data: { id: '5.3-8', parent: '5.3', type: 'mandatory', condition: 'c12' } },
        { data: { id: '5.3-9', parent: '5.3', type: 'recommended', condition: 'c12' } },
        { data: { id: '5.3-10', parent: '5.3', type: 'mandatory', condition: ['c11', 'c12'] } },
        { data: { id: '5.3-11', parent: '5.3', type: 'recommended', condition: 'c12' } },
        { data: { id: '5.3-12', parent: '5.3', type: 'recommended', condition: 'c12' } },
        { data: { id: '5.3-13', parent: '5.3', type: 'mandatory' } },
        { data: { id: '5.3-14', parent: '5.3', type: 'recommended', condition: ['c3', 'c4'] } },
        { data: { id: '5.3-15', parent: '5.3', type: 'recommended', condition: ['c3', 'c4'] } },
        { data: { id: '5.3-16', parent: '5.3', type: 'mandatory' } },
        
        { data: { id: '5.4-1', parent: '5.4', type: 'mandatory' } },
        { data: { id: '5.4-2', parent: '5.4', type: 'mandatory', condition: 'c10' } },
        { data: { id: '5.4-3', parent: '5.4', type: 'mandatory' } },
        { data: { id: '5.4-4', parent: '5.4', type: 'mandatory' } },
        
        { data: { id: '5.5-1', parent: '5.5', type: 'mandatory' } },
        { data: { id: '5.5-2', parent: '5.5', type: 'recommended' } },
        { data: { id: '5.5-3', parent: '5.5', type: 'recommended' } },
        { data: { id: '5.5-4', parent: '5.5', type: 'recommended' } },
        { data: { id: '5.5-5', parent: '5.5', type: 'mandatory' } },
        { data: { id: '5.5-6', parent: '5.5', type: 'recommended' } },
        { data: { id: '5.5-7', parent: '5.5', type: 'mandatory' } },
        { data: { id: '5.5-8', parent: '5.5', type: 'mandatory' } },

        { data: { id: '5.6-1', parent: '5.6', type: 'mandatory' } },
        { data: { id: '5.6-2', parent: '5.6', type: 'mandatory' } },
        { data: { id: '5.6-3', parent: '5.6', type: 'recommended' } },
        { data: { id: '5.6-4', parent: '5.6', type: 'mandatory', condition: 'c13' } },
        { data: { id: '5.6-5', parent: '5.6', type: 'recommended' } },
        { data: { id: '5.6-6', parent: '5.6', type: 'recommended' } },
        { data: { id: '5.6-7', parent: '5.6', type: 'recommended' } },
        { data: { id: '5.6-8', parent: '5.6', type: 'recommended' } },
        { data: { id: '5.6-9', parent: '5.6', type: 'recommended' } },
        
        { data: { id: '5.7-1', parent: '5.7', type: 'recommended' } },
        { data: { id: '5.7-2', parent: '5.7', type: 'recommended' } },

        { data: { id: '5.8-1', parent: '5.8', type: 'recommended' } },
        { data: { id: '5.8-2', parent: '5.8', type: 'mandatory' } },
        { data: { id: '5.8-3', parent: '5.8', type: 'mandatory' } },

        { data: { id: '5.9-1', parent: '5.9', type: 'recommended' } },
        { data: { id: '5.9-2', parent: '5.9', type: 'recommended' } },
        { data: { id: '5.9-3', parent: '5.9', type: 'recommended' } },

        { data: { id: '5.10-1', parent: '5.10', type: 'recommended', condition: 'c6'  } },

        { data: { id: '5.11-1', parent: '5.11', type: 'mandatory' } },
        { data: { id: '5.11-2', parent: '5.11', type: 'recommended' } },
        { data: { id: '5.11-3', parent: '5.11', type: 'recommended' } },
        { data: { id: '5.11-4', parent: '5.11', type: 'recommended' } },

        { data: { id: '5.12-1', parent: '5.12', type: 'recommended' } },
        { data: { id: '5.12-2', parent: '5.12', type: 'recommended' } },
        { data: { id: '5.12-3', parent: '5.12', type: 'recommended' } },

        { data: { id: '5.13-1', parent: '5.13', type: 'mandatory' } },

        { data: { id: '6-1', parent: '6', type: 'mandatory' } },
        { data: { id: '6-2', parent: '6', type: 'mandatory', condition: 'c7'  } },
        { data: { id: '6-3', parent: '6', type: 'mandatory' } },
        { data: { id: '6-4', parent: '6', type: 'recommended', condition: 'c6'  } },
        { data: { id: '6-5', parent: '6', type: 'mandatory', condition: 'c6'  } },
        
        { data: { id: 'IXIT 1-AuthMech', type: 'IXIT' } },
        { data: { id: 'IXIT 2-UserInfo', type: 'IXIT' } },
        { data: { id: 'IXIT 3-VulnTypes', type: 'IXIT' } },
        { data: { id: 'IXIT 4-Conf', type: 'IXIT' } },
        { data: { id: 'IXIT 5-VulnMon', type: 'IXIT' } },
        { data: { id: 'IXIT 6-SoftComp', type: 'IXIT' } },
        { data: { id: 'IXIT 7-UpdMech', type: 'IXIT' } },
        { data: { id: 'IXIT 8-UpdProc', type: 'IXIT' } },
        { data: { id: 'IXIT 9-ReplSup', type: 'IXIT' } },
        { data: { id: 'IXIT 10-SecParam', type: 'IXIT' } },
        { data: { id: 'IXIT 11-ComMech', type: 'IXIT' } },
        { data: { id: 'IXIT 12-NetSecImpl', type: 'IXIT' } },
        { data: { id: 'IXIT 13-SoftServ', type: 'IXIT' } },
        { data: { id: 'IXIT 14-SecMgmt', type: 'IXIT' } },
        { data: { id: 'IXIT 15-Intf', type: 'IXIT' } },
        { data: { id: 'IXIT 16-CodeMin', type: 'IXIT' } },
        { data: { id: 'IXIT 17-PrivlCtrl', type: 'IXIT' } },
        { data: { id: 'IXIT 18-AccCtrl', type: 'IXIT' } },
        { data: { id: 'IXIT 19-SecDev', type: 'IXIT' } },
        { data: { id: 'IXIT 20-SecBoot', type: 'IXIT' } },
        { data: { id: 'IXIT 21-PersData', type: 'IXIT' } },
        { data: { id: 'IXIT 22-ExtSens', type: 'IXIT' } },
        { data: { id: 'IXIT 23-ResMech', type: 'IXIT' } },
        { data: { id: 'IXIT 24-TelData', type: 'IXIT' } },
        { data: { id: 'IXIT 25-DelFunc', type: 'IXIT' } },
        { data: { id: 'IXIT 26-UserDec', type: 'IXIT' } },
        { data: { id: 'IXIT 27-UserIntf', type: 'IXIT' } },
        { data: { id: 'IXIT 28-ExtAPI', type: 'IXIT' } },
        { data: { id: 'IXIT 29-InpVal', type: 'IXIT' } }
      ],
      edges: [
      {
          data: {
            id: '5.1-1#IXIT 1',
            source: '5.1-1',
            target: 'IXIT 1-AuthMech',
            documentation: 'ID, Description, Authentication Factor, Password Generation Mechanism',
          }, 
        },
        {
          data: {
            id: '5.1-2#IXIT 1',
            source: '5.1-2',
            target: 'IXIT 1-AuthMech',
            documentation: 'ID, Description, Authentication Factor, Password Generation Mechanism',
          }, 
        },
        {
          data: {
            id: '5.1-3#IXIT 1',
            source: '5.1-3',
            target: 'IXIT 1-AuthMech',
            documentation: 'ID, Description, Security Guarantees, Cryptographic Details',
          }, 
        },
        {
          data: {
            id: '5.1-4#IXIT 1',
            source: '5.1-4',
            target: 'IXIT 1-AuthMech',
            documentation: 'ID, Description',
          }, 
        },
        {
          data: {
            id: '5.1-4#IXIT 2',
            source: '5.1-4',
            target: 'IXIT 2-UserInfo',
            documentation: 'Documentation of Change Mechanisms',
          }, 
        },
        {
          data: {
            id: '5.1-5#IXIT 1',
            source: '5.1-5',
            target: 'IXIT 1-AuthMech',
            documentation: 'ID, Description, Brute Force Prevention',
          }, 
        },
        {
          data: {
            id: '5.2-1#IXIT 2',
            source: '5.2-1',
            target: 'IXIT 2-UserInfo',
            documentation: 'Publication of Vulnerability Disclosure Policy',
          }, 
        },
        {
          data: {
            id: '5.2-2#IXIT 2',
            source: '5.2-2',
            target: 'IXIT 2-UserInfo',
            documentation: 'Publication of Vulnerability Disclosure Policy',
          }, 
        },
        {
          data: {
            id: '5.2-2#IXIT 3',
            source: '5.2-2',
            target: 'IXIT 3-VulnTypes',
            documentation: 'ID, Description, Action, Time Frame',
          }, 
        },
        {
          data: {
            id: '5.2-2#IXIT 4',
            source: '5.2-2',
            target: 'IXIT 4-Conf',
            documentation: 'Confirmation of Vulnerability Actions',
          }, 
        },
        {
          data: {
            id: '5.2-3#IXIT 4',
            source: '5.2-3',
            target: 'IXIT 4-Conf',
            documentation: 'Confirmation of Vulnerability Monitoring',
          }, 
        },
        {
          data: {
            id: '5.2-3#IXIT 5',
            source: '5.2-3',
            target: 'IXIT 5-VulnMon',
            documentation: 'ID, Description',
          }, 
        },
        {
          data: {
            id: '5.3-1#IXIT 6',
            source: '5.3-1',
            target: 'IXIT 6-SoftComp',
            documentation: 'ID, Description, Update Mechanism',
          }, 
        },
        {
          data: {
            id: '5.3-1#IXIT 7',
            source: '5.3-1',
            target: 'IXIT 7-UpdMech',
            documentation: 'ID, Description, Security Guarantees, Cryptographic Details, Initiation and Interaction',
          }, 
        },
        {
          data: {
            id: '5.3-2#IXIT 7',
            source: '5.3-2',
            target: 'IXIT 7-UpdMech',
            documentation: 'ID, Description, Security Guarantees, Cryptographic Details, Initiation and Interaction',
          }, 
        },
        {
          data: {
            id: '5.3-3#IXIT 6',
            source: '5.3-3',
            target: 'IXIT 6-SoftComp',
            documentation: 'ID, Description, Update Mechanism',
          }, 
        },
        {
          data: {
            id: '5.3-3#IXIT 7',
            source: '5.3-3',
            target: 'IXIT 7-UpdMech',
            documentation: 'ID, Description, Initiation and Interaction',
          }, 
        },
        {
          data: {
            id: '5.3-4#IXIT 6',
            source: '5.3-4',
            target: 'IXIT 6-SoftComp',
            documentation: 'ID, Description, Update Mechanism',
          }, 
        },
        {
          data: {
            id: '5.3-4#IXIT 7',
            source: '5.3-4',
            target: 'IXIT 7-UpdMech',
            documentation: 'ID, Description, Initiation and Interaction, Configuration',
          }, 
        },
        {
          data: {
            id: '5.3-5#IXIT 6',
            source: '5.3-5',
            target: 'IXIT 6-SoftComp',
            documentation: 'ID, Description, Update Mechanism',
          }, 
        },
        {
          data: {
            id: '5.3-5#IXIT 7',
            source: '5.3-5',
            target: 'IXIT 7-UpdMech',
            documentation: 'ID, Description, Update Checking',
          }, 
        },
        {
          data: {
            id: '5.3-6#IXIT 7',
            source: '5.3-6',
            target: 'IXIT 7-UpdMech',
            documentation: 'ID, Description, Initiation and Interaction, Configuration, User Notification',
          }, 
        },
        {
          data: {
            id: '5.3-7#IXIT 7',
            source: '5.3-7',
            target: 'IXIT 7-UpdMech',
            documentation: 'ID, Description, Security Guarantees, Cryptographic Details',
          }, 
        },
        {
          data: {
            id: '5.3-8#IXIT 4',
            source: '5.3-8',
            target: 'IXIT 4-Conf',
            documentation: 'Confirmation of Update Procedures',
          }, 
        },
        {
          data: {
            id: '5.3-8#IXIT 8',
            source: '5.3-8',
            target: 'IXIT 8-UpdProc',
            documentation: 'ID, Description, Time Frame',
          }, 
        },
        {
          data: {
            id: '5.3-9#IXIT 7',
            source: '5.3-9',
            target: 'IXIT 7-UpdMech',
            documentation: 'ID, Description, Security Guarantees, Cryptographic Details',
          }, 
        },
        {
          data: {
            id: '5.3-10#IXIT 7',
            source: '5.3-10',
            target: 'IXIT 7-UpdMech',
            documentation: 'ID, Description, Security Guarantees, Cryptographic Details',
          }, 
        },
        {
          data: {
            id: '5.3-11#IXIT 7',
            source: '5.3-11',
            target: 'IXIT 7-UpdMech',
            documentation: 'ID, Description, User Notification',
          }, 
        },
        {
          data: {
            id: '5.3-12#IXIT 7',
            source: '5.3-12',
            target: 'IXIT 7-UpdMech',
            documentation: 'ID, Description, User Notification',
          }, 
        },
        {
          data: {
            id: '5.3-13#IXIT 2',
            source: '5.3-13',
            target: 'IXIT 2-UserInfo',
            documentation: 'Support Period, Publication of Support Period',
          }, 
        },
        {
          data: {
            id: '5.3-14#IXIT 2',
            source: '5.3-14',
            target: 'IXIT 2-UserInfo',
            documentation: 'Documentation of Replacement, Publication of Non-Updatable',
          }, 
        },
        {
          data: {
            id: '5.3-15#IXIT 9',
            source: '5.3-15',
            target: 'IXIT 9-ReplSup',
            documentation: 'Isolation, Hardware Replacement',
          }, 
        },
        {
          data: {
            id: '5.3-16#IXIT 2',
            source: '5.3-16',
            target: 'IXIT 2-UserInfo',
            documentation: 'Model Designation',
          }, 
        },
        {
          data: {
            id: '5.4-1#IXIT 10',
            source: '5.4-1',
            target: 'IXIT 10-SecParam',
            documentation: 'ID, Description, Type, Security Guarantees, Protection Scheme',
          }, 
        },
        {
          data: {
            id: '5.4-2#IXIT 10',
            source: '5.4-2',
            target: 'IXIT 10-SecParam',
            documentation: 'ID, Description, Type, Security Guarantees, Protection Scheme',
          }, 
        },
        {
          data: {
            id: '5.4-3#IXIT 10',
            source: '5.4-3',
            target: 'IXIT 10-SecParam',
            documentation: 'ID, Description, Type, Provisioning Mechanism',
          }, 
        },
        {
          data: {
            id: '5.4-4#IXIT 10',
            source: '5.4-4',
            target: 'IXIT 10-SecParam',
            documentation: 'ID, Description, Type, Generation Mechanism',
          }, 
        },
        {
          data: {
            id: '5.5-1#IXIT 11',
            source: '5.5-1',
            target: 'IXIT 11-ComMech',
            documentation: 'ID, Description, Security Guarantees, Cryptographic Details',
          }, 
        },
        {
          data: {
            id: '5.5-2#IXIT 12',
            source: '5.5-2',
            target: 'IXIT 12-NetSecImpl',
            documentation: 'ID, Description, Review/Evaluation Method, Report',
          }, 
        },
        {
          data: {
            id: '5.5-3#IXIT 6',
            source: '5.5-3',
            target: 'IXIT 6-SoftComp',
            documentation: 'ID, Description, Update Mechanism, Cryptographic Usage',
          }, 
        },
        {
          data: {
            id: '5.5-3#IXIT 7',
            source: '5.5-3',
            target: 'IXIT 7-UpdMech',
            documentation: 'ID, Description',
          }, 
        },
        {
          data: {
            id: '5.5-4#IXIT 1',
            source: '5.5-4',
            target: 'IXIT 1-AuthMech',
            documentation: 'ID, Description, Security Guarantees, Cryptographic Details',
          }, 
        },
        {
          data: {
            id: '5.5-4#IXIT 13',
            source: '5.5-4',
            target: 'IXIT 13-SoftServ',
            documentation: 'ID, Description, Authentication Mechanism',
          }, 
        },
        {
          data: {
            id: '5.5-5#IXIT 1',
            source: '5.5-5',
            target: 'IXIT 1-AuthMech',
            documentation: 'ID, Description, Security Guarantees, Cryptographic Details',
          }, 
        },
        {
          data: {
            id: '5.5-5#IXIT 13',
            source: '5.5-5',
            target: 'IXIT 13-SoftServ',
            documentation: 'ID, Description, Allows Configuration, Authentication Mechanism',
          }, 
        },
        {
          data: {
            id: '5.5-6#IXIT 10',
            source: '5.5-6',
            target: 'IXIT 10-SecParam',
            documentation: 'ID, Description, Type, Communication Mechanisms',
          }, 
        },
        {
          data: {
            id: '5.5-6#IXIT 11',
            source: '5.5-6',
            target: 'IXIT 11-ComMech',
            documentation: 'ID, Description, Security Guarantees, Cryptographic Details',
          }, 
        },
        {
          data: {
            id: '5.5-7#IXIT 10',
            source: '5.5-7',
            target: 'IXIT 10-SecParam',
            documentation: 'ID, Description, Type, Communication Mechanisms',
          }, 
        },
        {
          data: {
            id: '5.5-7#IXIT 11',
            source: '5.5-7',
            target: 'IXIT 11-ComMech',
            documentation: 'ID, Description, Security Guarantees, Cryptographic Details',
          }, 
        },
        {
          data: {
            id: '5.5-8#IXIT 4',
            source: '5.5-8',
            target: 'IXIT 4-Conf',
            documentation: 'Confirmation of Secure Management',
          }, 
        },
        {
          data: {
            id: '5.5-8#IXIT 14',
            source: '5.5-8',
            target: 'IXIT 14-SecMgmt',
            documentation: 'ID, Description',
          }, 
        },
        {
          data: {
            id: '5.6-1#IXIT 15',
            source: '5.6-1',
            target: 'IXIT 15-Intf',
            documentation: 'ID, Description, Type, Status',
          }, 
        },
        {
          data: {
            id: '5.6-2#IXIT 15',
            source: '5.6-2',
            target: 'IXIT 15-Intf',
            documentation: 'ID, Description, Type, Disclosed Information',
          }, 
        },
        {
          data: {
            id: '5.6-3#IXIT 15',
            source: '5.6-3',
            target: 'IXIT 15-Intf',
            documentation: 'ID, Description, Type, Status, Protection',
          }, 
        },
        {
          data: {
            id: '5.6-4#IXIT 15',
            source: '5.6-4',
            target: 'IXIT 15-Intf',
            documentation: 'ID, Description, Type, Status, Debug Interface, Protection',
          }, 
        },
        {
          data: {
            id: '5.6-5#IXIT 13',
            source: '5.6-5',
            target: 'IXIT 13-SoftServ',
            documentation: 'ID, Description, Status, Justification',
          }, 
        },
        {
          data: {
            id: '5.6-6#IXIT 16',
            source: '5.6-6',
            target: 'IXIT 16-CodeMin',
            documentation: 'ID, Description',
          }, 
        },
        {
          data: {
            id: '5.6-7#IXIT 17',
            source: '5.6-7',
            target: 'IXIT 17-PrivlCtrl',
            documentation: 'ID, Description',
          }, 
        },
        {
          data: {
            id: '5.6-8#IXIT 18',
            source: '5.6-8',
            target: 'IXIT 18-AccCtrl',
            documentation: 'ID, Description',
          }, 
        },
        {
          data: {
            id: '5.6-9#IXIT 4',
            source: '5.6-9',
            target: 'IXIT 4-Conf',
            documentation: 'Confirmation of Secure Development',
          }, 
        },
        {
          data: {
            id: '5.6-9#IXIT 19',
            source: '5.6-9',
            target: 'IXIT 19-SecDev',
            documentation: 'ID, Description',
          }, 
        },
        {
          data: {
            id: '5.7-1#IXIT 20',
            source: '5.7-1',
            target: 'IXIT 20-SecBoot',
            documentation: 'ID, Description, Security Guarantees, Detection Mechanisms',
          }, 
        },
        {
          data: {
            id: '5.7-2#IXIT 20',
            source: '5.7-2',
            target: 'IXIT 20-SecBoot',
            documentation: 'ID, Description, User Notification, Notification Functionality',
          }, 
        },
        {
          data: {
            id: '5.8-1#IXIT 11',
            source: '5.8-1',
            target: 'IXIT 11-ComMech',
            documentation: 'ID, Description, Security Guarantees, Cryptographic Details',
          }, 
        },
        {
          data: {
            id: '5.8-1#IXIT 21',
            source: '5.8-1',
            target: 'IXIT 21-PersData',
            documentation: 'ID, Description, Communication Mechanisms',
          }, 
        },
        {
          data: {
            id: '5.8-2#IXIT 11',
            source: '5.8-2',
            target: 'IXIT 11-ComMech',
            documentation: 'ID, Description, Security Guarantees, Cryptographic Details',
          }, 
        },
        {
          data: {
            id: '5.8-2#IXIT 21',
            source: '5.8-2',
            target: 'IXIT 21-PersData',
            documentation: 'ID, Description, Processing Activities, Communication Mechanisms, Sensitive',
          }, 
        },
        {
          data: {
            id: '5.8-3#IXIT 2',
            source: '5.8-3',
            target: 'IXIT 2-UserInfo',
            documentation: 'Documentation of Sensors',
          }, 
        },
        {
          data: {
            id: '5.8-3#IXIT 22',
            source: '5.8-3',
            target: 'IXIT 22-ExtSens',
            documentation: 'ID, Description',
          }, 
        },
        {
          data: {
            id: '5.9-1#IXIT 23',
            source: '5.9-1',
            target: 'IXIT 23-ResMech',
            documentation: 'ID, Description, Security Guarantees',
          }, 
        },
        {
          data: {
            id: '5.9-2#IXIT 23',
            source: '5.9-2',
            target: 'IXIT 23-ResMech',
            documentation: 'ID, Description, Type, Security Guarantees',
          }, 
        },
        {
          data: {
            id: '5.9-3#IXIT 11',
            source: '5.9-3',
            target: 'IXIT 11-ComMech',
            documentation: 'ID, Description, Resilience Measures',
          }, 
        },
        {
          data: {
            id: '5.10-1#IXIT 24',
            source: '5.10-1',
            target: 'IXIT 24-TelData',
            documentation: 'ID, Description, Security Examination',
          }, 
        },
        {
          data: {
            id: '5.11-1#IXIT 25',
            source: '5.11-1',
            target: 'IXIT 25-DelFunc',
            documentation: 'ID, Description, Target Type, Initiation and Interaction',
          }, 
        },
        {
          data: {
            id: '5.11-2#IXIT 21',
            source: '5.11-2',
            target: 'IXIT 21-PersData',
            documentation: 'ID, Description, Processing Activities',
          }, 
        },
        {
          data: {
            id: '5.11-2#IXIT 25',
            source: '5.11-2',
            target: 'IXIT 25-DelFunc',
            documentation: 'ID, Description, Target Type, Initiation and Interaction',
          }, 
        },
        {
          data: {
            id: '5.11-3#IXIT 2',
            source: '5.11-3',
            target: 'IXIT 2-UserInfo',
            documentation: 'Documentation of Deletion',
          }, 
        },
        {
          data: {
            id: '5.11-3#IXIT 21',
            source: '5.11-3',
            target: 'IXIT 21-PersData',
            documentation: 'ID, Description, Processing Activities',
          }, 
        },
        {
          data: {
            id: '5.11-3#IXIT 25',
            source: '5.11-3',
            target: 'IXIT 25-DelFunc',
            documentation: 'ID, Description, Target Type',
          }, 
        },
        {
          data: {
            id: '5.11-4#IXIT 2',
            source: '5.11-4',
            target: 'IXIT 2-UserInfo',
            documentation: 'Documentation of Deletion',
          }, 
        },
        {
          data: {
            id: '5.11-4#IXIT 25',
            source: '5.11-4',
            target: 'IXIT 25-DelFunc',
            documentation: 'ID, Description',
          }, 
        },
        {
          data: {
            id: '5.12-1#IXIT 26',
            source: '5.12-1',
            target: 'IXIT 26-UserDec',
            documentation: 'ID, Description, Options, Triggered By',
          }, 
        },
        {
          data: {
            id: '5.12-2#IXIT 2',
            source: '5.12-2',
            target: 'IXIT 2-UserInfo',
            documentation: 'Documentation of Secure Setup',
          }, 
        },
        {
          data: {
            id: '5.12-2#IXIT 26',
            source: '5.12-2',
            target: 'IXIT 26-UserDec',
            documentation: 'ID, Description, Options',
          }, 
        },
        {
          data: {
            id: '5.12-3#IXIT 2',
            source: '5.12-3',
            target: 'IXIT 2-UserInfo',
            documentation: 'Documentation of Setup Check',
          }, 
        },
        {
          data: {
            id: '5.13-1#IXIT 11',
            source: '5.13-1',
            target: 'IXIT 11-ComMech',
            documentation: 'ID, Description',
          }, 
        },
        {
          data: {
            id: '5.13-1#IXIT 27',
            source: '5.13-1',
            target: 'IXIT 27-UserIntf',
            documentation: 'ID, Description',
          }, 
        },
        {
          data: {
            id: '5.13-1#IXIT 28',
            source: '5.13-1',
            target: 'IXIT 28-ExtAPI',
            documentation: 'ID, Description',
          }, 
        },
        {
          data: {
            id: '5.13-1#IXIT 29',
            source: '5.13-1',
            target: 'IXIT 29-InpVal',
            documentation: 'ID, Description',
          }, 
        },
        {
          data: {
            id: '6-1#IXIT 2',
            source: '6-1',
            target: 'IXIT 2-UserInfo',
            documentation: 'Documentation of Personal Data',
          }, 
        },
        {
          data: {
            id: '6-1#IXIT 21',
            source: '6-1',
            target: 'IXIT 21-PersData',
            documentation: 'ID, Description, Processing Activities',
          }, 
        },
        {
          data: {
            id: '6-2#IXIT 21',
            source: '6-2',
            target: 'IXIT 21-PersData',
            documentation: 'ID, Description, Obtaining Consent',
          }, 
        },
        {
          data: {
            id: '6-3#IXIT 21',
            source: '6-3',
            target: 'IXIT 21-PersData',
            documentation: 'ID, Description, Obtaining Consent, Withdrawing Consent',
          }, 
        },
        {
          data: {
            id: '6-4#IXIT 21',
            source: '6-4',
            target: 'IXIT 21-PersData',
            documentation: 'ID, Description',
          }, 
        },
        {
          data: {
            id: '6-4#IXIT 24',
            source: '6-4',
            target: 'IXIT 24-TelData',
            documentation: 'ID, Description, Purpose, Personal Data',
          }, 
        },
        {
          data: {
            id: '6-5#IXIT 2',
            source: '6-5',
            target: 'IXIT 2-UserInfo',
            documentation: 'Documentation of Telemetry Data',
          }, 
        },
        {
          data: {
            id: '6-5#IXIT 24',
            source: '6-5',
            target: 'IXIT 24-TelData',
            documentation: 'ID, Description, Purpose',
          }
        },
        // IXIT TO IXIT dependencies
        {
          data: {
            id: 'IXIT 1-AuthMech#IXIT 2-UserInfo',
            source: 'IXIT 1-AuthMech',
            target: 'IXIT 2-UserInfo',
            documentation: 'Changing authentication value',
            provision: '5.1-4'
          }
        },
        {
          data: {
            id: 'IXIT 3-VulnTypes#IXIT 2-UserInfo',
            source: 'IXIT 3-VulnTypes',
            target: 'IXIT 2-UserInfo',
            documentation: 'Action, Time Frame',
            provision: '5.2-2'
          }
        },
        {
          data: {
            id: 'IXIT 7-UpdMech#IXIT 6-SoftComp',
            source: 'IXIT 7-UpdMech',
            target: 'IXIT 6-SoftComp',
            documentation: 'Description of software update',
            provision: '5.3-3'
          }
        },
        {
          data: {
            id: 'IXIT 7-UpdMech#IXIT 6-SoftComp_1',
            source: 'IXIT 7-UpdMech',
            target: 'IXIT 6-SoftComp',
            documentation: 'Automation of software update',
            provision: '5.3-4'
          }
        },
        {
          data: {
            id: 'IXIT 7-UpdMech#IXIT 6-SoftComp_2',
            source: 'IXIT 7-UpdMech',
            target: 'IXIT 6-SoftComp',
            documentation: 'Enabling of automatic software update',
            provision: '5.3-4'
          }
        },
        {
          data: {
            id: 'IXIT 7-UpdMech#IXIT 6-SoftComp_3',
            source: 'IXIT 7-UpdMech',
            target: 'IXIT 6-SoftComp',
            documentation: 'Update checking',
            provision: '5.3-5'
          }
        },
        {
          data: {
            id: 'IXIT 2-UserInfo#IXIT 2-UserInfo',
            source: 'IXIT 2-UserInfo',
            target: 'IXIT 2-UserInfo',
            documentation: 'Support period verification',
            provision: '5.3-13'
          }
        },
        {
          data: {
            id: 'IXIT 1-AuthMech#IXIT 10-SecParam',
            source: 'IXIT 1-AuthMech',
            target: 'IXIT 10-SecParam',
            documentation: 'Verify sensitive parameters',
            provision: '5.4-1'
          }
        },
        {
          data: {
            id: 'IXIT 13-SoftServ#IXIT 1-AuthMech',
            source: 'IXIT 13-SoftServ',
            target: 'IXIT 1-AuthMech',
            documentation: 'Authentication mechanism',
            provision: '5.5-4'
          }
        },
        {
          data: {
            id: 'IXIT 11-ComMech#IXIT 10-SecParam',
            source: 'IXIT 11-ComMech',
            target: 'IXIT 10-SecParam',
            documentation: 'Critical security parameter',
            provision: '5.5-7' // and 5.5-6. TO INCLUDE
          }
        },
        {
          data: {
            id: 'IXIT 11-ComMech#IXIT 21-PersData',
            source: 'IXIT 11-ComMech',
            target: 'IXIT 21-PersData',
            documentation: 'Personal data',
            provision: '5.8-1'
          }
        },
        {
          data: {
            id: 'IXIT 10-SecParam#IXIT 25-DelFunc',
            source: 'IXIT 10-SecParam',
            target: 'IXIT 25-DelFunc',
            documentation: 'User data',
            provision: '5.11-1'
          }
        },
        {
          data: {
            id: 'IXIT 21-PersData#IXIT 25-DelFunc',
            source: 'IXIT 21-PersData',
            target: 'IXIT 25-DelFunc',
            documentation: 'User data',
            provision: '5.11-2'
          }
        },
        {
          data: {
            id: 'IXIT 25-DelFunc#IXIT 2-UserInfo',
            source: 'IXIT 25-DelFunc',
            target: 'IXIT 2-UserInfo',
            documentation: 'Documentation',
            provision: '5.11-4'
          }
        },
        {
          data: {
            id: 'IXIT 26-UserDec#IXIT 2-UserInfo',
            source: 'IXIT 26-UserDec',
            target: 'IXIT 2-UserInfo',
            documentation: 'Documentation',
            provision: '5.12-2'
          }
        },
        {
          data: {
            id: 'IXIT 27-UserIntf#IXIT 29-InpVal',
            source: 'IXIT 27-UserIntf',
            target: 'IXIT 29-InpVal',
            documentation: 'Protection',
            provision: '5.13-1'
          }
        },
        {
          data: {
            id: 'IXIT 28-ExtAPI#IXIT 29-InpVal',
            source: 'IXIT 28-ExtAPI',
            target: 'IXIT 29-InpVal',
            documentation: 'Protection',
            provision: '5.13-1'
          }
        },
        {
          data: {
            id: 'IXIT 11-ComMech#IXIT 29-InpVal_1',
            source: 'IXIT 11-ComMech',
            target: 'IXIT 29-InpVal',
            documentation: 'Protection',
            provision: '5.13-1'
          }
        },
        {
          data: {
            id: 'IXIT 21-PersData#IXIT 2-UserInfo_1',
            source: 'IXIT 21-PersData',
            target: 'IXIT 2-UserInfo',
            documentation: 'Description',
            provision: '6-1'
          }
        },
        {
          data: {
            id: 'IXIT 21-PersData#IXIT 24-TelData',
            source: 'IXIT 21-PersData',
            target: 'IXIT 24-TelData',
            documentation: 'Description',
            provision: '6-4'
          }
        },
        {
          data: {
            id: 'IXIT 24-TelData#IXIT 2-UserInfo',
            source: 'IXIT 24-TelData',
            target: 'IXIT 2-UserInfo',
            documentation: 'Purpose',
            provision: '6-5'
          }
        }
    ]
};

/* Saved layout: [{data: {id, position: {x, y}}}, ...]. */
const EN303645_POSITIONS = [
  { "data":  { "id": "4",
    "position": {
      "x": 220.14880990747864,
      "y": 70.29469604174311
    }
  }}, { "data":  { "id": "5.1",
    "position": {
      "x": 1284.48595427364,
      "y": -96.71068115511055
    }
  }}, { "data":  { "id": "5.2",
    "position": {
      "x": 734.0475428153434,
      "y": 47.41124382601025
    }
  }}, { "data":  { "id": "5.3",
    "position": {
      "x": 977.6746175542622,
      "y": 805.6030905139978
    }
  }}, { "data":  { "id": "5.4",
    "position": {
      "x": 2307.9875853419944,
      "y": -139.68275691750884
    }
  }}, { "data":  { "id": "5.5",
    "position": {
      "x": 2078.574056528419,
      "y": 235.79435003762472
    }
  }}, { "data":  { "id": "5.6",
    "position": {
      "x": 1669.0412027839498,
      "y": 627.800272018158
    }
  }}, { "data":  { "id": "5.7",
    "position": {
      "x": 388.92307731871927,
      "y": 52.574054411186395
    }
  }}, { "data":  { "id": "5.8",
    "position": {
      "x": 142.26670229486894,
      "y": 643.2512936438203
    }
  }}, { "data":  { "id": "5.9",
    "position": {
      "x": 99.81462901918864,
      "y": 1252.7275841567116
    }
  }}, { "data":  { "id": "5.10",
    "position": {
      "x": 396.6258342362279,
      "y": 936.598458791977
    }
  }}, { "data":  { "id": "5.11",
    "position": {
      "x": 2168.2973753890815,
      "y": 980.1940073164534
    }
  }}, { "data":  { "id": "5.12",
    "position": {
      "x": 241.6008893889059,
      "y": 390.4679015762133
    }
  }}, { "data":  { "id": "5.13",
    "position": {
      "x": 389.1657555529377,
      "y": 1221.2476242815117
    }
  }}, { "data":  { "id": "6",
    "position": {
      "x": 764.5165538054312,
      "y": 1222.7753720248002
    }
  }}, { "data":  { "id": "4-1",
    "position": {
      "x": 220.14880990747864,
      "y": 78.54469604174311
    }
  }}, { "data":  { "id": "5.1-1",
    "position": {
      "x": 1276.8189663572086,
      "y": -209.74807814814494
    }
  }}, { "data":  { "id": "5.1-2",
    "position": {
      "x": 1273.1092586834634,
      "y": -133.26039610217606
    }
  }}, { "data":  { "id": "5.1-3",
    "position": {
      "x": 1273.7924851251623,
      "y": -72.51859389446396
    }
  }}, { "data":  { "id": "5.1-4",
    "position": {
      "x": 1295.8626498638164,
      "y": -24.614534942281495
    }
  }}, { "data":  { "id": "5.1-5",
    "position": {
      "x": 1288.0550357825343,
      "y": 32.82671583792384
    }
  }}, { "data":  { "id": "5.2-1",
    "position": {
      "x": 602.0574776851187,
      "y": 60.65952805944126
    }
  }}, { "data":  { "id": "5.2-2",
    "position": {
      "x": 665.7442593592917,
      "y": 56.600932396001
    }
  }}, { "data":  { "id": "5.2-3",
    "position": {
      "x": 866.037607945568,
      "y": 50.66295959257924
    }
  }}, { "data":  { "id": "5.3-1",
    "position": {
      "x": 1039.4957536492147,
      "y": 832.3416633961533
    }
  }}, { "data":  { "id": "5.3-2",
    "position": {
      "x": 1040.4082994689657,
      "y": 719.7135934575927
    }
  }}, { "data":  { "id": "5.3-3",
    "position": {
      "x": 996.5194172960969,
      "y": 852.8717255290474
    }
  }}, { "data":  { "id": "5.3-4",
    "position": {
      "x": 1056.2424538209734,
      "y": 882.1513045074857
    }
  }}, { "data":  { "id": "5.3-5",
    "position": {
      "x": 1088.601124717441,
      "y": 838.0416160773457
    }
  }}, { "data":  { "id": "5.3-6",
    "position": {
      "x": 1091.0323600847055,
      "y": 771.3251431434187
    }
  }}, { "data":  { "id": "5.3-7",
    "position": {
      "x": 1124.3999067670266,
      "y": 884.3572115007837
    }
  }}, { "data":  { "id": "5.3-8",
    "position": {
      "x": 918.8174405944915,
      "y": 952.8375967275251
    }
  }}, { "data":  { "id": "5.3-9",
    "position": {
      "x": 992.3897353322428,
      "y": 807.7110966674016
    }
  }}, { "data":  { "id": "5.3-10",
    "position": {
      "x": 995.3921883024655,
      "y": 725.1664927455463
    }
  }}, { "data":  { "id": "5.3-11",
    "position": {
      "x": 993.5425968383994,
      "y": 766.631577418847
    }
  }}, { "data":  { "id": "5.3-12",
    "position": {
      "x": 1042.5617658461483,
      "y": 776.9651780186373
    }
  }}, { "data":  { "id": "5.3-13",
    "position": {
      "x": 835.4493283414979,
      "y": 703.0869799332099
    }
  }}, { "data":  { "id": "5.3-14",
    "position": {
      "x": 898.0329017180321,
      "y": 697.7718683030946
    }
  }}, { "data":  { "id": "5.3-15",
    "position": {
      "x": 993.2312822552104,
      "y": 911.1143808654394
    }
  }}, { "data":  { "id": "5.3-16",
    "position": {
      "x": 959.146748869582,
      "y": 674.8685843004704
    }
  }}, { "data":  { "id": "5.4-1",
    "position": {
      "x": 2308.452895117934,
      "y": -212.35610783353812
    }
  }}, { "data":  { "id": "5.4-2",
    "position": {
      "x": 2306.822291921203,
      "y": -159.68573428278134
    }
  }}, { "data":  { "id": "5.4-3",
    "position": {
      "x": 2307.748229266776,
      "y": -106.7603380272375
    }
  }}, { "data":  { "id": "5.4-4",
    "position": {
      "x": 2309.152878762786,
      "y": -50.50940600147955
    }
  }}, { "data":  { "id": "5.5-1",
    "position": {
      "x": 1918.7814042231666,
      "y": 223.64470001690347
    }
  }}, { "data":  { "id": "5.5-2",
    "position": {
      "x": 2260.562323650353,
      "y": 353.8034208982149
    }
  }}, { "data":  { "id": "5.5-3",
    "position": {
      "x": 1896.5857894064852,
      "y": 368.47362724450056
    }
  }}, { "data":  { "id": "5.5-4",
    "position": {
      "x": 2104.2256751597406,
      "y": 274.6537195379906
    }
  }}, { "data":  { "id": "5.5-5",
    "position": {
      "x": 2096.6312880833057,
      "y": 190.20878957553418
    }
  }}, { "data":  { "id": "5.5-6",
    "position": {
      "x": 2181.998249316044,
      "y": 253.33454011550884
    }
  }}, { "data":  { "id": "5.5-7",
    "position": {
      "x": 2191.5204929326947,
      "y": 298.7390552020365
    }
  }}, { "data":  { "id": "5.5-8",
    "position": {
      "x": 2112.983243026374,
      "y": 119.61507283074889
    }
  }}, { "data":  { "id": "5.6-1",
    "position": {
      "x": 1720.3932414280866,
      "y": 562.8347513094234
    }
  }}, { "data":  { "id": "5.6-2",
    "position": {
      "x": 1821.1283630599366,
      "y": 563.7019997421196
    }
  }}, { "data":  { "id": "5.6-3",
    "position": {
      "x": 1672.9312748044342,
      "y": 565.4879248933898
    }
  }}, { "data":  { "id": "5.6-4",
    "position": {
      "x": 1768.8943647481724,
      "y": 565.9585840567938
    }
  }}, { "data":  { "id": "5.6-5",
    "position": {
      "x": 1638.3538597457298,
      "y": 708.3694471401612
    }
  }}, { "data":  { "id": "5.6-6",
    "position": {
      "x": 1516.9540425079629,
      "y": 563.8925006772945
    }
  }}, { "data":  { "id": "5.6-7",
    "position": {
      "x": 1575.4458382307307,
      "y": 564.5966659895903
    }
  }}, { "data":  { "id": "5.6-8",
    "position": {
      "x": 1624.0609282771213,
      "y": 565.7671588850412
    }
  }}, { "data":  { "id": "5.6-9",
    "position": {
      "x": 1530.9097445925754,
      "y": 709.2657927268928
    }
  }}, { "data":  { "id": "5.7-1",
    "position": {
      "x": 356.1998003567472,
      "y": 61.08794873331435
    }
  }}, { "data":  { "id": "5.7-2",
    "position": {
      "x": 421.6463542806914,
      "y": 60.56016008905844
    }
  }}, { "data":  { "id": "5.8-1",
    "position": {
      "x": 63.239699945869546,
      "y": 641.8073502519707
    }
  }}, { "data":  { "id": "5.8-2",
    "position": {
      "x": 160.10421947573366,
      "y": 629.7962156084196
    }
  }}, { "data":  { "id": "5.8-3",
    "position": {
      "x": 221.29370464386835,
      "y": 673.206371679221
    }
  }}, { "data":  { "id": "5.9-1",
    "position": {
      "x": 159.92641620479694,
      "y": 1234.0879910018864
    }
  }}, { "data":  { "id": "5.9-2",
    "position": {
      "x": 170.27844445337936,
      "y": 1287.8671773115366
    }
  }}, { "data":  { "id": "5.9-3",
    "position": {
      "x": 29.350813584997923,
      "y": 1285.9290685517342
    }
  }}, { "data":  { "id": "5.10-1",
    "position": {
      "x": 396.6258342362279,
      "y": 944.848458791977
    }
  }}, { "data":  { "id": "5.11-1",
    "position": {
      "x": 2242.7455735710164,
      "y": 1066.3040643086383
    }
  }}, { "data":  { "id": "5.11-2",
    "position": {
      "x": 2167.7930484499566,
      "y": 951.8455957467113
    }
  }}, { "data":  { "id": "5.11-3",
    "position": {
      "x": 2093.8491772071466,
      "y": 910.5839503242685
    }
  }}, { "data":  { "id": "5.11-4",
    "position": {
      "x": 2111.379610520279,
      "y": 972.550528722639
    }
  }}, { "data":  { "id": "5.12-1",
    "position": {
      "x": 179.20810149006172,
      "y": 399.30523442403336
    }
  }}, { "data":  { "id": "5.12-2",
    "position": {
      "x": 238.71545033303562,
      "y": 398.13056872839326
    }
  }}, { "data":  { "id": "5.12-3",
    "position": {
      "x": 303.9936772877501,
      "y": 399.1522647361364
    }
  }}, { "data":  { "id": "5.13-1",
    "position": {
      "x": 389.1657555529377,
      "y": 1229.4976242815117
    }
  }}, { "data":  { "id": "6-1",
    "position": {
      "x": 698.4529064480973,
      "y": 1184.1989630738815
    }
  }}, { "data":  { "id": "6-2",
    "position": {
      "x": 699.3526725765672,
      "y": 1232.8327822375143
    }
  }}, { "data":  { "id": "6-3",
    "position": {
      "x": 700.491399634291,
      "y": 1280.0656238211022
    }
  }}, { "data":  { "id": "6-4",
    "position": {
      "x": 764.1636775547332,
      "y": 1181.985120228498
    }
  }}, { "data":  { "id": "6-5",
    "position": {
      "x": 830.5802011627649,
      "y": 1183.3228390010718
    }
  }}, { "data":  { "id": "IXIT 1-AuthMech",
    "position": {
      "x": 1670.4916177102104,
      "y": -56.539861606253325
    }
  }}, { "data":  { "id": "IXIT 2-UserInfo",
    "position": {
      "x": 533.6602219466198,
      "y": 538.288125236529
    }
  }}, { "data":  { "id": "IXIT 3-VulnTypes",
    "position": {
      "x": 827.7011254425131,
      "y": 556.6374424680231
    }
  }}, { "data":  { "id": "IXIT 4-Conf",
    "position": {
      "x": 1178.3151418748892,
      "y": 314.4864172821788
    }
  }}, { "data":  { "id": "IXIT 5-VulnMon",
    "position": {
      "x": 1037.7434962677714,
      "y": 7.758954395157263
    }
  }}, { "data":  { "id": "IXIT 6-SoftComp",
    "position": {
      "x": 1297.305099169792,
      "y": 957.6670561412107
    }
  }}, { "data":  { "id": "IXIT 7-UpdMech",
    "position": {
      "x": 1306.512029565144,
      "y": 724.3804700949108
    }
  }}, { "data":  { "id": "IXIT 8-UpdProc",
    "position": {
      "x": 878.4402493478303,
      "y": 1050.2351591155343
    }
  }}, { "data":  { "id": "IXIT 9-ReplSup",
    "position": {
      "x": 1117.3263357712158,
      "y": 1063.2301362128378
    }
  }}, { "data":  { "id": "IXIT 10-SecParam",
    "position": {
      "x": 2011.729615957876,
      "y": -126.1210585746736
    }
  }}, { "data":  { "id": "IXIT 11-ComMech",
    "position": {
      "x": 14.540063467225393,
      "y": 911.7649574097684
    }
  }}, { "data":  { "id": "IXIT 12-NetSecImpl",
    "position": {
      "x": 2379.1270871634306,
      "y": 364.80264232563263
    }
  }}, { "data":  { "id": "IXIT 13-SoftServ",
    "position": {
      "x": 1881.9999588387223,
      "y": 910.0868301043452
    }
  }}, { "data":  { "id": "IXIT 14-SecMgmt",
    "position": {
      "x": 527.7808412344046,
      "y": 694.4499936534651
    }
  }}, { "data":  { "id": "IXIT 15-Intf",
    "position": {
      "x": 1832.243088175709,
      "y": 458.24839741382857
    }
  }}, { "data":  { "id": "IXIT 16-CodeMin",
    "position": {
      "x": 1493.751122282767,
      "y": 403.23786562212047
    }
  }}, { "data":  { "id": "IXIT 17-PrivlCtrl",
    "position": {
      "x": 1601.5886326663267,
      "y": 483.52695252222577
    }
  }}, { "data":  { "id": "IXIT 18-AccCtrl",
    "position": {
      "x": 1709.8109147826026,
      "y": 415.2268960010621
    }
  }}, { "data":  { "id": "IXIT 19-SecDev",
    "position": {
      "x": 1421.106198756479,
      "y": 620.8174351911284
    }
  }}, { "data":  { "id": "IXIT 20-SecBoot",
    "position": {
      "x": 386.49529783482444,
      "y": 160.9338417238242
    }
  }}, { "data":  { "id": "IXIT 21-PersData",
    "position": {
      "x": 351.27694620650686,
      "y": 774.9286571309269
    }
  }}, { "data":  { "id": "IXIT 22-ExtSens",
    "position": {
      "x": 364.22680154122065,
      "y": 664.4187029436325
    }
  }}, { "data":  { "id": "IXIT 23-ResMech",
    "position": {
      "x": 298.8165074793775,
      "y": 1324.663824628839
    }
  }}, { "data":  { "id": "IXIT 24-TelData",
    "position": {
      "x": 571.3714612750365,
      "y": 950.4029679143014
    }
  }}, { "data":  { "id": "IXIT 25-DelFunc",
    "position": {
      "x": 1543.9782829323321,
      "y": 1196.019138134478
    }
  }}, { "data":  { "id": "IXIT 26-UserDec",
    "position": {
      "x": 220.0763554646893,
      "y": 547.8683881304648
    }
  }}, { "data":  { "id": "IXIT 27-UserIntf",
    "position": {
      "x": 404.8050911798087,
      "y": 1121.773219142633
    }
  }}, { "data":  { "id": "IXIT 28-ExtAPI",
    "position": {
      "x": 510.7778052452124,
      "y": 1076.2071443654438
    }
  }}, { "data":  { "id": "IXIT 29-InpVal",
    "position": {
      "x": 268.5736315211048,
      "y": 1061.6653238316053
    }
  }}
  ];
