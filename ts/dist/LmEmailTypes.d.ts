export interface EmailDomainDetail {
    dkim?: Record<string, any>;
    dmarc?: string;
    domain?: string;
    id?: number;
    returnpath?: Record<string, any>;
    spf?: Record<string, any>;
    valid?: boolean;
}
export interface EmailDomainDetailLoadMatch {
    id: number;
}
export interface EmailDomainDetailCreateData {
    dkim?: Record<string, any>;
    dmarc?: string;
    domain?: string;
    id?: number;
    returnpath?: Record<string, any>;
    spf?: Record<string, any>;
    valid?: boolean;
}
export interface EmailDomainList {
    dkim_status?: boolean;
    dmarc_status?: string;
    domain?: string;
    id?: number;
    productId?: string;
    returnpath_status?: boolean;
    spf_status?: boolean;
    valid?: boolean;
}
export interface EmailDomainListListMatch {
    page: number;
    size: number;
}
export interface EmailDomainVerify {
}
export interface EmailDomainVerifyLoadMatch {
    domain_id: number;
    type: string;
}
export interface ManageDomain {
    id?: string;
}
export interface ManageDomainRemoveMatch {
    id: number;
}
export interface SendMessage {
    messages?: any[];
    requestId?: string;
}
export interface SendMessageCreateData {
    messages?: any[];
    requestId?: string;
}
