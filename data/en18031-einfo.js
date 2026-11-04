/**
 * cetome dataviz - EN 18031 E.Info
 * Copyright (C) 2024-2026 cetome. This data is licensed under CC BY 4.0 (not under the AGPL of the
 * code), see DATA-LICENSE.md. The standards it refers to remain their publishers'.
 *
 * DATA FILE. Nodes and edges of the EN 18031 E.Info graph, and the saved node positions.
 * The graph logic lives in js/en18031.js; the page is einfo/index.html.
 */
const EN18031_EINFO_DATA = {
        nodes: [
            {
                data: {
                    id: "SecurityAsset",
                    title: "SecurityAsset",
                    type: "req",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "ACM-1, ACM-2, ACM-5, SSM-1, SCM-1, SCM-2, SCM-3, SCM-4, GEC-1, GEC-2, GEC-3, GEC-6"
                }
            },
            {
                data: {
                    id: "SecurityAsset.Access",
                    title: "Access",
                    parent: "SecurityAsset",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "ACM-1"
                }
            },
            {
                data: {
                    id: "SecurityAsset.PublicAccess",
                    title: "PublicAccess",
                    parent: "SecurityAsset",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "ACM-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "SecurityAsset.Environment",
                    title: "Environment",
                    parent: "SecurityAsset",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "ACM-1, SSM-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "SecurityAsset.Legal",
                    title: "Legal",
                    parent: "SecurityAsset",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "ACM-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "SecurityAsset.ACM",
                    title: "ACM",
                    parent: "SecurityAsset",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "ACM-1, ACM-2"
                }
            },
            {
                data: {
                    id: "SecurityAsset.SSM",
                    title: "SSM",
                    parent: "SecurityAsset",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SSM-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "SecurityAsset.class",
                    title: "class",
                    parent: "SecurityAsset",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SCM-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "SecurityAsset.Com",
                    title: "Com",
                    parent: "SecurityAsset",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SCM-1, SCM-2, SCM-3, SCM-4"
                }
            },
            {
                data: {
                    id: "SecurityAsset.NetworkInterface",
                    title: "NetworkInterface",
                    parent: "SecurityAsset",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SCM-1"
                }
            },
            {
                data: {
                    id: "SecurityAsset.TrustedEnv",
                    title: "TrustedEnv",
                    parent: "SecurityAsset",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "SCM-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "SecurityAsset.AddMeasures",
                    title: "AddMeasures",
                    parent: "SecurityAsset",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "SCM-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "NetworkAsset",
                    title: "NetworkAsset",
                    type: "req",
                    en18031_1: true,
                    en18031_2: false,
                    en18031_3: false,
                    mechanism: "ACM-1, ACM-2, SSM-2, SCM-2, SCM-3, SCM-4, RLM-1, GEC-2, GEC-3, GEC-4, GEC-7"
                }
            },
            {
                data: {
                    id: "NetworkAsset.Access",
                    title: "Access",
                    parent: "NetworkAsset",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: false,
                    en18031_3: false,
                    mechanism: "ACM-1"
                }
            },
            {
                data: {
                    id: "NetworkAsset.PublicAccess",
                    title: "PublicAccess",
                    parent: "NetworkAsset",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: false,
                    en18031_3: false,
                    mechanism: "ACM-1"
                }
            },
            {
                data: {
                    id: "NetworkAsset.Environment",
                    title: "Environment",
                    parent: "NetworkAsset",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: false,
                    en18031_3: false,
                    mechanism: "ACM-1, SSM-2, SCM-2"
                }
            },
            {
                data: {
                    id: "NetworkAsset.Legal",
                    title: "Legal",
                    parent: "NetworkAsset",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: false,
                    en18031_3: false,
                    mechanism: "ACM-1"
                }
            },
            {
                data: {
                    id: "NetworkAsset.ACM",
                    title: "ACM",
                    parent: "NetworkAsset",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: false,
                    en18031_3: false,
                    mechanism: "ACM-1, ACM-2"
                }
            },
            {
                data: {
                    id: "NetworkAsset.SSM",
                    title: "SSM",
                    parent: "NetworkAsset",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: false,
                    en18031_3: false,
                    mechanism: "SSM-2"
                }
            },
            {
                data: {
                    id: "NetworkAsset.class",
                    title: "class",
                    parent: "NetworkAsset",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: false,
                    en18031_3: false,
                    mechanism: "SCM-2"
                }
            },
            {
                data: {
                    id: "NetworkAsset.Com",
                    title: "Com",
                    parent: "NetworkAsset",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: false,
                    en18031_3: false,
                    mechanism: "SCM-2, SCM-3, SCM-4, RLM-1"
                }
            },
            {
                data: {
                    id: "NetworkAsset.NetInterface",
                    title: "NetInterface",
                    parent: "NetworkAsset",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: false,
                    en18031_3: false,
                    mechanism: "SCM-2"
                }
            },
            {
                data: {
                    id: "NetworkAsset.AddMeasures",
                    title: "AddMeasures",
                    parent: "NetworkAsset",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: false,
                    en18031_3: false,
                    mechanism: "SCM-2"
                }
            },
            {
                data: {
                    id: "PrivacyAsset",
                    title: "PrivacyAsset",
                    type: "req",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "ACM-1, ACM-2, ACM-3, ACM-4, ACM-5, ACM-6, SSM-1, SCM-1, SCM-2, SCM-3, SCM-4, GEC-1, GEC-2, GEC-3, GEC-6"
                }
            },
            {
                data: {
                    id: "PrivacyAsset.Access",
                    title: "Access",
                    parent: "PrivacyAsset",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "ACM-1"
                }
            },
            {
                data: {
                    id: "PrivacyAsset.PublicAccess",
                    title: "PublicAccess",
                    parent: "PrivacyAsset",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "ACM-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "PrivacyAsset.Environment",
                    title: "Environment",
                    parent: "PrivacyAsset",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "ACM-1, SSM-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "PrivacyAsset.Legal",
                    title: "Legal",
                    parent: "PrivacyAsset",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "ACM-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "PrivacyAsset.ACM",
                    title: "ACM",
                    parent: "PrivacyAsset",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "ACM-1, ACM-2",
                    condition: true
                }
            },
            {
                data: {
                    id: "PrivacyAsset.TrustedSources",
                    title: "TrustedSources",
                    parent: "PrivacyAsset",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "ACM-3"
                }
            },
            {
                data: {
                    id: "PrivacyAsset.SSM",
                    title: "SSM",
                    parent: "PrivacyAsset",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "SSM-1"
                }
            },
            {
                data: {
                    id: "PrivacyAsset.class",
                    title: "class",
                    parent: "PrivacyAsset",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "SCM-1"
                }
            },
            {
                data: {
                    id: "PrivacyAsset.Com",
                    title: "Com",
                    parent: "PrivacyAsset",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "SCM-1, SCM-2, SCM-3, SCM-4"
                }
            },
            {
                data: {
                    id: "PrivacyAsset.NetInterface",
                    title: "NetInterface",
                    parent: "PrivacyAsset",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "SCM-1"
                }
            },
            {
                data: {
                    id: "PrivacyAsset.TrustedEnv",
                    title: "TrustedEnv",
                    parent: "PrivacyAsset",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "SCM-1"
                }
            },
            {
                data: {
                    id: "PrivacyAsset.AddMeasures",
                    title: "AddMeasures",
                    parent: "PrivacyAsset",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "SCM-1"
                }
            },
            {
                data: {
                    id: "FinancialAsset",
                    title: "FinancialAsset",
                    type: "req",
                    en18031_1: false,
                    en18031_2: false,
                    en18031_3: true,
                    mechanism: "ACM-1, ACM-2, SSM-1, SCM-1, SCM-2, SCM-3, SCM-4, GEC-1, GEC-2, GEC-3, GEC-6"
                }
            },
            {
                data: {
                    id: "FinancialAsset.Access",
                    title: "Access",
                    parent: "FinancialAsset",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: false,
                    en18031_3: true,
                    mechanism: "ACM-1"
                }
            },
            {
                data: {
                    id: "FinancialAsset.PublicAccess",
                    title: "PublicAccess",
                    parent: "FinancialAsset",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: false,
                    en18031_3: true,
                    mechanism: "ACM-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "FinancialAsset.Environment",
                    title: "Environment",
                    parent: "FinancialAsset",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: false,
                    en18031_3: true,
                    mechanism: "ACM-1, SSM-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "FinancialAsset.Legal",
                    title: "Legal",
                    parent: "FinancialAsset",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: false,
                    en18031_3: true,
                    mechanism: "ACM-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "FinancialAsset.ACM",
                    title: "ACM",
                    parent: "FinancialAsset",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: false,
                    en18031_3: true,
                    mechanism: "ACM-1, ACM-2",
                    condition: true
                }
            },
            {
                data: {
                    id: "FinancialAsset.SSM",
                    title: "SSM",
                    parent: "FinancialAsset",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: false,
                    en18031_3: true,
                    mechanism: "SSM-1"
                }
            },
            {
                data: {
                    id: "FinancialAsset.class",
                    title: "class",
                    parent: "FinancialAsset",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: false,
                    en18031_3: true,
                    mechanism: "SCM-1"
                }
            },
            {
                data: {
                    id: "FinancialAsset.Com",
                    title: "Com",
                    parent: "FinancialAsset",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: false,
                    en18031_3: true,
                    mechanism: "SCM-1, SCM-2, SCM-3, SCM-4"
                }
            },
            {
                data: {
                    id: "FinancialAsset.NetworkInterface",
                    title: "NetworkInterface",
                    parent: "FinancialAsset",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: false,
                    en18031_3: true,
                    mechanism: "SCM-1"
                }
            },
            {
                data: {
                    id: "ACM",
                    title: "ACM",
                    type: "req",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "ACM-3, ACM-4, ACM-5, ACM-6, AUM-1-1, AUM-1-2, AUM-1-3"
                }
            },
            {
                data: {
                    id: "ACM.NetworkInterface",
                    title: "NetworkInterface",
                    parent: "ACM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "AUM-1-1"
                }
            },
            {
                data: {
                    id: "ACM.UserInterfaces",
                    title: "UserInterfaces",
                    parent: "ACM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "AUM-1-2"
                }
            },
            {
                data: {
                    id: "ACM.MachineInterfaces",
                    title: "MachineInterfaces",
                    parent: "ACM",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: false,
                    en18031_3: true,
                    mechanism: "AUM-1-3"
                }
            },
            {
                data: {
                    id: "ACM.ManagedAccessNetworkAsset",
                    title: "ManagedAccessNetworkAsset",
                    parent: "ACM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: false,
                    en18031_3: false,
                    mechanism: "AUM-1-1, AUM-1-2"
                }
            },
            {
                data: {
                    id: "ACM.ManagedAccessPrivacyAsset",
                    title: "ManagedAccessPrivacyAsset",
                    parent: "ACM",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "AUM-1-1, AUM-1-2"
                }
            },
            {
                data: {
                    id: "ACM.ManagedAccessFinancialAsset",
                    title: "ManagedAccessFinancialAsset",
                    parent: "ACM",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: false,
                    en18031_3: true,
                    mechanism: "AUM-1-1, AUM-1-2, AUM-1-3"
                }
            },
            {
                data: {
                    id: "ACM.ManagedAccessSecurityAsset",
                    title: "ManagedAccessSecurityAsset",
                    parent: "ACM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "AUM-1-1, AUM-1-2, AUM-1-3"
                }
            },
            {
                data: {
                    id: "ACM.IntendedFunctionality",
                    title: "IntendedFunctionality",
                    parent: "ACM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "AUM-1-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "ACM.IntendedEnvironment",
                    title: "IntendedEnvironment",
                    parent: "ACM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "AUM-1-2",
                    condition: true
                }
            },
            {
                data: {
                    id: "ACM.AuthorizedEntity",
                    title: "AuthorizedEntity",
                    parent: "ACM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "AUM-1-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "ACM.AuthenticationMechanism",
                    title: "AuthenticationMechanism",
                    parent: "ACM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "AUM-1-1, AUM-1-2, AUM-1-3",
                    condition: true
                }
            },
            {
                data: {
                    id: "ACM.ReadOnlyFunctionality",
                    title: "ReadOnlyFunctionality",
                    parent: "ACM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "AUM-1-2",
                    condition: true
                }
            },
            {
                data: {
                    id: "ACM.ReadOnlyLegal",
                    title: "ReadOnlyLegal",
                    parent: "ACM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "AUM-1-2",
                    condition: true
                }
            },
            {
                data: {
                    id: "AuthorisedAccess",
                    title: "AuthorisedAccess",
                    type: "req",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "ACM-4",
                    condition: true
                }
            },
            {
                data: {
                    id: "AuthenticationMechanism",
                    title: "AuthenticationMechanism",
                    type: "req",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "AUM-2-1, AUM-2-2"
                }
            },
            {
                data: {
                    id: "AuthenticationMechanism.AuthFactor",
                    title: "AuthFactor",
                    parent: "AuthenticationMechanism",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "AUM-2-1, AUM-2-2"
                }
            },
            {
                data: {
                    id: "AUM",
                    title: "AUM",
                    type: "req",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "AUM-3, AUM-4, AUM-5-1, AUM-5-2, AUM-6"
                }
            },
            {
                data: {
                    id: "AUM.AuthVal",
                    title: "AuthVal",
                    parent: "AUM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "AUM-3"
                }
            },
            {
                data: {
                    id: "AUM.AuthEnv",
                    title: "AuthEnv",
                    parent: "AUM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "AUM-3"
                }
            },
            {
                data: {
                    id: "AUM.ConfSecGoal",
                    title: "ConfSecGoal",
                    parent: "AUM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "AUM-4",
                    condition: true
                }
            },
            {
                data: {
                    id: "AUM.AuthChange",
                    title: "AuthChange",
                    parent: "AUM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "AUM-4"
                }
            },
            {
                data: {
                    id: "AUM.PwdProperty",
                    title: "PwdProperty",
                    parent: "AUM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "AUM-5-1, AUM-5-2"
                }
            },
            {
                data: {
                    id: "AUM.UniqueBestPractice",
                    title: "UniqueBestPractice",
                    parent: "AUM",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "AUM-5-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "AUM.EnforceSettingFirstUse",
                    title: "EnforceSettingFirstUse",
                    parent: "AUM",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "AUM-5-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "AUM.DefinedAuthEntity",
                    title: "DefinedAuthEntity",
                    parent: "AUM",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "AUM-5-2",
                    condition: true
                }
            },
            {
                data: {
                    id: "AUM.EquipmentGenerated",
                    title: "EquipmentGenerated",
                    parent: "AUM",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "AUM-5-2",
                    condition: true
                }
            },
            {
                data: {
                    id: "AUM.BFProtection",
                    title: "BFProtection",
                    parent: "AUM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "AUM-6"
                }
            },
            {
                data: {
                    id: "PartOfSoftw",
                    title: "PartOfSoftw",
                    type: "req",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SUM-1, GEC-8",
                    condition: true
                }
            },
            {
                data: {
                    id: "PartOfSoftw.FuncSaftyImp",
                    title: "FuncSaftyImp",
                    parent: "PartOfSoftw",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SUM-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "PartOfSoftw.Immutable",
                    title: "Immutable",
                    parent: "PartOfSoftw",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SUM-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "PartOfSoftw.AltMeasures",
                    title: "AltMeasures",
                    parent: "PartOfSoftw",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SUM-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "PartOfSoftw.SUM",
                    title: "SUM",
                    parent: "PartOfSoftw",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SUM-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "SUM",
                    title: "SUM",
                    type: "req",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SUM-2, SUM-3",
                    condition: true
                }
            },
            {
                data: {
                    id: "SUM.Sign",
                    title: "Sign",
                    parent: "SUM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SUM-2",
                    condition: true
                }
            },
            {
                data: {
                    id: "SUM.SecChan",
                    title: "SecChan",
                    parent: "SUM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SUM-2",
                    condition: true
                }
            },
            {
                data: {
                    id: "SUM.AccContMech",
                    title: "AccContMech",
                    parent: "SUM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SUM-2",
                    condition: true
                }
            },
            {
                data: {
                    id: "SUM.Generic",
                    title: "Generic",
                    parent: "SUM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SUM-2",
                    condition: true
                }
            },
            {
                data: {
                    id: "SUM.Automation",
                    title: "Automation",
                    parent: "SUM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SUM-3"
                }
            },
            {
                data: {
                    id: "SSM",
                    title: "SSM",
                    type: "req",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SSM-2, SSM-3"
                }
            },
            {
                data: {
                    id: "SSM.Asset",
                    title: "Asset",
                    parent: "SSM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SSM-2, SSM-3"
                }
            },
            {
                data: {
                    id: "SSM.Encryption",
                    title: "Encryption",
                    parent: "SSM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SSM-3"
                }
            },
            {
                data: {
                    id: "SSM.DigitalSignature",
                    title: "DigitalSignature",
                    parent: "SSM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SSM-2",
                    condition: true
                }
            },
            {
                data: {
                    id: "SSM.AccessControl",
                    title: "AccessControl",
                    parent: "SSM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SSM-2, SSM-3",
                    condition: true
                }
            },
            {
                data: {
                    id: "SSM.OTProgrammable",
                    title: "OTProgrammable",
                    parent: "SSM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SSM-2",
                    condition: true
                }
            },
            {
                data: {
                    id: "SSM.HardwareProtection",
                    title: "HardwareProtection",
                    parent: "SSM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SSM-2, SSM-3",
                    condition: true
                }
            },
            {
                data: {
                    id: "SSM.Generic",
                    title: "Generic",
                    parent: "SSM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SSM-2, SSM-3",
                    condition: true
                }
            },
            {
                data: {
                    id: "SSM.ComplianceEvidence",
                    title: "ComplianceEvidence",
                    parent: "SSM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SSM-2, SSM-3",
                    condition: true
                }
            },
            {
                data: {
                    id: "SCM",
                    title: "SCM",
                    type: "req",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SCM-1, SCM-2, SCM-3, SCM-4"
                }
            },
            {
                data: {
                    id: "SCM.Protocol",
                    title: "Protocol",
                    parent: "SCM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SCM-1"
                }
            },
            {
                data: {
                    id: "SCM.States",
                    title: "States",
                    parent: "SCM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SCM-1"
                }
            },
            {
                data: {
                    id: "SCM.SecObjectives",
                    title: "SecObjectives",
                    parent: "SCM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SCM-1"
                }
            },
            {
                data: {
                    id: "SCM.Manage",
                    title: "Manage",
                    parent: "SCM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SCM-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "SCM.Capabilities",
                    title: "Capabilities",
                    parent: "SCM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SCM-2, SCM-3, SCM-4"
                }
            },
            {
                data: {
                    id: "SCM.ManufSecret",
                    title: "ManufSecret",
                    parent: "SCM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SCM-2",
                    condition: true
                }
            },
            {
                data: {
                    id: "SCM.SecChanExchange",
                    title: "SecChanExchange",
                    parent: "SCM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SCM-2",
                    condition: true
                }
            },
            {
                data: {
                    id: "SCM.PKI-Based",
                    title: "PKI-Based",
                    parent: "SCM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SCM-2",
                    condition: true
                }
            },
            {
                data: {
                    id: "SCM.ThirdPartyTrust",
                    title: "ThirdPartyTrust",
                    parent: "SCM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SCM-2",
                    condition: true
                }
            },
            {
                data: {
                    id: "SCM.MessageEnc",
                    title: "MessageEnc",
                    parent: "SCM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SCM-3",
                    condition: true
                }
            },
            {
                data: {
                    id: "SCM.ChannelEnc",
                    title: "ChannelEnc",
                    parent: "SCM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SCM-3",
                    condition: true
                }
            },
            {
                data: {
                    id: "SCM.SeqNumber",
                    title: "SeqNumber",
                    parent: "SCM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SCM-4",
                    condition: true
                }
            },
            {
                data: {
                    id: "SCM.TimeStamp",
                    title: "TimeStamp",
                    parent: "SCM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SCM-4",
                    condition: true
                }
            },
            {
                data: {
                    id: "SCM.OneTimeEncKey",
                    title: "OneTimeEncKey",
                    parent: "SCM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SCM-4",
                    condition: true
                }
            },
            {
                data: {
                    id: "SCM.Generic",
                    title: "Generic",
                    parent: "SCM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SCM-2, SCM-3, SCM-4",
                    condition: true
                }
            },
            {
                data: {
                    id: "SCM.ImplDetail",
                    title: "ImplDetail",
                    parent: "SCM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SCM-2, SCM-3, SCM-4",
                    condition: true
                }
            },
            {
                data: {
                    id: "SCM.CCK",
                    title: "CCK",
                    parent: "SCM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SCM-2, SCM-3"
                }
            },
            {
                data: {
                    id: "SCM.ThreatProtection",
                    title: "ThreatProtection",
                    parent: "SCM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SCM-2, SCM-3"
                }
            },
            {
                data: {
                    id: "SCM.Repudiation",
                    title: "Repudiation",
                    parent: "SCM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SCM-4"
                }
            },
            {
                data: {
                    id: "NetworkInterface",
                    title: "NetworkInterface",
                    type: "req",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SCM-1, SCM-2, SCM-3, SCM-4"
                }
            },
            {
                data: {
                    id: "NetworkInterface.Protocol",
                    title: "Protocol",
                    parent: "NetworkInterface",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SCM-1, SCM-2, SCM-3, SCM-4"
                }
            },
            {
                data: {
                    id: "NetworkInterface.Radio",
                    title: "Radio",
                    parent: "NetworkInterface",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SCM-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "NetworkInterface.Wired",
                    title: "Wired",
                    parent: "NetworkInterface",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SCM-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "NetworkInterface.Optical",
                    title: "Optical",
                    parent: "NetworkInterface",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SCM-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "NetworkInterface.Acoustic",
                    title: "Acoustic",
                    parent: "NetworkInterface",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "SCM-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "NetworkInterface.Exposure",
                    title: "Exposure",
                    parent: "NetworkInterface",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "GEC-2, GEC-3, GEC-4"
                }
            },
            {
                data: {
                    id: "RLM",
                    title: "RLM",
                    type: "req",
                    en18031_1: true,
                    en18031_2: false,
                    en18031_3: false,
                    mechanism: "RLM-1"
                }
            },
            {
                data: {
                    id: "NMM",
                    title: "NMM",
                    type: "req",
                    en18031_1: true,
                    en18031_2: false,
                    en18031_3: false,
                    mechanism: "NMM-1"
                }
            },
            {
                data: {
                    id: "NMM.GTPFiltering",
                    title: "GTPFiltering",
                    parent: "NMM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: false,
                    en18031_3: false,
                    mechanism: "NMM-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "NMM.IPPacketFiltering",
                    title: "IPPacketFiltering",
                    parent: "NMM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: false,
                    en18031_3: false,
                    mechanism: "NMM-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "NMM.NetworkEquipment",
                    title: "NetworkEquipment",
                    parent: "NMM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: false,
                    en18031_3: false,
                    mechanism: "NMM-1"
                }
            },
            {
                data: {
                    id: "TCM",
                    title: "TCM",
                    type: "req",
                    en18031_1: true,
                    en18031_2: false,
                    en18031_3: false,
                    mechanism: "TCM-1"
                }
            },
            {
                data: {
                    id: "TCM.DatagramRules",
                    title: "DatagramRules",
                    parent: "TCM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: false,
                    en18031_3: false,
                    mechanism: "TCM-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "TCM.TrafficSeparation",
                    title: "TrafficSeparation",
                    parent: "TCM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: false,
                    en18031_3: false,
                    mechanism: "TCM-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "TCM.NetworkEquipment",
                    title: "NetworkEquipment",
                    parent: "TCM",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: false,
                    en18031_3: false,
                    mechanism: "TCM-1"
                }
            },
            {
                data: {
                    id: "PrivacyAssetEvent",
                    title: "PrivacyAssetEvent",
                    type: "req",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "LGM-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "PrivacyAssetEvent.Legal",
                    title: "Legal",
                    parent: "PrivacyAssetEvent",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "LGM-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "PrivacyAssetEvent.LGM",
                    title: "LGM",
                    parent: "PrivacyAssetEvent",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "LGM-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "FinancialAssetEvent",
                    title: "FinancialAssetEvent",
                    type: "req",
                    en18031_1: false,
                    en18031_2: false,
                    en18031_3: true,
                    mechanism: "LGM-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "FinancialAssetEvent.Legal",
                    title: "Legal",
                    parent: "FinancialAssetEvent",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: false,
                    en18031_3: true,
                    mechanism: "LGM-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "FinancialAssetEvent.LGM",
                    title: "LGM",
                    parent: "FinancialAssetEvent",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: false,
                    en18031_3: true,
                    mechanism: "LGM-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "LGM",
                    title: "LGM",
                    type: "req",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "LGM-2, LGM-4",
                    condition: true
                }
            },
            {
                data: {
                    id: "LGM.InternalStorage",
                    title: "InternalStorage",
                    parent: "LGM",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "LGM-2",
                    condition: true
                }
            },
            {
                data: {
                    id: "LGM.ExternalStorage",
                    title: "ExternalStorage",
                    parent: "LGM",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "LGM-2",
                    condition: true
                }
            },
            {
                data: {
                    id: "LGM.TimeStamp",
                    title: "TimeStamp",
                    parent: "LGM",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "LGM-4",
                    condition: true
                }
            },
            {
                data: {
                    id: "LGM.TimeRelated",
                    title: "TimeRelated",
                    parent: "LGM",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "LGM-4",
                    condition: true
                }
            },
            {
                data: {
                    id: "Events",
                    title: "Events",
                    type: "req",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "LGM-3, LGM-4"
                }
            },
            {
                data: {
                    id: "Quantity",
                    title: "Quantity",
                    type: "req",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "LGM-3"
                }
            },
            {
                data: {
                    id: "PersonalData",
                    title: "PersonalData",
                    type: "req",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "DLM-1"
                }
            },
            {
                data: {
                    id: "SenSecParam",
                    title: "SenSecParam",
                    type: "req",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "DLM-1"
                }
            },
            {
                data: {
                    id: "DLM",
                    title: "DLM",
                    type: "req",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "DLM-1"
                }
            },
            {
                data: {
                    id: "PersonalInformation",
                    title: "PersonalInformation",
                    type: "req",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "UNM-1"
                }
            },
            {
                data: {
                    id: "PersonalInformation.UseCase",
                    title: "UseCase",
                    parent: "PersonalInformation",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "UNM-1"
                }
            },
            {
                data: {
                    id: "PersonalInformation.UseCase",
                    title: "UseCase",
                    parent: "PersonalInformation",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "UNM-1"
                }
            },
            {
                data: {
                    id: "PersonalInformation.UseCase.Notification",
                    title: "Notification",
                    parent: "PersonalInformation.UseCase",
                    type: "L3",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "UNM-1"
                }
            },
            {
                data: {
                    id: "PersonalInformation.UseCase",
                    title: "UseCase",
                    parent: "PersonalInformation",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "UNM-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "PersonalInformation.UseCase.OtherInfo",
                    title: "OtherInfo",
                    parent: "PersonalInformation.UseCase",
                    type: "L3",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "UNM-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "Notification",
                    title: "Notification",
                    type: "req",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "UNM-2"
                }
            },
            {
                data: {
                    id: "Notification.UseCase",
                    title: "UseCase",
                    parent: "Notification",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "UNM-2"
                }
            },
            {
                data: {
                    id: "Notification.UseCase",
                    title: "UseCase",
                    parent: "Notification",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "UNM-2"
                }
            },
            {
                data: {
                    id: "Notification.UseCase.Content",
                    title: "Content",
                    parent: "Notification.UseCase",
                    type: "L3",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "UNM-2"
                }
            },
            {
                data: {
                    id: "CCK",
                    title: "CCK",
                    type: "req",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "CCK-1, CCK-3"
                }
            },
            {
                data: {
                    id: "CCK.Deviation",
                    title: "Deviation",
                    parent: "CCK",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "CCK-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "CCK.SecurityStrength",
                    title: "SecurityStrength",
                    parent: "CCK",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "CCK-1"
                }
            },
            {
                data: {
                    id: "CCK.Controlled",
                    title: "Controlled",
                    parent: "CCK",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "CCK-3",
                    condition: true
                }
            },
            {
                data: {
                    id: "CCK.Shared",
                    title: "Shared",
                    parent: "CCK",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "CCK-3",
                    condition: true
                }
            },
            {
                data: {
                    id: "CCK.Unique",
                    title: "Unique",
                    parent: "CCK",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "CCK-3",
                    condition: true
                }
            },
            {
                data: {
                    id: "Generation",
                    title: "Generation",
                    type: "req",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "CCK-2"
                }
            },
            {
                data: {
                    id: "Generation.CCK",
                    title: "CCK",
                    parent: "Generation",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "CCK-2"
                }
            },
            {
                data: {
                    id: "Generation.RNSource",
                    title: "RNSource",
                    parent: "Generation",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "CCK-2",
                    condition: true
                }
            },
            {
                data: {
                    id: "Generation.RNG",
                    title: "RNG",
                    parent: "Generation",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "CCK-2",
                    condition: true
                }
            },
            {
                data: {
                    id: "Generation.Implementation",
                    title: "Implementation",
                    parent: "Generation",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "CCK-2",
                    condition: true
                }
            },
            {
                data: {
                    id: "Generation.Deviation",
                    title: "Deviation",
                    parent: "Generation",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "CCK-2",
                    condition: true
                }
            },
            {
                data: {
                    id: "SoftwareDocumentation",
                    title: "SoftwareDocumentation",
                    type: "req",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "GEC-1"
                }
            },
            {
                data: {
                    id: "HardwareDocumentation",
                    title: "HardwareDocumentation",
                    type: "req",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "GEC-1"
                }
            },
            {
                data: {
                    id: "ListOfVulnerabilities",
                    title: "ListOfVulnerabilities",
                    type: "req",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "GEC-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "ListOfVulnerabilities.Remediated",
                    title: "Remediated",
                    parent: "ListOfVulnerabilities",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "GEC-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "ListOfVulnerabilities.SpecificCondition",
                    title: "SpecificCondition",
                    parent: "ListOfVulnerabilities",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "GEC-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "ListOfVulnerabilities.Mitgated",
                    title: "Mitgated",
                    parent: "ListOfVulnerabilities",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "GEC-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "ListOfVulnerabilities.Accepted",
                    title: "Accepted",
                    parent: "ListOfVulnerabilities",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "GEC-1",
                    condition: true
                }
            },
            {
                data: {
                    id: "Setup",
                    title: "Setup",
                    type: "req",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "GEC-2",
                    condition: true
                }
            },
            {
                data: {
                    id: "UserDoc",
                    title: "UserDoc",
                    type: "req",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "GEC-4"
                }
            },
            {
                data: {
                    id: "UserDoc.NetworkInterface",
                    title: "NetworkInterface",
                    parent: "UserDoc",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "GEC-4"
                }
            },
            {
                data: {
                    id: "UserDoc.NetworkInterface",
                    title: "NetworkInterface",
                    parent: "UserDoc",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "GEC-4"
                }
            },
            {
                data: {
                    id: "UserDoc.NetworkInterface.Exposure",
                    title: "Exposure",
                    parent: "UserDoc.NetworkInterface",
                    type: "L3",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "GEC-4"
                }
            },
            {
                data: {
                    id: "UserDoc.NonNetworkInterface",
                    title: "NonNetworkInterface",
                    parent: "UserDoc",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "GEC-7",
                    condition: true
                }
            },
            {
                data: {
                    id: "PhysicalExternalInterface",
                    title: "PhysicalExternalInterface",
                    type: "req",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "GEC-5"
                }
            },
            {
                data: {
                    id: "PhysicalExternalInterface.Purpose",
                    title: "Purpose",
                    parent: "PhysicalExternalInterface",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "GEC-5"
                }
            },
            {
                data: {
                    id: "PhysicalExternalInterface.Type",
                    title: "Type",
                    parent: "PhysicalExternalInterface",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "GEC-5"
                }
            },
            {
                data: {
                    id: "IntFunc",
                    title: "IntFunc",
                    type: "req",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "GEC-5"
                }
            },
            {
                data: {
                    id: "ExternalInterface",
                    title: "ExternalInterface",
                    type: "req",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "GEC-6"
                }
            },
            {
                data: {
                    id: "ExternalInterface.Capabilities",
                    title: "Capabilities",
                    parent: "ExternalInterface",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "GEC-6"
                }
            },
            {
                data: {
                    id: "ExternalInterface.Validation",
                    title: "Validation",
                    parent: "ExternalInterface",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "GEC-6"
                }
            },
            {
                data: {
                    id: "NonNetworkInterface",
                    title: "NonNetworkInterface",
                    type: "req",
                    en18031_1: false,
                    en18031_2: true,
                    en18031_3: false,
                    mechanism: "GEC-7",
                    condition: true
                }
            },
            {
                data: {
                    id: "BootProcess",
                    title: "BootProcess",
                    type: "req",
                    en18031_1: false,
                    en18031_2: false,
                    en18031_3: true,
                    mechanism: "GEC-8"
                }
            },
            {
                data: {
                    id: "BootProcess.TrustAnchor",
                    title: "TrustAnchor",
                    parent: "BootProcess",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: false,
                    en18031_3: true,
                    mechanism: "GEC-8"
                }
            },
            {
                data: {
                    id: "BootProcess.SecMech",
                    title: "SecMech",
                    parent: "BootProcess",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: false,
                    en18031_3: true,
                    mechanism: "GEC-8"
                }
            },
            {
                data: {
                    id: "BootProcess.Modes",
                    title: "Modes",
                    parent: "BootProcess",
                    type: "subreq",
                    en18031_1: false,
                    en18031_2: false,
                    en18031_3: true,
                    mechanism: "GEC-8"
                }
            },
            {
                data: {
                    id: "Assets",
                    title: "Assets",
                    type: "req",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "CRY-1"
                }
            },
            {
                data: {
                    id: "Assets.Cryptography",
                    title: "Cryptography",
                    parent: "Assets",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "CRY-1"
                }
            },
            {
                data: {
                    id: "Assets.Deviation",
                    title: "Deviation",
                    parent: "Assets",
                    type: "subreq",
                    en18031_1: true,
                    en18031_2: true,
                    en18031_3: true,
                    mechanism: "CRY-1",
                    condition: true
                }
            }
        ],
        edges: [
            {
                data: {
                    source: "SecurityAsset.ACM",
                    target: "ACM"
                }
            },
            {
                data: {
                    source: "SecurityAsset.SSM",
                    target: "SSM"
                }
            },
            {
                data: {
                    source: "SecurityAsset.NetworkInterface",
                    target: "NetworkInterface"
                }
            },
            {
                data: {
                    source: "NetworkAsset.ACM",
                    target: "ACM"
                }
            },
            {
                data: {
                    source: "NetworkAsset.SSM",
                    target: "SSM"
                }
            },
            {
                data: {
                    source: "PrivacyAsset.ACM",
                    target: "ACM"
                }
            },
            {
                data: {
                    source: "PrivacyAsset.SSM",
                    target: "SSM"
                }
            },
            {
                data: {
                    source: "FinancialAsset.ACM",
                    target: "ACM"
                }
            },
            {
                data: {
                    source: "FinancialAsset.SSM",
                    target: "SSM"
                }
            },
            {
                data: {
                    source: "FinancialAsset.NetworkInterface",
                    target: "NetworkInterface"
                }
            },
            {
                data: {
                    source: "ACM.NetworkInterface",
                    target: "NetworkInterface"
                }
            },
            {
                data: {
                    source: "ACM.AuthenticationMechanism",
                    target: "AuthenticationMechanism"
                }
            },
            {
                data: {
                    source: "PartOfSoftw.SUM",
                    target: "SUM"
                }
            },
            {
                data: {
                    source: "SCM.CCK",
                    target: "CCK"
                }
            },
            {
                data: {
                    source: "PrivacyAssetEvent.LGM",
                    target: "LGM"
                }
            },
            {
                data: {
                    source: "FinancialAssetEvent.LGM",
                    target: "LGM"
                }
            },
            {
                data: {
                    source: "Generation.CCK",
                    target: "CCK"
                }
            },
            {
                data: {
                    source: "UserDoc.NetworkInterface",
                    target: "NetworkInterface"
                }
            },
            {
                data: {
                    source: "UserDoc.NetworkInterface.Exposure",
                    target: "NetworkInterface.Exposure"
                }
            },
            {
                data: {
                    source: "UserDoc.NonNetworkInterface",
                    target: "NonNetworkInterface"
                }
            }
        ]
};

/* Saved layout: node id -> {x, y}. */
const EN18031_EINFO_POSITIONS = {"SecurityAsset":{"x":1471.9089933337568,"y":1761.915579235509},"SecurityAsset.Access":{"x":1507.374518829298,"y":1799.10771287538},"SecurityAsset.PublicAccess":{"x":1529.3745188292967,"y":1738.6077128753777},"SecurityAsset.Environment":{"x":1627.877482998417,"y":1737.9211289580658},"SecurityAsset.Legal":{"x":1569.3745188292962,"y":1799.10771287538},"SecurityAsset.ACM":{"x":1288.9405036690966,"y":1771.9531662949244},"SecurityAsset.SSM":{"x":1294.8586163785071,"y":1862.2234455956382},"SecurityAsset.class":{"x":1623.8745188292953,"y":1799.10771287538},"SecurityAsset.Com":{"x":1498.374518829298,"y":1859.6077128753764},"SecurityAsset.NetworkInterface":{"x":1397.9504107457192,"y":1679.47365327401},"SecurityAsset.TrustedEnv":{"x":1630.7319586975352,"y":1678.2979654414878},"SecurityAsset.AddMeasures":{"x":1530.8745188292967,"y":1678.1077128753798},"NetworkAsset":{"x":92.91905441718738,"y":1634.7856514041587},"NetworkAsset.Access":{"x":121.91905441718782,"y":1668.187548394596},"NetworkAsset.PublicAccess":{"x":39.91905441718686,"y":1607.687548394596},"NetworkAsset.Environment":{"x":148.9190544171879,"y":1607.687548394596},"NetworkAsset.Legal":{"x":126.91905441718784,"y":1547.187548394596},"NetworkAsset.ACM":{"x":143.88622716569574,"y":1423.6943645940087},"NetworkAsset.SSM":{"x":165.4317026468206,"y":1862.376938214309},"NetworkAsset.class":{"x":10.419054417187652,"y":1728.6875483945953},"NetworkAsset.Com":{"x":61.91905441718686,"y":1728.6875483945953},"NetworkAsset.NetInterface":{"x":35.91905441718731,"y":1668.187548394596},"NetworkAsset.AddMeasures":{"x":41.41905441718731,"y":1547.187548394596},"PrivacyAsset":{"x":433.06188680848874,"y":1635.7433241809058},"PrivacyAsset.Access":{"x":302.85112495611304,"y":1669.6565984911213},"PrivacyAsset.PublicAccess":{"x":439.8511249561128,"y":1548.6565984911208},"PrivacyAsset.Environment":{"x":321.85112495611304,"y":1609.1565984911213},"PrivacyAsset.Legal":{"x":364.85112495611247,"y":1669.6565984911213},"PrivacyAsset.ACM":{"x":500.0756891527152,"y":1424.8447617987536},"PrivacyAsset.TrustedSources":{"x":333.3511249561127,"y":1488.1565984911213},"PrivacyAsset.SSM":{"x":571.7726486608649,"y":1863.141886563058},"PrivacyAsset.class":{"x":419.35112495611304,"y":1669.6565984911213},"PrivacyAsset.Com":{"x":470.85112495611327,"y":1669.6565984911213},"PrivacyAsset.NetInterface":{"x":426.8511249561128,"y":1609.1565984911213},"PrivacyAsset.TrustedEnv":{"x":446.85112495611315,"y":1488.1565984911213},"PrivacyAsset.AddMeasures":{"x":326.3511249561126,"y":1548.6565984911208},"FinancialAsset":{"x":965.0483306826269,"y":1633.0380708883383},"FinancialAsset.Access":{"x":1016.5864445769923,"y":1798.0702486591695},"FinancialAsset.PublicAccess":{"x":932.5864445769924,"y":1737.5702486591697},"FinancialAsset.Environment":{"x":929.5864445769924,"y":1798.0702486591695},"FinancialAsset.Legal":{"x":1016.5864445769923,"y":1737.5702486591697},"FinancialAsset.ACM":{"x":715.168776710258,"y":1589.8640315959988},"FinancialAsset.SSM":{"x":761.2657418761622,"y":1864.5421637781983},"FinancialAsset.class":{"x":903.0864445769929,"y":1858.5702486591692},"FinancialAsset.Com":{"x":954.5864445769927,"y":1858.5702486591692},"FinancialAsset.NetworkInterface":{"x":1172.4278846549958,"y":1418.0339779984783},"ACM":{"x":713.8936671816476,"y":1004.8806214812894},"ACM.NetworkInterface":{"x":1062.9626222119737,"y":1107.4073211840814},"ACM.UserInterfaces":{"x":616.8247121513216,"y":1136.1630172245868},"ACM.MachineInterfaces":{"x":608.8247121513214,"y":894.1630172245871},"ACM.ManagedAccessNetworkAsset":{"x":412.82471215132153,"y":954.6630172245868},"ACM.ManagedAccessPrivacyAsset":{"x":409.82471215132153,"y":1075.6630172245873},"ACM.ManagedAccessFinancialAsset":{"x":415.8247121513216,"y":894.1630172245871},"ACM.ManagedAccessSecurityAsset":{"x":412.82471215132153,"y":1015.1630172245868},"ACM.IntendedFunctionality":{"x":613.8247121513214,"y":954.6630172245868},"ACM.IntendedEnvironment":{"x":613.8247121513214,"y":1015.1630172245868},"ACM.AuthorizedEntity":{"x":362.82471215132193,"y":1136.1630172245868},"ACM.AuthenticationMechanism":{"x":827.2790540922074,"y":890.098225737992},"ACM.ReadOnlyFunctionality":{"x":611.8247121513214,"y":1075.6630172245873},"ACM.ReadOnlyLegal":{"x":492.8247121513217,"y":1136.1630172245868},"AuthenticationMechanism":{"x":828.1028213959329,"y":744.9998154695016},"AuthenticationMechanism.AuthFactor":{"x":828.1028213959329,"y":753.2498154695016},"AUM":{"x":1224.9300621764014,"y":163},"AUM.AuthVal":{"x":1109.4300621764014,"y":292.25},"AUM.AuthEnv":{"x":1325.4300621764014,"y":231.75},"AUM.ConfSecGoal":{"x":1298.9300621764014,"y":110.75},"AUM.AuthChange":{"x":1234.4300621764014,"y":231.75},"AUM.PwdProperty":{"x":1127.9300621764014,"y":231.75},"AUM.UniqueBestPractice":{"x":1152.4300621764014,"y":171.25},"AUM.EnforceSettingFirstUse":{"x":1164.4300621764014,"y":50.25},"AUM.DefinedAuthEntity":{"x":1303.4300621764014,"y":171.25},"AUM.EquipmentGenerated":{"x":1158.4300621764014,"y":110.75},"AUM.BFProtection":{"x":1309.4300621764014,"y":50.25},"PartOfSoftw":{"x":2458.7106633158237,"y":1409.682331996862},"PartOfSoftw.FuncSaftyImp":{"x":2444.0043881072183,"y":1390.9932322920122},"PartOfSoftw.Immutable":{"x":2537.004388107219,"y":1451.4932322920124},"PartOfSoftw.AltMeasures":{"x":2439.0043881072183,"y":1451.4932322920124},"PartOfSoftw.SUM":{"x":2360.916938524428,"y":1384.3714317017116},"SUM":{"x":2122.2483587667984,"y":1383.9959093013945},"SUM.Sign":{"x":2130.2483587667984,"y":1452.7459093013945},"SUM.SecChan":{"x":2170.7483587667984,"y":1392.2459093013945},"SUM.AccContMech":{"x":2090.7483587667984,"y":1331.7459093013945},"SUM.Generic":{"x":2069.2483587667984,"y":1452.7459093013945},"SUM.Automation":{"x":2081.2483587667984,"y":1392.2459093013945},"SSM":{"x":664.7599706101698,"y":2561.4817410646683},"SSM.Asset":{"x":723.7599706101695,"y":2478.981741064666},"SSM.Encryption":{"x":694.2599706101698,"y":2660.4817410646706},"SSM.DigitalSignature":{"x":736.7599706101697,"y":2599.981741064668},"SSM.AccessControl":{"x":588.2599706101701,"y":2660.4817410646706},"SSM.OTProgrammable":{"x":600.2599706101701,"y":2599.981741064668},"SSM.HardwareProtection":{"x":607.25997061017,"y":2539.481741064666},"SSM.Generic":{"x":722.7599706101695,"y":2539.481741064666},"SSM.ComplianceEvidence":{"x":611.75997061017,"y":2478.981741064666},"SCM":{"x":2425.7526037810862,"y":743.3745548863778},"SCM.Protocol":{"x":2587.3249805788855,"y":721.3745548863778},"SCM.States":{"x":2466.8249805788855,"y":902.874554886378},"SCM.SecObjectives":{"x":2485.3249805788855,"y":660.8745548863778},"SCM.Manage":{"x":2325.8249805788855,"y":902.874554886378},"SCM.Capabilities":{"x":2440.3249805788855,"y":842.3745548863778},"SCM.ManufSecret":{"x":2451.3249805788855,"y":781.8745548863778},"SCM.SecChanExchange":{"x":2365.3249805788855,"y":600.3745548863776},"SCM.PKI-Based":{"x":2591.3249805788855,"y":660.8745548863778},"SCM.ThirdPartyTrust":{"x":2486.8249805788855,"y":721.3745548863778},"SCM.MessageEnc":{"x":2343.3249805788855,"y":781.8745548863778},"SCM.ChannelEnc":{"x":2493.8249805788855,"y":600.3745548863776},"SCM.SeqNumber":{"x":2555.8249805788855,"y":781.8745548863778},"SCM.TimeStamp":{"x":2538.8249805788855,"y":842.3745548863778},"SCM.OneTimeEncKey":{"x":2357.3249805788855,"y":660.8745548863778},"SCM.Generic":{"x":2399.3249805788855,"y":902.874554886378},"SCM.ImplDetail":{"x":2589.8249805788855,"y":600.3745548863776},"SCM.CCK":{"x":2238.680226983287,"y":743.5690128177578},"SCM.ThreatProtection":{"x":2356.3249805788855,"y":721.3745548863778},"SCM.Repudiation":{"x":2339.8249805788855,"y":842.3745548863778},"NetworkInterface":{"x":1500.7633816667287,"y":1192.347365388372},"NetworkInterface.Protocol":{"x":1658.7982455956019,"y":1140.097365388372},"NetworkInterface.Radio":{"x":1639.2982455956019,"y":1200.597365388372},"NetworkInterface.Wired":{"x":1573.2982455956014,"y":1261.097365388372},"NetworkInterface.Optical":{"x":1577.2982455956014,"y":1200.597365388372},"NetworkInterface.Acoustic":{"x":1582.7982455956014,"y":1140.097365388372},"NetworkInterface.Exposure":{"x":1347.2285177378556,"y":1239.335712663639},"RLM":{"x":1681.9300621764014,"y":40.25},"NMM":{"x":1149.9300621764014,"y":425},"NMM.GTPFiltering":{"x":1126.9300621764014,"y":493.75},"NMM.IPPacketFiltering":{"x":1142.4300621764014,"y":433.25},"NMM.NetworkEquipment":{"x":1149.9300621764014,"y":372.75},"TCM":{"x":1321.9300621764014,"y":425},"TCM.DatagramRules":{"x":1309.9300621764014,"y":493.75},"TCM.TrafficSeparation":{"x":1314.4300621764014,"y":433.25},"TCM.NetworkEquipment":{"x":1321.9300621764014,"y":372.75},"PrivacyAssetEvent":{"x":1978.4395562689924,"y":2145.0541059155},"PrivacyAssetEvent.Legal":{"x":1978.4395562689924,"y":2197.8079167383216},"PrivacyAssetEvent.LGM":{"x":1977.4903001471293,"y":2108.800295092678},"FinancialAssetEvent":{"x":2140.6449370747387,"y":2131.7603040183267},"FinancialAssetEvent.Legal":{"x":2140.6449370747387,"y":2176.1534977298984},"FinancialAssetEvent.LGM":{"x":2140.0973305275984,"y":2103.8671103067554},"LGM":{"x":2139.6268782756197,"y":1836.4416454263062},"LGM.InternalStorage":{"x":2086.1268782756197,"y":1874.9416454263062},"LGM.ExternalStorage":{"x":2088.6268782756197,"y":1814.4416454263062},"LGM.TimeStamp":{"x":2203.126878275619,"y":1814.4416454263062},"LGM.TimeRelated":{"x":2202.626878275619,"y":1874.9416454263062},"Events":{"x":1624.4300621764014,"y":40.25},"Quantity":{"x":1521.9300621764014,"y":705.25},"PersonalData":{"x":1427.4300621764014,"y":705.25},"SenSecParam":{"x":1310.9300621764014,"y":705.25},"DLM":{"x":1712.9300621764014,"y":705.25},"PersonalInformation":{"x":1643.9300621764014,"y":396.5},"PersonalInformation.UseCase":{"x":1643.9300621764014,"y":404.75},"PersonalInformation.UseCase.Notification":{"x":1643.9300621764014,"y":382.75},"PersonalInformation.UseCase.OtherInfo":{"x":1637.4300621764014,"y":443.25},"Notification":{"x":1823.4973501350792,"y":410.81204492455333},"Notification.UseCase":{"x":1823.4973501350792,"y":419.06204492455333},"Notification.UseCase.Content":{"x":1823.4973501350792,"y":427.31204492455333},"CCK":{"x":2236.579490413893,"y":1081.2125559645026},"CCK.Deviation":{"x":2281.0794904138934,"y":1089.4625559645026},"CCK.SecurityStrength":{"x":2218.0794904138934,"y":1028.9625559645026},"CCK.Controlled":{"x":2195.0794904138934,"y":1089.4625559645026},"CCK.Shared":{"x":2184.579490413893,"y":1149.9625559645026},"CCK.Unique":{"x":2252.0794904138934,"y":1149.9625559645026},"Generation":{"x":2613.7317571218464,"y":1125.5171479218016},"Generation.CCK":{"x":2500.048306339711,"y":1080.4394024163678},"Generation.RNSource":{"x":2624.415207903983,"y":1133.767147921802},"Generation.RNG":{"x":2605.415207903983,"y":1194.267147921801},"Generation.Implementation":{"x":2642.415207903983,"y":1073.2671479218022},"Generation.Deviation":{"x":2710.9152079039814,"y":1133.767147921802},"SoftwareDocumentation":{"x":1157.4300621764014,"y":705.25},"HardwareDocumentation":{"x":1672.4300621764014,"y":564.25},"ListOfVulnerabilities":{"x":1488.9300621764014,"y":102.5},"ListOfVulnerabilities.Remediated":{"x":1447.4300621764014,"y":110.75},"ListOfVulnerabilities.SpecificCondition":{"x":1465.9300621764014,"y":50.25},"ListOfVulnerabilities.Mitgated":{"x":1434.9300621764014,"y":171.25},"ListOfVulnerabilities.Accepted":{"x":1540.4300621764014,"y":110.75},"Setup":{"x":1658.9300621764014,"y":705.25},"UserDoc":{"x":1459.1769113421074,"y":939.2959977112367},"UserDoc.NetworkInterface":{"x":1580.007193985713,"y":947.5459977112367},"UserDoc.NetworkInterface.Exposure":{"x":1580.007193985713,"y":955.7959977112367},"UserDoc.NonNetworkInterface":{"x":1353.3466286985017,"y":960.7573986776562},"PhysicalExternalInterface":{"x":1332.3828390669255,"y":603.4292771909646},"PhysicalExternalInterface.Purpose":{"x":1306.8828390669255,"y":611.6792771909646},"PhysicalExternalInterface.Type":{"x":1370.3828390669255,"y":611.6792771909646},"IntFunc":{"x":1594.9300621764014,"y":705.25},"ExternalInterface":{"x":1511.4542391740022,"y":581.0912202483943},"ExternalInterface.Capabilities":{"x":1511.4542391740022,"y":559.0912202483943},"ExternalInterface.Validation":{"x":1504.9542391740022,"y":619.5912202483943},"NonNetworkInterface":{"x":1353.9118576746032,"y":795.7763245462883},"BootProcess":{"x":1491.9300621764014,"y":394.75},"BootProcess.TrustAnchor":{"x":1469.4300621764014,"y":372.75},"BootProcess.SecMech":{"x":1459.4300621764014,"y":433.25},"BootProcess.Modes":{"x":1533.4300621764014,"y":433.25},"Assets":{"x":1130.4300621764014,"y":596.25},"Assets.Cryptography":{"x":1130.4300621764014,"y":574.25},"Assets.Deviation":{"x":1115.4300621764014,"y":634.75}};
