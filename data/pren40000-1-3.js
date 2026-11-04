/**
 * cetome dataviz - prEN 40000-1-3 and CRA essential requirements
 * Copyright (C) 2024-2026 cetome. This data is licensed under CC BY 4.0 (not under the AGPL of the
 * code), see DATA-LICENSE.md. The standards it refers to remain their publishers'.
 *
 * DATA FILE. Elements (nodes and edges) of the prEN 40000-1-3 / CRA Annex I Part 2 graph.
 * The graph logic lives in js/pren40000-1-3.js; the page is pren40000-1-3/index.html.
 */
const PREN40000_1_3_DATA = [
    {
        "data": {
            "id": "Annex I Part 2",
            "label": "Annex I Part 2",
            "parent": null,
            "type": "ESSR_CONTAINER",
            "info": "",
            "display_title": "Essential Requirements"
        }
    },
    {
        "data": {
            "id": "I_2_1",
            "label": "(1) Documentation",
            "parent": "Annex I Part 2",
            "type": "ESSR",
            "info": "Identify and document vulnerabilities and components contained in products with digital elements, including by drawing up a software bill of materials in a commonly used and machine-readable format covering at the very least the top-level dependencies of the products.",
            "display_title": "(1) Documentation"
        }
    },
    {
        "data": {
            "id": "I_2_2",
            "label": "(2) Risk remediation",
            "parent": "Annex I Part 2",
            "type": "ESSR",
            "info": "In relation to the risks posed to products with digital elements, address and remediate vulnerabilities without delay, including by providing security updates; where technically feasible, new security updates shall be provided separately from functionality updates.",
            "display_title": "(2) Risk remediation"
        }
    },
    {
        "data": {
            "id": "I_2_3",
            "label": "(3) Regular review",
            "parent": "Annex I Part 2",
            "type": "ESSR",
            "info": "Apply effective and regular tests and reviews of the security of the product with digital elements.",
            "display_title": "(3) Regular review"
        }
    },
    {
        "data": {
            "id": "I_2_4",
            "label": "(4) Security advisory",
            "parent": "Annex I Part 2",
            "type": "ESSR",
            "info": "Once a security update has been made available, share and publicly disclose information about fixed vulnerabilities, including a description of the vulnerabilities, information allowing users to identify the product with digital elements affected, the impacts of the vulnerabilities, their severity and clear and accessible information helping users to remediate the vulnerabilities; in duly justified cases, where manufacturers consider the security risks of publication to outweigh the security benefits, they may delay making public information regarding a fixed vulnerability until after users have been given the possibility to apply the relevant patch.",
            "display_title": "(4) Security advisory"
        }
    },
    {
        "data": {
            "id": "I_2_5",
            "label": "(5) Coordinated vulnerability disclosure",
            "parent": "Annex I Part 2",
            "type": "ESSR",
            "info": "Take measures to facilitate the sharing of information about potential vulnerabilities in their product with digital elements as well as in third-party components contained in that product, including by providing a contact address for the reporting of the vulnerabilities discovered in the product with digital elements.",
            "display_title": "(5) Coordinated vulnerability disclosure"
        }
    },
    {
        "data": {
            "id": "I_2_6",
            "label": "(6) Vulnerability exchange",
            "parent": "Annex I Part 2",
            "type": "ESSR",
            "info": "Put in place and enforce a policy on coordinated vulnerability disclosure.",
            "display_title": "(6) Vulnerability exchange"
        }
    },
    {
        "data": {
            "id": "I_2_7",
            "label": "(7) Secure update distribution",
            "parent": "Annex I Part 2",
            "type": "ESSR",
            "info": "Provide for mechanisms to securely distribute updates for products with digital elements to ensure that vulnerabilities are fixed or mitigated in a timely manner and, where applicable for security updates, in an automatic manner.",
            "display_title": "(7) Secure update distribution"
        }
    },
    {
        "data": {
            "id": "I_2_8",
            "label": "(8) Dissemination",
            "parent": "Annex I Part 2",
            "type": "ESSR",
            "info": "Ensure that, where security updates are available to address identified security issues, they are disseminated without delay and, unless otherwise agreed between a manufacturer and a business user in relation to a tailor-made product with digital elements, free of charge, accompanied by advisory messages providing users with the relevant information, including on potential action to be taken.",
            "display_title": "(8) Dissemination"
        }
    },
    {
        "data": {
            "id": "[APP]",
            "label": "[APP]",
            "parent": null,
            "type": "ROOT_CONTAINER",
            "info": "The rigor applied to vulnerability handling activities follows a risk-based approach aligned with the product's risks.",
            "display_title": "Applicability"
        }
    },
    {
        "data": {
            "id": "[APP-1]",
            "label": "[APP-1]",
            "parent": "[APP]",
            "type": "CHAPTER",
            "info": "Manufacturers are normally responsible for conducting a risk assessment to assess the risks associated with the use of the product to determine the appropriate rigor for vulnerability handling.\nDependent upon the risks, there is an expectation to implement the relevant requirement enhancements in one or more of the following identified activities:\n- [PRE-5-RQ-01-RE] Secure communication\n- [PRE-7-RQ-03-RE] SBOM completeness\n- [PRE-7-RQ-07-RE] SBOM software component hash\n- [RLS-2-RQ-03-RE] Machine-readable advisories",
            "display_title": "Requirement enhancement applicability"
        }
    },
    {
        "data": {
            "id": "[APP-1-RQ-1]",
            "label": "[APP-1-RQ-1]",
            "parent": "[APP-1]",
            "type": "RQ",
            "info": "The applicability of the requirement enhancements shall be determined based on the product risks.",
            "display_title": "Risk-based applicability"
        }
    },
    {
        "data": {
            "id": "[PRE]",
            "label": "[PRE]",
            "parent": null,
            "type": "ROOT_CONTAINER",
            "info": "The preparation phase lays the foundation for establishing appropriate vulnerability handling and disclosure processes and policies to support the subsequent phases, providing a structured, methodological approach to identify, verify, and address vulnerabilities, including communication. This phase also includes requirements such as identifying software and hardware components, focusing on creating the Software Bill of Materials (SBOM), and establishing a coordinated vulnerability disclosure and vulnerability handling policy.",
            "display_title": "Preparation"
        }
    },
    {
        "data": {
            "id": "[PRE-1]",
            "label": "[PRE-1]",
            "parent": "[PRE]",
            "type": "CHAPTER",
            "info": "A manufacturer establishes and maintains an internal vulnerability handling policy to clearly definedefinetheir approach for investigating and remediating security vulnerabilities. An additional important aspect covered is the testing strategy that should be defined to support effective and regular tests and reviews of its products. This policy forms a core part of the manufacturer\u2019s overall vulnerability handling process and is compatible with the external coordinated vulnerability disclosure policy as per [PRE-2]. The intended audience for the vulnerability handling policy is the internal staff.",
            "display_title": "Policy on vulnerability handling"
        }
    },
    {
        "data": {
            "id": "[PRE-1-RQ-01]",
            "label": "[PRE-1-RQ-01]",
            "parent": "[PRE-1]",
            "type": "RQ",
            "info": "A policy on vulnerability handling shall be created, put in place and adhered to.",
            "display_title": "Policy adherence"
        }
    },
    {
        "data": {
            "id": "[PRE-1-RC-01]",
            "label": "[PRE-1-RC-01]",
            "parent": "[PRE-1]",
            "type": "RC",
            "info": "An organizational framework should be created to support the activities defined in the vulnerability handling process as per [PRE-1-RQ-01].",
            "display_title": "Organisational framework"
        }
    },
    {
        "data": {
            "id": "[PRE-1-RQ-02]",
            "label": "[PRE-1-RQ-02]",
            "parent": "[PRE-1]",
            "type": "RQ",
            "info": "The vulnerability handling policy shall include:\n- basic guidance, principles, and responsibilities for handling potential vulnerabilities in products\n- measures to prevent premature disclosure of information about potential vulnerabilities before they are fixed\n- a target schedule for remediation development\n- strategies related to the regular test and review activities, as defined in [PRE-9]\n- measures to prevent premature disclosure of information about potential vulnerabilities before they are fixed, as defined in [PRE-5]\n- activities and criteria to define a target schedule for the remediation of the vulnerability, which depends on the embargo period, established and infl\u00fcenced by the complexity of the case by case situation with impacted upstream stakeholders, and on the criticality of the vulnerability and the product itself\n- where known and appropriate, it is important to list the downstream stakeholders that are using the product under scope\n- the mapping of upstream stakeholders to support the component identification required by [PRE-7] and [PRE-8]",
            "display_title": "Required information"
        }
    },
    {
        "data": {
            "id": "[PRE-1-RC-02]",
            "label": "[PRE-1-RC-02]",
            "parent": "[PRE-1]",
            "type": "RC",
            "info": "A policy on vulnerability handling should include:\n- the full process description that is aligned with the expectations of this document\n- the roles and responsibilities that will be assigned to handle the potential vulnerabilities in the product",
            "display_title": "Recommended information"
        }
    },
    {
        "data": {
            "id": "[PRE-1-RQ-03]",
            "label": "[PRE-1-RQ-03]",
            "parent": "[PRE-1]",
            "type": "RQ",
            "info": "The effectiveness of the vulnerability handling process shall be monitored.",
            "display_title": "Effectiveness"
        }
    },
    {
        "data": {
            "id": "[PRE-1-RQ-04]",
            "label": "[PRE-1-RQ-04]",
            "parent": "[PRE-1]",
            "type": "RQ",
            "info": "For a timely resolution of the issues, a mapping of upstream interdependencies, including open source, is required to support the coordination and notification activities when a vulnerability is discovered.",
            "display_title": "Interdependencies"
        }
    },
    {
        "data": {
            "id": "[PRE-1-RQ-05]",
            "label": "[PRE-1-RQ-05]",
            "parent": "[PRE-1]",
            "type": "RQ",
            "info": "A policy on vulnerability handling shall support all the activities that are defined in the vulnerability disclosure policy, as described in 5.3.3.",
            "display_title": "Activity support"
        }
    },
    {
        "data": {
            "id": "[PRE-2]",
            "label": "[PRE-2]",
            "parent": "[PRE]",
            "type": "CHAPTER",
            "info": "The purpose of the coordinated vulnerability disclosure policy is to communicate the manufacturer's intentions, responsibilities, and expectations regarding vulnerability disclosure. A coordinated vulnerability disclosure policy encompasses both two-party coordination (e.g. between the reporter and the manufacturer) and multi-party disclosure involving multiple stakeholders. To support this, the manufacturer develops and publishes an external coordinated vulnerability disclosure policy and ensures the related internal activities are in place to effectively coordinate the disclosure of vulnerabilities.\n\nIn addition, to prevent attackers from gaining early access to sensitive information, reporters typically notify manufacturers privately, and refrain from public disclosure until a fix is available after an agreed-upon embargo period has passed. The receipt, verification, and remediation development stages are generally conducted within this embargo period, ensuring that vulnerabilities are addressed securely and responsibly by all the parties involved in the process.",
            "display_title": "Policy on coordinated vulnerability disclosure"
        }
    },
    {
        "data": {
            "id": "[PRE-2-RQ-01]",
            "label": "[PRE-2-RQ-01]",
            "parent": "[PRE-2]",
            "type": "RQ",
            "info": "A policy on coordinated vulnerability disclosure (CVD) shall be created, published in an accessible format and adhered to.",
            "display_title": "Public CVD policy"
        }
    },
    {
        "data": {
            "id": "[PRE-2-RQ-02]",
            "label": "[PRE-2-RQ-02]",
            "parent": "[PRE-2]",
            "type": "RQ",
            "info": "A coordinated vulnerability disclosure policy shall include one or more contact mechanisms.",
            "display_title": "Point of contact"
        }
    },
    {
        "data": {
            "id": "[PRE-2-RC-01]",
            "label": "[PRE-2-RC-01]",
            "parent": "[PRE-2]",
            "type": "RC",
            "info": "The contact mechanisms should provide accessibility via more than one sensory channel.",
            "display_title": "Accessibility"
        }
    },
    {
        "data": {
            "id": "[PRE-2-RQ-03]",
            "label": "[PRE-2-RQ-03]",
            "parent": "[PRE-2]",
            "type": "RQ",
            "info": "Setting expectations for on-going communication shall be stated in this policy.",
            "display_title": "Communication"
        }
    },
    {
        "data": {
            "id": "[PRE-2-RC-02]",
            "label": "[PRE-2-RC-02]",
            "parent": "[PRE-2]",
            "type": "RC",
            "info": "A vulnerability disclosure policy should include following elements:\n- vulnerability report contents;\n- secure communication options as detailed in [PRE-5]\n- publication;\n- recognition.",
            "display_title": "Recommended information"
        }
    },
    {
        "data": {
            "id": "[PRE-2-RC-03]",
            "label": "[PRE-2-RC-03]",
            "parent": "[PRE-2]",
            "type": "RC",
            "info": "A disclosure strategy should be in place to ensure that the information on vulnerability is not disclosed before it is addressed.",
            "display_title": "Disclosure strategy"
        }
    },
    {
        "data": {
            "id": "[PRE-3]",
            "label": "[PRE-3]",
            "parent": "[PRE]",
            "type": "CHAPTER",
            "info": "Information related to vulnerabilities is generally sensitive information, as vulnerabilities can be used by malicious actors. All external communication, as well as the manufacturers' internal processes, need to take operational security into account. The confidentiality controls can be lifted after remediation and advisory information has been published. Depending on the organization and its products, confidentiality controls can be as simple as marking information with TLP (Traffic Light Protocol) or be supported by technical controls like access control.",
            "display_title": "Operational security"
        }
    },
    {
        "data": {
            "id": "[PRE-3-RC-01]",
            "label": "[PRE-3-RC-01]",
            "parent": "[PRE-3]",
            "type": "RC",
            "info": "Operational security should be provided throughout the activities of receiving (5.4.2) and communicating about (5.3.5) vulnerability information or reports.",
            "display_title": "OpSec"
        }
    },
    {
        "data": {
            "id": "[PRE-3-RQ-01]",
            "label": "[PRE-3-RQ-01]",
            "parent": "[PRE-3]",
            "type": "RQ",
            "info": "Limiting access to non-public vulnerability information on a need-to-know basis shall be considered.",
            "display_title": "Access control"
        }
    },
    {
        "data": {
            "id": "[PRE-4]",
            "label": "[PRE-4]",
            "parent": "[PRE]",
            "type": "CHAPTER",
            "info": "The purpose of this phase is to maintain regular communication channels during the vulnerability handling activities with relevant stakeholders, such as users, coordinators, reporters, manufacturers, open-source stewards, maintainers of non-commercial open-source projects and other stakeholders, where required. Communication can be aligned with the product\u2019s life cycle and occur in parallel with all vulnerability handling phases, rather than following a strict sequence.",
            "display_title": "On-going communication"
        }
    },
    {
        "data": {
            "id": "[PRE-4-RQ-01]",
            "label": "[PRE-4-RQ-01]",
            "parent": "[PRE-4]",
            "type": "RQ",
            "info": "Communication with reporters and other stakeholders shall be established and maintained.",
            "display_title": "Effectiveness"
        }
    },
    {
        "data": {
            "id": "[PRE-4-RQ-02]",
            "label": "[PRE-4-RQ-02]",
            "parent": "[PRE-4]",
            "type": "RQ",
            "info": "Communication with users shall implement accessible modes of communication.",
            "display_title": "Accessibility"
        }
    },
    {
        "data": {
            "id": "[PRE-5]",
            "label": "[PRE-5]",
            "parent": "[PRE]",
            "type": "CHAPTER",
            "info": "The purpose of this subclause is to define secure communication mechanisms. Since vulnerability information can be exploited to attack affected systems, it is essential that such sensitive information, especially when not publicly disclosed, is communicated confidentially.",
            "display_title": "Secure communication"
        }
    },
    {
        "data": {
            "id": "[PRE-5-RC-01]",
            "label": "[PRE-5-RC-01]",
            "parent": "[PRE-5]",
            "type": "RC",
            "info": "Secure communication mechanisms should be provided throughout the activities of receiving and communicating vulnerability information or reports.",
            "display_title": "Security mechanisms"
        }
    },
    {
        "data": {
            "id": "[PRE-5-RQ-01-RE]",
            "label": "[PRE-5-RQ-01-RE]",
            "parent": "[PRE-5]",
            "type": "RQ",
            "info": "Secure communication mechanisms shall be provided and communicated to support 5.4.2.",
            "display_title": "Capability alignment"
        }
    },
    {
        "data": {
            "id": "[PRE-5-RC-02]",
            "label": "[PRE-5-RC-02]",
            "parent": "[PRE-5]",
            "type": "RC",
            "info": "Secure communication methods should support confidentiality and message integrity.",
            "display_title": "Content protection"
        }
    },
    {
        "data": {
            "id": "[PRE-5-RC-03]",
            "label": "[PRE-5-RC-03]",
            "parent": "[PRE-5]",
            "type": "RC",
            "info": "Stakeholders should have a way to report vulnerabilities anonymously.",
            "display_title": "Anonymous reporting"
        }
    },
    {
        "data": {
            "id": "[PRE-5-RC-04]",
            "label": "[PRE-5-RC-04]",
            "parent": "[PRE-5]",
            "type": "RC",
            "info": "Methods of secure communication should not disrupt the accessibility of external communication.",
            "display_title": "Accessibility"
        }
    },
    {
        "data": {
            "id": "[PRE-6]",
            "label": "[PRE-6]",
            "parent": "[PRE]",
            "type": "CHAPTER",
            "info": "This subclause describes the activities of recording relevant information to enable the product to be identifiable, for different purposes such as vulnerability handling, software bill of material generation and verification, and vulnerability information sharing and reporting.",
            "display_title": "Product identification"
        }
    },
    {
        "data": {
            "id": "[PRE-6-RQ-01]",
            "label": "[PRE-6-RQ-01]",
            "parent": "[PRE-6]",
            "type": "RQ",
            "info": "A product shall be identifiable by providing at least the following information:\n- manufacturer name;\n- product name;\n- (for hardware): any hardware product identifier, if applicable;\n- (for software): any software product identifier, if applicable.",
            "display_title": "Required information"
        }
    },
    {
        "data": {
            "id": "[PRE-6-RQ-02]",
            "label": "[PRE-6-RQ-02]",
            "parent": "[PRE-6]",
            "type": "RQ",
            "info": "If the product consists of both hardware and software, information for product identification, as per [PRE-6-RQ-01], shall be provided separately.",
            "display_title": "Separation of information"
        }
    },
    {
        "data": {
            "id": "[PRE-7]",
            "label": "[PRE-7]",
            "parent": "[PRE]",
            "type": "CHAPTER",
            "info": "This subclause describes the activities of identifying the software components that make up the product. The purpose of this identification is to enable effective vulnerability handling by ensuring that all components are known, traceable, and can be assessed for potential cybersecurity risks.",
            "display_title": "Identification of software components"
        }
    },
    {
        "data": {
            "id": "[PRE-7-RQ-01]",
            "label": "[PRE-7-RQ-01]",
            "parent": "[PRE-7]",
            "type": "RQ",
            "info": "All software components contained in the product shall be identified and documented.",
            "display_title": "Scope"
        }
    },
    {
        "data": {
            "id": "[PRE-7-RQ-02]",
            "label": "[PRE-7-RQ-02]",
            "parent": "[PRE-7]",
            "type": "RQ",
            "info": "For each component identified in [PRE-7-RQ-01], the following information shall be included:\n- Software producer (For open-source software, which is supported by an open-source steward, this is the name of the stewarding organization)\n- Component name\n- Component version",
            "display_title": "Required information"
        }
    },
    {
        "data": {
            "id": "[PRE-7-RQ-03]",
            "label": "[PRE-7-RQ-03]",
            "parent": "[PRE-7]",
            "type": "RQ",
            "info": "An SBOM shall be drawn up, including at least the top-level dependencies that are contained in the product, as identified in [PRE-7-RQ-01].",
            "display_title": "SBOM"
        }
    },
    {
        "data": {
            "id": "[PRE-7-RQ-03-RE]",
            "label": "[PRE-7-RQ-03-RE]",
            "parent": "[PRE-7]",
            "type": "RQ",
            "info": "All the software components identified in [PRE-7-RQ-01] shall be drawn up in the SBOM to detect transitive dependencies when technically feasible.",
            "display_title": "Interdependencies"
        }
    },
    {
        "data": {
            "id": "[PRE-7-RQ-04]",
            "label": "[PRE-7-RQ-04]",
            "parent": "[PRE-7]",
            "type": "RQ",
            "info": "The SBOM shall be assembled in a structured, machine-readable format.",
            "display_title": "Machine-readable format"
        }
    },
    {
        "data": {
            "id": "[PRE-7-RQ-05]",
            "label": "[PRE-7-RQ-05]",
            "parent": "[PRE-7]",
            "type": "RQ",
            "info": "If the software component is updated with a new build or release, a new SBOM shall be created to reflect the new version of the software.",
            "display_title": "Versioning"
        }
    },
    {
        "data": {
            "id": "[PRE-7-RC-01]",
            "label": "[PRE-7-RC-01]",
            "parent": "[PRE-7]",
            "type": "RC",
            "info": "When new details about the identified components are detected or the need to correct an error in the existing SBOM is discovered, a revised SBOM should be issued.",
            "display_title": "Revision"
        }
    },
    {
        "data": {
            "id": "[PRE-7-RQ-06]",
            "label": "[PRE-7-RQ-06]",
            "parent": "[PRE-7]",
            "type": "RQ",
            "info": "Metadata for the SBOM shall include:\n- SBOM Author (The name of the entity that creates the SBOM data for a component)\n- Version\n- Timestamp",
            "display_title": "Metadata"
        }
    },
    {
        "data": {
            "id": "[PRE-7-RQ-07]",
            "label": "[PRE-7-RQ-07]",
            "parent": "[PRE-7]",
            "type": "RQ",
            "info": "For each component part of SBOM as [PRE-7-RQ-02], the following information shall be included:\n- Information as required from [PRE-7-RQ-02]\n- Dependency relationship\n- Unique component identifiers",
            "display_title": "Required information"
        }
    },
    {
        "data": {
            "id": "[PRE-7-RQ-07-RE]",
            "label": "[PRE-7-RQ-07-RE]",
            "parent": "[PRE-7]",
            "type": "RQ",
            "info": "If the supplier provides the hash and the corresponding algorithm for the component, it shall be included in the SBOM.",
            "display_title": "Hash"
        }
    },
    {
        "data": {
            "id": "[PRE-8]",
            "label": "[PRE-8]",
            "parent": "[PRE]",
            "type": "CHAPTER",
            "info": "This clause describes the activities for identifying the hardware components used in the product that may affect its cybersecurity. The purpose of this identification is to enable effective vulnerability handling by ensuring that the relevant hardware components integrated into the product are known, traceable, and assessable for potential cybersecurity risks.",
            "display_title": "Identification of hardware components"
        }
    },
    {
        "data": {
            "id": "[PRE-8-RQ-01]",
            "label": "[PRE-8-RQ-01]",
            "parent": "[PRE-8]",
            "type": "RQ",
            "info": "Hardware components that are integrated in the product shall be identified and documented.",
            "display_title": "HBOM"
        }
    },
    {
        "data": {
            "id": "[PRE-8-RQ-02]",
            "label": "[PRE-8-RQ-02]",
            "parent": "[PRE-8]",
            "type": "RQ",
            "info": "For each identified hardware component as per [PRE-8-RQ-01], the following information shall be recorded:\n- hardware producer;\n- component name;\n- component identifier;\n- if applicable, firmware version.",
            "display_title": "Required information"
        }
    },
    {
        "data": {
            "id": "[PRE-9]",
            "label": "[PRE-9]",
            "parent": "[PRE]",
            "type": "CHAPTER",
            "info": "Regular testing and review are necessary to maintain a product's security. Depending on the risks associated with the product's use, specific activities such as regular vulnerability scanning and other testing and review should be planned. This plan, including the schedule and actions, is needed for the security maintenance of a product, taking into account the product's context.",
            "display_title": "Planning regular test and reviews"
        }
    },
    {
        "data": {
            "id": "[PRE-9-RQ-01]",
            "label": "[PRE-9-RQ-01]",
            "parent": "[PRE-9]",
            "type": "RQ",
            "info": "A risk-based security test and review plan shall be created. The plan shall include schedules and frequency of specific tests and reviews, and be appropriate to the assessed risks of the use of the product.",
            "display_title": "Review planning"
        }
    },
    {
        "data": {
            "id": "[PRE-9-RQ-02]",
            "label": "[PRE-9-RQ-02]",
            "parent": "[PRE-9]",
            "type": "RQ",
            "info": "A security test and review plan shall consider at least the following aspects:\n- product context;\n- cybersecurity architecture and design;\n- product cybersecurity requirements;\n- risk assessment;\n- test cases and test methodologies.",
            "display_title": "Scope"
        }
    },
    {
        "data": {
            "id": "[PRE-9-RQ-03]",
            "label": "[PRE-9-RQ-03]",
            "parent": "[PRE-9]",
            "type": "RQ",
            "info": "Security reviews shall consider at least the following sources:\n- standards and publications describing the state-of-the-art in cybersecurity;\n- changes in the threat landscape applicable to the product;\n- vulnerabilities found in the product and its components;\n- vulnerabilities found in similar products and their components; or\n- information about the practical conditions of use as obtained by customer feedback, for example, due to support cases.",
            "display_title": "Sources"
        }
    },
    {
        "data": {
            "id": "[PRE-9-RQ-04]",
            "label": "[PRE-9-RQ-04]",
            "parent": "[PRE-9]",
            "type": "RQ",
            "info": "A security test and review plan shall be maintained based on the results of performed tests and reviews.",
            "display_title": "Maintenance"
        }
    },
    {
        "data": {
            "id": "[PRE-10]",
            "label": "[PRE-10]",
            "parent": "[PRE]",
            "type": "CHAPTER",
            "info": "This subclause clarifies the preparation steps that enable the manufacturer to provide information and distribute security updates. The update mechanisms can include both manual and/or (semi-)automatic updates.\n\nThese mechanisms include, for example, websites for publishing information and the infrastructure required to enable automatic security update distribution.",
            "display_title": "Mechanisms for distribution"
        }
    },
    {
        "data": {
            "id": "[PRE-10-RQ-01]",
            "label": "[PRE-10-RQ-01]",
            "parent": "[PRE-10]",
            "type": "RQ",
            "info": "A mechanism shall be provided to distribute security updates in a secure manner in accordance with prEN 40000-1-2:2025, 7.7.2.",
            "display_title": "Secure update"
        }
    },
    {
        "data": {
            "id": "[PRE-10-RQ-02]",
            "label": "[PRE-10-RQ-02]",
            "parent": "[PRE-10]",
            "type": "RQ",
            "info": "A mechanism for the distribution of security information for the product shall be provided.",
            "display_title": "Advisory"
        }
    },
    {
        "data": {
            "id": "[PRE-10-RQ-03]",
            "label": "[PRE-10-RQ-03]",
            "parent": "[PRE-10]",
            "type": "RQ",
            "info": "Where applicable, mechanisms for automatic distribution of security updates for product shall be provided.",
            "display_title": "Automation"
        }
    },
    {
        "data": {
            "id": "[RCP]",
            "label": "[RCP]",
            "parent": null,
            "type": "ROOT_CONTAINER",
            "info": "The receipt phase outlines requirements for monitoring both internal and external sources, as well as for receiving vulnerability reports, including those derived from testing and monitoring, submitted by various stakeholders.\n\nIn this phase, the manufacturer actively monitors publicly available sources for vulnerability disclosures or information that may affect its products. Upon receiving relevant vulnerability reports or information, the data are compared against the SBOM and the list of hardware components integrated in the product. By cross-referencing these sources, the manufacturer can efficiently identify any potentially affected components or products.\n\nThis phase also covers the initial assessment activities needed to identify potentially affected components. Essential to this includes activities related to regular tests and internal reviews to proactively discover new vulnerabilities.",
            "display_title": "Receipt"
        }
    },
    {
        "data": {
            "id": "[RCP-1]",
            "label": "[RCP-1]",
            "parent": "[RCP]",
            "type": "CHAPTER",
            "info": "The purpose of establishing the capability to receive vulnerability reports and related information is to provide researchers, users, and other interested stakeholders with mechanisms for timely reporting that are available and accessible. Publicly available reporting interfaces considering different sensory channels are essential to facilitate the prompt sharing of vulnerability information.",
            "display_title": "Capability to receive reports"
        }
    },
    {
        "data": {
            "id": "[RCP-1-RQ-01]",
            "label": "[RCP-1-RQ-01]",
            "parent": "[RCP-1]",
            "type": "RQ",
            "info": "A publicly accessible reporting mechanism facilitating accessible modes as per [PRE-2-RC-01] shall be provided to enable the receipt of vulnerability information or reports.",
            "display_title": "Public reporting mechanism"
        }
    },
    {
        "data": {
            "id": "[RCP-1-RQ-02]",
            "label": "[RCP-1-RQ-02]",
            "parent": "[RCP-1]",
            "type": "RQ",
            "info": "A mechanism shall be in place to track reported vulnerabilities with the use of an identifier or tracking number.",
            "display_title": "Unique identifier"
        }
    },
    {
        "data": {
            "id": "[RCP-1-RQ-03]",
            "label": "[RCP-1-RQ-03]",
            "parent": "[RCP-1]",
            "type": "RQ",
            "info": "A receipt of a potential vulnerability report shall be acknowledged within a time frame that is established and declared based on the coordinated vulnerability disclosure policy.",
            "display_title": "Acknowledgement"
        }
    },
    {
        "data": {
            "id": "[RCP-1-RC-01]",
            "label": "[RCP-1-RC-01]",
            "parent": "[RCP-1]",
            "type": "RC",
            "info": "Reports should be accepted even if they use less secure mechanisms as provided by [PRE-5]",
            "display_title": "Acceptance"
        }
    },
    {
        "data": {
            "id": "[RCP-2]",
            "label": "[RCP-2]",
            "parent": "[RCP]",
            "type": "CHAPTER",
            "info": "This subclause outlines the monitoring activities for gathering vulnerability information. It involves tracking public sources and receiving information from private sources to identify potential vulnerabilities that could impact the product.",
            "display_title": "Monitoring"
        }
    },
    {
        "data": {
            "id": "[RCP-2-RQ-01]",
            "label": "[RCP-2-RQ-01]",
            "parent": "[RCP-2]",
            "type": "RQ",
            "info": "Vulnerability information or reports from internal and external sources shall be monitored.",
            "display_title": "Sources"
        }
    },
    {
        "data": {
            "id": "[RCP-2-RQ-02]",
            "label": "[RCP-2-RQ-02]",
            "parent": "[RCP-2]",
            "type": "RQ",
            "info": "The minimum list of sources that shall be used is:\nExternal sources\n- EU Vulnerability Database\n- Reported vulnerabilities [RCP-1]\nInternal sources\n- Regular testing [RCP-6]\n- Regular review [RCP-7]",
            "display_title": "Requires sources"
        }
    },
    {
        "data": {
            "id": "[RCP-2-RQ-03]",
            "label": "[RCP-2-RQ-03]",
            "parent": "[RCP-2]",
            "type": "RQ",
            "info": "The list of third-party components shall be monitored for end of support and usage.",
            "display_title": "Third-party components"
        }
    },
    {
        "data": {
            "id": "[RCP-3]",
            "label": "[RCP-3]",
            "parent": "[RCP]",
            "type": "CHAPTER",
            "info": "This clause describes the activities for comparing the product's identified software components with incoming vulnerability information. Optionally, it is possible to automate this using the SBOM.",
            "display_title": "Potentially impacted software components"
        }
    },
    {
        "data": {
            "id": "[RCP-3-RQ-01]",
            "label": "[RCP-3-RQ-01]",
            "parent": "[RCP-3]",
            "type": "RQ",
            "info": "Potentially affected software components shall be identified based on vulnerability information collected from [RCP-2]",
            "display_title": "Scope"
        }
    },
    {
        "data": {
            "id": "[RCP-4]",
            "label": "[RCP-4]",
            "parent": "[RCP]",
            "type": "CHAPTER",
            "info": "This subclause describes the activities for comparing the product's hardware component list with received vulnerability reports to identify potentially impacted hardware components.",
            "display_title": "Potentially impacted hardware components"
        }
    },
    {
        "data": {
            "id": "[RCP-4-RQ-01]",
            "label": "[RCP-4-RQ-01]",
            "parent": "[RCP-4]",
            "type": "RQ",
            "info": "Potentially affected hardware components shall be identified based on vulnerability information collected from 5.4.3.",
            "display_title": "Scope"
        }
    },
    {
        "data": {
            "id": "[RCP-5]",
            "label": "[RCP-5]",
            "parent": "[RCP]",
            "type": "CHAPTER",
            "info": "The purpose of this phase is to support transparent, timely communication by actively engaging with a coordinator. While optional, a coordinator is especially helpful when vulnerabilities affect multiple manufacturers or when direct communication between the stakeholders is complex or not feasible.",
            "display_title": "Coordinator involvement"
        }
    },
    {
        "data": {
            "id": "[RCP-5-RC-01]",
            "label": "[RCP-5-RC-01]",
            "parent": "[RCP-5]",
            "type": "RC",
            "info": "A coordinator should be assigned and involved in the vulnerability handling process, where appropriate.",
            "display_title": "Responsibilities"
        }
    },
    {
        "data": {
            "id": "[RCP-6]",
            "label": "[RCP-6]",
            "parent": "[RCP]",
            "type": "CHAPTER",
            "info": "Regular testing helps maintain the security posture. Some testing methods are described in prEN 40000-1-2:2025, 7.6. The selection of appropriate tests and their schedules are dependent upon the product risk-based criteria related to the potential negative impact of vulnerabilities on the product's security posture over time, as documented in [PRE-9].",
            "display_title": "Performing regular tests"
        }
    },
    {
        "data": {
            "id": "[RCP-6-RQ-01]",
            "label": "[RCP-6-RQ-01]",
            "parent": "[RCP-6]",
            "type": "RQ",
            "info": "Security testing shall be performed according to the security test and review plan.",
            "display_title": "Execution"
        }
    },
    {
        "data": {
            "id": "[RCP-7]",
            "label": "[RCP-7]",
            "parent": "[RCP]",
            "type": "CHAPTER",
            "info": "Maintaining a product's security is an ongoing task. This includes performing security tests throughout the product's support period. It also includes activities to reassess the threats and risks posed to the product due to changes in cybersecurity attack techniques or the way the product is used in practical conditions.\n\nThe needs regarding these regular tests and reviews depend on the type of product and its use. A simple product developed on demand for a specific customer and purpose, as an individual unit, might require very few actions, while a more complex product supplied in large quantities for exposure to the Internet might require stringent monitoring.\n\nThe security risk a product is exposed to is not static. It changes as attack methods or the threat landscape evolves. This can, for example, include knowledge of cryptographic algorithms' strengths.\n\nIt can also turn out that the product context is not correctly described. For example, the product's use or operational environment may differ from the description during practical use.",
            "display_title": "Performing regular reviews"
        }
    },
    {
        "data": {
            "id": "[RCP-7-RQ-01]",
            "label": "[RCP-7-RQ-01]",
            "parent": "[RCP-7]",
            "type": "RQ",
            "info": "Security reviews shall be performed according to the security test and review plan.",
            "display_title": "Execution"
        }
    },
    {
        "data": {
            "id": "[RCP-7-RQ-02]",
            "label": "[RCP-7-RQ-02]",
            "parent": "[RCP-7]",
            "type": "RQ",
            "info": "The assumptions and all inputs of the product cybersecurity risk assessment shall be reviewed periodically (at least once a year), even if the product design does not change.",
            "display_title": "Maintenance"
        }
    },
    {
        "data": {
            "id": "[VRF]",
            "label": "[VRF]",
            "parent": null,
            "type": "ROOT_CONTAINER",
            "info": "The verification phase, often referred to as triage, includes requirements for determining whether the reported vulnerability affects the product. It also includes requirements for prioritizing the vulnerability based on vulnerability risk assessment activities.\nThe primary objective of this phase is to assess the validity, reproducibility, and applicability of the reported vulnerability. During this phase, the received information is reviewed to determine whether it is complete and whether the vulnerability is genuine and applicable to the product in question.\n\nIf a vulnerability is assessed as relevant, the security risk analysis is performed to determine whether the risk associated with the vulnerability is to be mitigated and, if so, with what priority\n\nNote: Whereas [VRF-1] Initial assessment and verification and [VRF-2] Vulnerability risk assessment are separated, all the activities listed can occur in parallel rather than in a sequential order.",
            "display_title": "Verification"
        }
    },
    {
        "data": {
            "id": "[VRF-1]",
            "label": "[VRF-1]",
            "parent": "[VRF]",
            "type": "CHAPTER",
            "info": "The clause describes the initial assessment and verification of the vulnerability report. The primary objective of this phase is to assess the validity, reproducibility, and applicability of reported vulnerabilities. The manufacturer evaluates the credibility and information provided in the report, attempts to reproduce the issue, assesses its impact on the affected product, and assesses the severity of the vulnerability. This step ensures that only verified vulnerabilities proceed to the security risk assessment.",
            "display_title": "Initial assessment and verification"
        }
    },
    {
        "data": {
            "id": "[VRF-1-RQ-01]",
            "label": "[VRF-1-RQ-01]",
            "parent": "[VRF-1]",
            "type": "RQ",
            "info": "More information shall be requested from the reporter if the available information is insufficient",
            "display_title": "Completude"
        }
    },
    {
        "data": {
            "id": "[VRF-1-RQ-02]",
            "label": "[VRF-1-RQ-02]",
            "parent": "[VRF-1]",
            "type": "RQ",
            "info": "An assessment of the vulnerability shall be performed.",
            "display_title": "Execution"
        }
    },
    {
        "data": {
            "id": "[VRF-2]",
            "label": "[VRF-2]",
            "parent": "[VRF]",
            "type": "CHAPTER",
            "info": "This clause describes the activities of conducting a risk assessment to determine the potential risk posed by a verified vulnerability, thereby prioritizing the vulnerability handling process. The risk assessment is based on the product\u2019s established risk management framework, ensuring that the results are consistent with the overall risk evaluation methodology applied to the product prEN 40000-1-2.",
            "display_title": "Vulnerability risk assessment"
        }
    },
    {
        "data": {
            "id": "[VRF-2-RQ-01]",
            "label": "[VRF-2-RQ-01]",
            "parent": "[VRF-2]",
            "type": "RQ",
            "info": "The risk introduced by the vulnerability shall be assessed in accordance with prEN 40000-1-2:2025, 6.4.",
            "display_title": "Execution"
        }
    },
    {
        "data": {
            "id": "[VRF-2-RQ-02]",
            "label": "[VRF-2-RQ-02]",
            "parent": "[VRF-2]",
            "type": "RQ",
            "info": "The priority shall be assigned to the vulnerability based on the risk assessment referenced in [VRF-2-RQ-01] and the product risk profile.",
            "display_title": "Prioritisation"
        }
    },
    {
        "data": {
            "id": "[VRF-2-RQ-03]",
            "label": "[VRF-2-RQ-03]",
            "parent": "[VRF-2]",
            "type": "RQ",
            "info": "If the determination of the risk of the vulnerability as per [VRF-2-RQ-02] exceeds the defined threshold by the manufacturer's risk assessment, the resolution of the vulnerability shall be expedited.",
            "display_title": "Fast track"
        }
    },
    {
        "data": {
            "id": "[VRF-2-RQ-04]",
            "label": "[VRF-2-RQ-04]",
            "parent": "[VRF-2]",
            "type": "RQ",
            "info": "If the vulnerability information source is from a coordinated vulnerability disclosure, then the reporter shall be informed about the results of the verification .",
            "display_title": "Communication"
        }
    },
    {
        "data": {
            "id": "[RMD]",
            "label": "[RMD]",
            "parent": null,
            "type": "ROOT_CONTAINER",
            "info": "This phase includes decision making activities to mitigate cybersecurity risks associated with the verified vulnerability. This includes identifying appropriate fixes, planning, development, testing for effectiveness and compatibility, and preparing updates or mitigations for deployment.",
            "display_title": "Remediation"
        }
    },
    {
        "data": {
            "id": "[RMD-1]",
            "label": "[RMD-1]",
            "parent": "[RMD]",
            "type": "CHAPTER",
            "info": "This phase includes the decision-making activities for mitigating the cybersecurity risks related to the verified vulnerability. It involves selecting and assessing risk remediation measures, evaluating their feasibility, and considering the potential impact on the product, users, and other stakeholders. Based on this analysis, the manufacturer determines the most appropriate remediation, which can include an update, intermediate mitigation, or a justified decision to defer or decline remediation.",
            "display_title": "Remediation decision"
        }
    },
    {
        "data": {
            "id": "[RMD-1-RQ-01]",
            "label": "[RMD-1-RQ-01]",
            "parent": "[RMD-1]",
            "type": "RQ",
            "info": "A decision on how to remediate the vulnerability shall be taken.",
            "display_title": "Execution"
        }
    },
    {
        "data": {
            "id": "[RMD-1-RQ-02]",
            "label": "[RMD-1-RQ-02]",
            "parent": "[RMD-1]",
            "type": "RQ",
            "info": "In accordance with the decision in [RMD-1-RQ-01], subsequent actions shall be planned, including the definition of the timeline for the remediation.",
            "display_title": "Planning"
        }
    },
    {
        "data": {
            "id": "[RMD-2]",
            "label": "[RMD-2]",
            "parent": "[RMD]",
            "type": "CHAPTER",
            "info": "After the decision to remediate a particular vulnerability has been taken and planned, it is essential to perform the activities that produce the remediation. During these activities, the manufacturer could produce updates, documentation, or configuration changes, as appropriate, to address a vulnerability.\n\nThese activities can involve third parties, including suppliers and open-source projects, to coordinate the development or source existing remediation.",
            "display_title": "Remediation development"
        }
    },
    {
        "data": {
            "id": "[RMD-2-RQ-01]",
            "label": "[RMD-2-RQ-01]",
            "parent": "[RMD-2]",
            "type": "RQ",
            "info": "The remediation shall be produced.",
            "display_title": "Execution"
        }
    },
    {
        "data": {
            "id": "[RMD-2-RQ-02]",
            "label": "[RMD-2-RQ-02]",
            "parent": "[RMD-2]",
            "type": "RQ",
            "info": "Security updates shall be provided separately from functional updates, where technically feasible.",
            "display_title": "Separating security and functional updates"
        }
    },
    {
        "data": {
            "id": "[RMD-3]",
            "label": "[RMD-3]",
            "parent": "[RMD]",
            "type": "CHAPTER",
            "info": "This subclause describes the activities to develop and perform appropriate tests to ensure that the risks associated with a vulnerability are mitigated without a negative impact on the product or users.",
            "display_title": "Remediation test"
        }
    },
    {
        "data": {
            "id": "[RMD-3-RQ-01]",
            "label": "[RMD-3-RQ-01]",
            "parent": "[RMD-3]",
            "type": "RQ",
            "info": "The remediation shall be tested to ensure the risks related to the vulnerability are mitigated and the impact on the product and the users is acceptable.",
            "display_title": "Execution"
        }
    },
    {
        "data": {
            "id": "[RLS]",
            "label": "[RLS]",
            "parent": null,
            "type": "ROOT_CONTAINER",
            "info": "The release phase includes requirements for deploying and sharing remediation, describing associated changes, and disseminating remediation information to relevant stakeholders.",
            "display_title": "Release"
        }
    },
    {
        "data": {
            "id": "[RLS-1]",
            "label": "[RLS-1]",
            "parent": "[RLS]",
            "type": "CHAPTER",
            "info": "This subclause addresses the activities of gathering all the artefacts to address vulnerabilities and disseminating security updates.\n\nAny delay in applying security updates gives attackers time to exploit the product's vulnerabilities. Therefore, the timely distribution of security updates is essential. A secure update distribution mechanism ensures the integrity and authenticity of security updates. An automatic update distribution mechanism ensures that vulnerabilities are remediated without user interaction for the products that support automatic updates.\n\nSuch updates need to be provided in a secure manner, which might, for example, use digital signatures and/or secure download services.\n\nSecurity updates are to be applied automatically or manually depending on the type of product, its technical implementation, its intended purpose, and its reasonably foreseeable use.\n\nProviding security updates that do not change the product's other functionality reduces the risk of unintended or unwanted operational impacts in the user's environment. On the other hand, some remediations require significant changes that cannot be implemented without larger interventions into the product.",
            "display_title": "Security update release"
        }
    },
    {
        "data": {
            "id": "[RLS-1-RQ-01]",
            "label": "[RLS-1-RQ-01]",
            "parent": "[RLS-1]",
            "type": "RQ",
            "info": "Security updates shall be provided, unless otherwise agreed between a manufacturer and a business user in relation to a tailor-made product with digital elements, free of charge.",
            "display_title": "Free update"
        }
    },
    {
        "data": {
            "id": "[RLS-1-RQ-02]",
            "label": "[RLS-1-RQ-02]",
            "parent": "[RLS-1]",
            "type": "RQ",
            "info": "Once a security update is provisioned, it shall be distributed in a timely manner.",
            "display_title": "Timely distribution"
        }
    },
    {
        "data": {
            "id": "[RLS-1-RQ-03]",
            "label": "[RLS-1-RQ-03]",
            "parent": "[RLS-1]",
            "type": "RQ",
            "info": "Installation instructions shall be provided for security updates unless distribution is fully automated.",
            "display_title": "Required information"
        }
    },
    {
        "data": {
            "id": "[RLS-1-RQ-04]",
            "label": "[RLS-1-RQ-04]",
            "parent": "[RLS-1]",
            "type": "RQ",
            "info": "The mechanisms to distribute security updates shall ensure their authenticity and integrity.",
            "display_title": "Security"
        }
    },
    {
        "data": {
            "id": "[RLS-2]",
            "label": "[RLS-2]",
            "parent": "[RLS]",
            "type": "CHAPTER",
            "info": "This phase describes a process for publishing information about resolved vulnerabilities and the distribution of corresponding security updates. It includes detailed guidance on communication, publication, and coordination with users and other stakeholders. Publications such as advisories or release notes provide clear, comprehensive documentation to help understand the nature of the vulnerabilities and manage associated risks effectively.",
            "display_title": "Release information"
        }
    },
    {
        "data": {
            "id": "[RLS-2-RQ-01]",
            "label": "[RLS-2-RQ-01]",
            "parent": "[RLS-2]",
            "type": "RQ",
            "info": "Information of fixed vulnerabilities shall be published in accordance with the policy on coordinating vulnerability disclosure (CVD) as required by [PRE-2-RQ-01], and where appropriate, this information can be summarized or aggregated.",
            "display_title": "Alignment"
        }
    },
    {
        "data": {
            "id": "[RLS-2-RQ-02]",
            "label": "[RLS-2-RQ-02]",
            "parent": "[RLS-2]",
            "type": "RQ",
            "info": "The publication shall contain at least, but not limited to, the following information to enable the target audience to decide if the vulnerabilities are relevant and how to remediate them:\n- description of the vulnerability;\n- vulnerability identifier;\n- information allowing the identification of the affected product;\n- potential impact of the vulnerability;\n- severity of the vulnerability;\n- detailed information on how to remediate the vulnerability;\n- release date and update date.",
            "display_title": "Required information"
        }
    },
    {
        "data": {
            "id": "[RLS-2-RQ-03]",
            "label": "[RLS-2-RQ-03]",
            "parent": "[RLS-2]",
            "type": "RQ",
            "info": "Information regarding fixed vulnerabilities shall be made available in a human-readable format.",
            "display_title": "Accessibility"
        }
    },
    {
        "data": {
            "id": "[RLS-2-RQ-03-RE]",
            "label": "[RLS-2-RQ-03-RE]",
            "parent": "[RLS-2]",
            "type": "RQ",
            "info": "Information regarding fixed vulnerabilities shall be made available in a widely recognized machine-readable format.",
            "display_title": "Machine-readable format"
        }
    },
    {
        "data": {
            "id": "[RLS-2-PM-01]",
            "label": "[RLS-2-PM-01]",
            "parent": "[RLS-2]",
            "type": "PM",
            "info": "To give sufficient time to distribute the security update, full publication according to [RLS-2-RQ-02] may be delayed if all the following conditions apply:\n- An evaluation determines that the security risks of full publication outweigh the security benefits.\n- Information about a vulnerability fixed by the security update is made available to users in such a way that an attacker could not use this information to exploit the vulnerability.\n- Product users are informed about the date of public disclosure of all vulnerability information, as required per [RLS-2-RQ-02].",
            "display_title": "Delayed disclosure"
        }
    },
    {
        "data": {
            "id": "[RLS-2-RC-01]",
            "label": "[RLS-2-RC-01]",
            "parent": "[RLS-2]",
            "type": "RC",
            "info": "Vulnerability information from [RLS-2-RQ-01] should be made publicly available on the EU Vulnerability Database (EUVD).",
            "display_title": "EUVD publication"
        }
    },
    {
        "data": {
            "id": "[PRA]",
            "label": "[PRA]",
            "parent": null,
            "type": "ROOT_CONTAINER",
            "info": "The post-release phase focuses on activities that occur after the remediation and release of a vulnerability. It includes requirements for monitoring released security updates, capturing lessons learned, and reflecting on the post-release process to inform and improve future development practices.",
            "display_title": "Post-release"
        }
    },
    {
        "data": {
            "id": "[PRA-1]",
            "label": "[PRA-1]",
            "parent": "[PRA]",
            "type": "CHAPTER",
            "info": "This phase is crucial for ensuring the ongoing quality and effectiveness of the remediation. The manufacturer has the discretion to apply this action in a way that enables continuous improvement of their product-related processes.",
            "display_title": "Post-release actions"
        }
    },
    {
        "data": {
            "id": "[PRA-1-RQ-01]",
            "label": "[PRA-1-RQ-01]",
            "parent": "[PRA-1]",
            "type": "RQ",
            "info": "Post-release actions shall be carried out, including:\n- Case maintenance\n- Monitoring of remediation",
            "display_title": "Execution"
        }
    },
    {
        "data": {
            "id": "prEN 40000-1-2",
            "label": "prEN 40000-1-2",
            "parent": null,
            "type": "EXTERNAL_ROOT",
            "info": "prEN 40000-1-2 specifies general cybersecurity principles and general risk management activities for all products with digital elements, hereafter also referred to as 'products'. It covers every stage of the product lifecycle to ensure and maintain an appropriate level of cybersecurity based on the risks.\nprEN 40000-1-2 also provides generic elements to support the development of coherent product-category-specific standards (vertical standards).",
            "display_title": "Cybersecurity requirements for products with digital elements Part 1-2: Principles for cyber resilience"
        }
    },
    {
        "data": {
            "id": "40000-1-2/6.2",
            "label": "prEN 40000-1-2 6.2",
            "parent": "prEN 40000-1-2",
            "type": "EXTERNAL_LEAF",
            "info": "Establishing the product context determines the starting point for the assessment and treatment of risks. This is an iterative task as changes to the product during development can cause the product context to change.",
            "display_title": "Product Context"
        }
    },
    {
        "data": {
            "source": "[APP]",
            "target": "40000-1-2/6.2",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "id": "40000-1-2/6.4",
            "label": "prEN 40000-1-2 6.4",
            "parent": "prEN 40000-1-2",
            "type": "EXTERNAL_LEAF",
            "info": "The risk assessment is based on the products' context and the risk assessment results in an evaluation of identified risks.\nThe assessment of risks includes:\n- an identification of the assets and cybersecurity objectives;\n- an identification of the threats;\n- an estimation of the risks;\n- an evaluation of the risks.",
            "display_title": "Risk assessment"
        }
    },
    {
        "data": {
            "source": "[APP]",
            "target": "40000-1-2/6.4",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[APP-1]",
            "target": "[PRE-9]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[PRE-1-RC-01]",
            "target": "[PRE-1-RQ-01]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[PRE-1-RQ-02]",
            "target": "[RMD]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[PRE-1-RQ-02]",
            "target": "[VRF-1]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[PRE-1-RQ-02]",
            "target": "[PRE-9]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[PRE-1-RC-02]",
            "target": "[PRE-5]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[PRE-1-RC-02]",
            "target": "[PRE-7]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[PRE-1-RC-02]",
            "target": "[PRE-8]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[PRE-1-RQ-05]",
            "target": "[PRE-2]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[PRE-2-RQ-03]",
            "target": "[PRE-4]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[PRE-2-RC-02]",
            "target": "[PRE-5]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "id": "40000-1-2/6.6",
            "label": "prEN 40000-1-2 6.6",
            "parent": "prEN 40000-1-2",
            "type": "EXTERNAL_LEAF",
            "info": "Risk communication refers to providing information on risks related to the product based on the product context.\nIt is necessary to clearly communicate all relevant risks transferred to the relevant stakeholder, as well as the actions and measures expected of the stakeholder to mitigate these risks. Where appropriately this communication considers accessibility aspects (e.g. simple language, multi-modal formats). This ensures that the stakeholder has the capability to take appropriate actions to mitigate those risks and securely use the product according to the product context.",
            "display_title": "Risk communication"
        }
    },
    {
        "data": {
            "source": "[PRE-4-RQ-02]",
            "target": "40000-1-2/6.6",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[PRE-5]",
            "target": "[RCP-1]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[PRE-5-RQ-01-RE]",
            "target": "[RCP-1]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[PRE-6-RQ-02]",
            "target": "[PRE-6-RQ-01]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[PRE-7]",
            "target": "[PRE-6]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[PRE-7]",
            "target": "40000-1-2/6.4",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "id": "40000-1-2/7.4",
            "label": "prEN 40000-1-2 7.4",
            "parent": "prEN 40000-1-2",
            "type": "EXTERNAL_LEAF",
            "info": "The secure architecture and the functional design of the product are based on the cybersecurity requirements as defined in 7.3 and the product context as defined in 6.2.\nConsider the following for the product cybersecurity architecture and design:\n- introduce trust boundaries between components and subsystems including RDPS, to ensure clear separation of privileges and responsibilities, as well as containment;\n- secure interface design, with particular attention to authentication, input validation, and minimization of the exposed attack surface.",
            "display_title": "Cybersecurity architecture and design"
        }
    },
    {
        "data": {
            "source": "[PRE-7]",
            "target": "40000-1-2/7.4",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[PRE-7-RQ-02]",
            "target": "[PRE-7-RQ-01]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[PRE-7-RQ-03]",
            "target": "[PRE-7-RQ-01]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[PRE-7-RQ-03-RE]",
            "target": "[PRE-7-RQ-01]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[PRE-7-RQ-07]",
            "target": "[PRE-7-RQ-02]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[PRE-8]",
            "target": "40000-1-2/6.4",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[PRE-8]",
            "target": "40000-1-2/7.4",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[PRE-9]",
            "target": "40000-1-2/6.2",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[PRE-9]",
            "target": "40000-1-2/6.4",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "id": "40000-1-2/7.3",
            "label": "prEN 40000-1-2 7.3",
            "parent": "prEN 40000-1-2",
            "type": "EXTERNAL_LEAF",
            "info": "The product cybersecurity requirements:\n- are managed throughout the product lifecycle, in line with the management of cybersecurity risks, in particular the assessment and treatment of product cybersecurity risks; and\n- are based on the needs and expectations of stakeholders relevant to the product, as well as regulatory product requirements such as those of the CRA.\nIn addition, the identification and formulation of product cybersecurity requirements typically consider:\n- the traceability, validity, understandability and verifiability of product cybersecurity technical specifications;\n- the cybersecurity properties of the product’s environment during development and production.\nThese requirements can then be fulfilled through the implementation of specific cybersecurity controls, typically selected from different catalogues.",
            "display_title": "Product cybersecurity requirements"
        }
    },
    {
        "data": {
            "source": "[PRE-9]",
            "target": "40000-1-2/7.3",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[PRE-9]",
            "target": "40000-1-2/7.4",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "id": "40000-1-2/7.6",
            "label": "prEN 40000-1-2 7.6",
            "parent": "prEN 40000-1-2",
            "type": "EXTERNAL_LEAF",
            "info": "The goal of cybersecurity verification and validation (V&V) is to ensure that the concept, design and implementation of a product satisfy all respective cybersecurity requirements, and that the product is sufficiently cybersecure considering its context.\nV&V is crucial for detecting potential cybersecurity defects (such as coding mistakes, configuration errors, or design flaws) that could be exploited by malicious actors. Through V&V, the manufacturer identifies and mitigates or eliminates these vulnerabilities before the product is deployed or released, thereby reducing the risk of successful cyberattacks.",
            "display_title": "Cybersecurity verification and validation"
        }
    },
    {
        "data": {
            "source": "[PRE-9]",
            "target": "40000-1-2/7.6",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[PRE-9-RQ-01]",
            "target": "40000-1-2/7.6",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "id": "40000-1-2/7.7.2",
            "label": "prEN 40000-1-2 7.7.2",
            "parent": "prEN 40000-1-2",
            "type": "EXTERNAL_LEAF",
            "info": "Digital production relates to activities for the production of software products and software updates, including compiling, building, packaging, and preparing software artefacts for distribution through digital channels.\nActivities in the secure digital production process ensure that digital products are protected from manipulation by external actors during digital distribution (for instance, via an online hosting platform such as an app store).\nFollow the measures defined in 7.6 to ensure that information supporting the product is complete, accurate and written in an appropriate language before distribution",
            "display_title": "Digital production"
        }
    },
    {
        "data": {
            "source": "[PRE-10-RQ-01]",
            "target": "40000-1-2/7.7.2",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[RCP-1]",
            "target": "[PRE-5-RQ-01-RE]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[RCP-1-RQ-01]",
            "target": "[PRE-2-RC-01]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[RCP-1-RC-01]",
            "target": "[PRE-5]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[RCP-2]",
            "target": "[VRF-1]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[RCP-2]",
            "target": "[PRA-1-RQ-01]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[RCP-2-RQ-02]",
            "target": "[RCP-1]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[RCP-2-RQ-02]",
            "target": "[RCP-6]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[RCP-2-RQ-02]",
            "target": "[RCP-7]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[RCP-3]",
            "target": "[RCP-2]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[RCP-3]",
            "target": "[PRE-7]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[RCP-3-RQ-01]",
            "target": "[RCP-2]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[RCP-4]",
            "target": "[RCP-2]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[RCP-4]",
            "target": "[PRE-8]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[RCP-4-RQ-01]",
            "target": "[RCP-2]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[RCP-6]",
            "target": "40000-1-2/7.6",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[RCP-6]",
            "target": "[PRE-9]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[RCP-6-RQ-01]",
            "target": "40000-1-2/7.6",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[RCP-7]",
            "target": "40000-1-2/6.2",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[RCP-7]",
            "target": "40000-1-2/6.4",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[RCP-7]",
            "target": "40000-1-2/7.4",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "id": "40000-1-2/6.7",
            "label": "prEN 40000-1-2 6.7",
            "parent": "prEN 40000-1-2",
            "type": "EXTERNAL_LEAF",
            "info": "It is important to review and, if necessary, update the elements of risk management to address potential changes in the threat landscape and state of the art. This review can be triggered by the observation that the threat landscape has changed or can be done on a regular basis if required.\nReview of the risk assessment helps to create awareness of potential cybersecurity issues.",
            "display_title": "Risk monitoring and review"
        }
    },
    {
        "data": {
            "source": "[RCP-7-RQ-01]",
            "target": "40000-1-2/6.7",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[RCP-7-RQ-02]",
            "target": "40000-1-2/6.7",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "id": "40000-1-2/7.2",
            "label": "prEN 40000-1-2 7.2",
            "parent": "prEN 40000-1-2",
            "type": "EXTERNAL_LEAF",
            "info": "Cybersecurity planning involves describing the cybersecurity activities for a product throughout its lifecycle. Relevant activities are found in Clause 6 and Clause 7. Many activities are interrelated. Changes in one activity can affect others.",
            "display_title": "Product cybersecurity planning"
        }
    },
    {
        "data": {
            "source": "[RCP-7-RQ-02]",
            "target": "40000-1-2/7.2",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[VRF-1]",
            "target": "[PRE-7]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[VRF-1]",
            "target": "[PRE-8]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[VRF-1]",
            "target": "[RCP-2]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[VRF-1]",
            "target": "40000-1-2/6.2",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[VRF-1]",
            "target": "40000-1-2/6.4",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[VRF-1]",
            "target": "40000-1-2/7.4",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[VRF-2]",
            "target": "40000-1-2/6.4",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[VRF-2-RQ-01]",
            "target": "40000-1-2/6.4",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[VRF-2-RQ-02]",
            "target": "[VRF-2-RQ-01]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[VRF-2-RQ-03]",
            "target": "[VRF-2-RQ-02]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[RMD-1]",
            "target": "[VRF-2]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[RMD-1-RQ-02]",
            "target": "[RMD-1-RQ-01]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "id": "40000-1-2/7",
            "label": "prEN 40000-1-2 7",
            "parent": "prEN 40000-1-2",
            "type": "EXTERNAL_LEAF",
            "info": "Product cybersecurity activities are intended to be process agnostic. There are logical connections between activities: some are prerequisites for others but, with certain development methodologies (including agile approaches), the activities in this clause can be executed concurrently or in any order. Furthermore, many activities can be revisited at relevant points or regular intervals as a change in one can imply changes in several others. In that case, it is necessary to document the dependencies between process activities.",
            "display_title": "Cybersecurity activities"
        }
    },
    {
        "data": {
            "source": "[RMD-2-RQ-01]",
            "target": "40000-1-2/7",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[RMD-3-RQ-01]",
            "target": "40000-1-2/7.6",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[RLS-1]",
            "target": "[RMD-3]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[RLS-1-RQ-02]",
            "target": "[VRF-2]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "id": "40000-1-2/7.7",
            "label": "prEN 40000-1-2 7.7",
            "parent": "prEN 40000-1-2",
            "type": "EXTERNAL_LEAF",
            "info": "Secure Production & Distribution activities ensure that the cybersecurity risks to the product are managed throughout the manufacturing and distribution process. These activities address the cybersecurity risks associated with producing and distributing the product.\nFor software products delivered digitally, this includes ensuring that the integrity and authenticity of the software is protected during delivery to the user.\nFor hardware products, or software products placed on the market with a hardware component, such as a gaming system disk or memory card, measures are needed to ensure that the components and data are protected from manipulation from the time of release from the development team, during the entire manufacturing process, and until the product is delivered to the user.\nA secure production control plan can support secure production activities.",
            "display_title": "Secure production and distribution"
        }
    },
    {
        "data": {
            "source": "[RLS-1-RQ-02]",
            "target": "40000-1-2/7.7",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[RLS-2]",
            "target": "[RMD-3]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[RLS-2-RQ-01]",
            "target": "[PRE-2-RQ-01]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[RLS-2-PM-01]",
            "target": "[RLS-2-RQ-02]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[RLS-2-RC-01]",
            "target": "[RLS-2-RQ-01]",
            "kind": "dependency"
        }
    },
    {
        "data": {
            "source": "[PRE-6]",
            "target": "I_2_1",
            "kind": "essr"
        }
    },
    {
        "data": {
            "source": "[PRE-7]",
            "target": "I_2_1",
            "kind": "essr"
        }
    },
    {
        "data": {
            "source": "[PRE-8]",
            "target": "I_2_1",
            "kind": "essr"
        }
    },
    {
        "data": {
            "source": "[RCP-2]",
            "target": "I_2_1",
            "kind": "essr"
        }
    },
    {
        "data": {
            "source": "[RCP-3]",
            "target": "I_2_1",
            "kind": "essr"
        }
    },
    {
        "data": {
            "source": "[RCP-4]",
            "target": "I_2_1",
            "kind": "essr"
        }
    },
    {
        "data": {
            "source": "[PRE-1]",
            "target": "I_2_2",
            "kind": "essr"
        }
    },
    {
        "data": {
            "source": "[PRE-3]",
            "target": "I_2_2",
            "kind": "essr"
        }
    },
    {
        "data": {
            "source": "[PRE-4]",
            "target": "I_2_2",
            "kind": "essr"
        }
    },
    {
        "data": {
            "source": "[RCP-5]",
            "target": "I_2_2",
            "kind": "essr"
        }
    },
    {
        "data": {
            "source": "[VRF-1]",
            "target": "I_2_2",
            "kind": "essr"
        }
    },
    {
        "data": {
            "source": "[VRF-2]",
            "target": "I_2_2",
            "kind": "essr"
        }
    },
    {
        "data": {
            "source": "[RMD-1]",
            "target": "I_2_2",
            "kind": "essr"
        }
    },
    {
        "data": {
            "source": "[RMD-2]",
            "target": "I_2_2",
            "kind": "essr"
        }
    },
    {
        "data": {
            "source": "[RMD-3]",
            "target": "I_2_2",
            "kind": "essr"
        }
    },
    {
        "data": {
            "source": "[RLS-1]",
            "target": "I_2_2",
            "kind": "essr"
        }
    },
    {
        "data": {
            "source": "[PRA-1]",
            "target": "I_2_2",
            "kind": "essr"
        }
    },
    {
        "data": {
            "source": "[PRE-9]",
            "target": "I_2_3",
            "kind": "essr"
        }
    },
    {
        "data": {
            "source": "[RCP-2]",
            "target": "I_2_3",
            "kind": "essr"
        }
    },
    {
        "data": {
            "source": "[RCP-6]",
            "target": "I_2_3",
            "kind": "essr"
        }
    },
    {
        "data": {
            "source": "[RCP-7]",
            "target": "I_2_3",
            "kind": "essr"
        }
    },
    {
        "data": {
            "source": "[PRA-1]",
            "target": "I_2_3",
            "kind": "essr"
        }
    },
    {
        "data": {
            "source": "[PRE-6]",
            "target": "I_2_4",
            "kind": "essr"
        }
    },
    {
        "data": {
            "source": "[RLS-2]",
            "target": "I_2_4",
            "kind": "essr"
        }
    },
    {
        "data": {
            "source": "[PRE-2]",
            "target": "I_2_5",
            "kind": "essr"
        }
    },
    {
        "data": {
            "source": "[PRE-5]",
            "target": "I_2_6",
            "kind": "essr"
        }
    },
    {
        "data": {
            "source": "[RCP-1]",
            "target": "I_2_6",
            "kind": "essr"
        }
    },
    {
        "data": {
            "source": "[RLS-1]",
            "target": "I_2_7",
            "kind": "essr"
        }
    },
    {
        "data": {
            "source": "[PRE-1]",
            "target": "I_2_7",
            "kind": "essr"
        }
    },
    {
        "data": {
            "source": "[VRF-2]",
            "target": "I_2_7",
            "kind": "essr"
        }
    },
    {
        "data": {
            "source": "[PRA-1]",
            "target": "I_2_7",
            "kind": "essr"
        }
    },
    {
        "data": {
            "source": "[PRE-1]",
            "target": "I_2_8",
            "kind": "essr"
        }
    },
    {
        "data": {
            "source": "[RLS-1]",
            "target": "I_2_8",
            "kind": "essr"
        }
    },
    {
        "data": {
            "source": "[RLS-2]",
            "target": "I_2_8",
            "kind": "essr"
        }
    }
];
