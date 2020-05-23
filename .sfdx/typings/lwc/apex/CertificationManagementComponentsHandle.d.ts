declare module "@salesforce/apex/CertificationManagementComponentsHandle.getAllRequests" {
  export default function getAllRequests(): Promise<any>;
}
declare module "@salesforce/apex/CertificationManagementComponentsHandle.getAllEmployees" {
  export default function getAllEmployees(): Promise<any>;
}
declare module "@salesforce/apex/CertificationManagementComponentsHandle.getAllCertifications" {
  export default function getAllCertifications(): Promise<any>;
}
declare module "@salesforce/apex/CertificationManagementComponentsHandle.getAllVouchers" {
  export default function getAllVouchers(): Promise<any>;
}
declare module "@salesforce/apex/CertificationManagementComponentsHandle.getNoneRequests" {
  export default function getNoneRequests(param: {flag: any}): Promise<any>;
}
declare module "@salesforce/apex/CertificationManagementComponentsHandle.getDraftRequests" {
  export default function getDraftRequests(): Promise<any>;
}
declare module "@salesforce/apex/CertificationManagementComponentsHandle.getAssignedRequests" {
  export default function getAssignedRequests(): Promise<any>;
}
declare module "@salesforce/apex/CertificationManagementComponentsHandle.getApprovedRequests" {
  export default function getApprovedRequests(): Promise<any>;
}
declare module "@salesforce/apex/CertificationManagementComponentsHandle.getRejectedRequests" {
  export default function getRejectedRequests(): Promise<any>;
}
declare module "@salesforce/apex/CertificationManagementComponentsHandle.getResultRequests" {
  export default function getResultRequests(): Promise<any>;
}
declare module "@salesforce/apex/CertificationManagementComponentsHandle.getPassedRequests" {
  export default function getPassedRequests(): Promise<any>;
}
declare module "@salesforce/apex/CertificationManagementComponentsHandle.getFailedRequests" {
  export default function getFailedRequests(): Promise<any>;
}
declare module "@salesforce/apex/CertificationManagementComponentsHandle.addNewEmp" {
  export default function addNewEmp(param: {EmpName: any, EmpId: any, EmpMail: any, EmpPS: any, EmpSS: any, EmpExp: any, EmpComm: any}): Promise<any>;
}
declare module "@salesforce/apex/CertificationManagementComponentsHandle.addNewCert" {
  export default function addNewCert(param: {CertName: any, CertCost: any}): Promise<any>;
}
declare module "@salesforce/apex/CertificationManagementComponentsHandle.addNewVou" {
  export default function addNewVou(param: {VouCost: any, VouValid: any, VouCert: any}): Promise<any>;
}
declare module "@salesforce/apex/CertificationManagementComponentsHandle.addNewReq" {
  export default function addNewReq(param: {ReqEmp: any, ReqCert: any, ReqDueDate: any}): Promise<any>;
}
declare module "@salesforce/apex/CertificationManagementComponentsHandle.updateRequest" {
  export default function updateRequest(param: {ReqRecordId: any, status: any, comments: any}): Promise<any>;
}
