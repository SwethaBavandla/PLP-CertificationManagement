public with sharing class CertificationManagementComponentsHandle {
    public CertificationManagementComponentsHandle() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Certification_Request__c> getAllRequests(){
        List<Certification_Request__c> reqs = [SELECT Certification__r.Name,Employee__r.Employee_Name__c,Voucher__r.Name,Employee__r.Name,Certification__c,Comments__c,Due_Datee__c,Employee__c,Id,Name,Status__c,Voucher__c FROM Certification_Request__c ORDER BY Name DESC NULLS FIRST] ;
        return reqs;
    }
    @AuraEnabled(cacheable=true)
    public static List<Employee__c> getAllEmployees(){
        List<Employee__c> emps = [SELECT Comments__c,Email__c,Employee_Name__c,Experience__c,Id,Name,Primary_Skill__c,Secondary_Skill__c FROM Employee__c  ORDER BY CreatedDate DESC ] ;
        return emps;
    }

    @AuraEnabled(cacheable=true)
    public static List<Certification__c> getAllCertifications(){
        List<Certification__c> certs = [SELECT Certification_Cost__c,Certification_ID__c,Id,Name FROM Certification__c  ORDER BY CreatedDate DESC ];
        return certs;
    }

    @AuraEnabled(cacheable=true)
    public static List<Voucher__c> getAllVouchers(){
        List<Voucher__c> vous = [SELECT Active__c,Certification__r.Name,Certification__r.Certification_ID__c,Id,Name,Validity__c,Voucher_Cost__c,Comments__c FROM Voucher__c  ORDER BY CreatedDate DESC ];
        return vous;
    }
    //
    @AuraEnabled
    public static String UpdateVou( String recordId,Decimal VouCost,String VouComm ,Date VouValid,String VouCert,String VouId){
        Voucher__c newvou = new Voucher__c(id=recordId,Voucher_Cost__c=VouCost,Comments__c = VouComm ,Validity__c=VouValid,Name = VouId ,Certification__c=VouCert);
       try {update newvou; }
       catch(Exception e){
            return e.getMessage();
       } 
       return 'Voucher updated Successfully';    
    }
//code for updating certi req
    @AuraEnabled
    public static String updatecertreq(String recordId,String status,Date duedate, String reqcom){
        Certification_Request__c certi = new Certification_Request__c(Id=recordId,Status__c=status,Due_Datee__c=duedate,Comments__c=reqcom);
        try{update certi;}
        catch(Exception e){
            return e.getMessage();

        }
        return 'Request updated successfully';
    }
//getting user profile
@AuraEnabled(cacheable=true)
public static Profile getUserDetails(String recId) {
    List<User> users= [Select Id , Name ,Email,ProfileId from User where Id =:recId];

   User u=users[0];
   List<Profile> profiles= [Select Name from Profile where Id=:u.ProfileId];
  return profiles[0];
}
@AuraEnabled
    public static String delRequest(String recId){
        Certification__c delReq = new Certification__c(Id=recId);
        try {delete delReq; }
        catch(Exception e){
            return recId;
       } 
       return 'Request deleted Successfully';     
    }
    
    @AuraEnabled
    public static String delcertiRequest(String recId,String value){
        Certification_Request__c delcerti = new Certification_Request__c(Id = recId);
        try{delete delcerti;}
        catch(Exception e){
            return recId;
        }
        return 'Request deleted Successfully'; 
    }

    //Code for getting request records depending on status
    
    @AuraEnabled(cacheable=true)
    public static List<Certification_Request__c> getNoneRequests(Boolean flag){
        List<Certification_Request__c> reqs = [SELECT Certification__r.Name,Comments__c,Due_Datee__c,Employee__r.Employee_Name__c,Id,Name,Status__c,Voucher__r.Name,Employee__r.Name FROM Certification_Request__c WHERE Status__c='' ORDER BY Name DESC NULLS FIRST] ;
        return reqs;
    }

    @AuraEnabled(cacheable=true)
    public static List<Certification_Request__c> getDraftRequests(){
        List<Certification_Request__c> reqs=new List<Certification_Request__c>();
        reqs = [SELECT Certification__r.Name,Comments__c,Due_Datee__c,Employee__r.Employee_Name__c,Employee__r.Name,Id,Name,Status__c,Voucher__r.Name FROM Certification_Request__c WHERE Status__c='Draft' ORDER BY Name DESC NULLS FIRST] ;
        return reqs;
    }
    
    
    
    @AuraEnabled(cacheable=true)
    public static List<Certification_Request__c> getAssignedRequests(){
        List<Certification_Request__c> reqs = [SELECT Certification__r.Name,Comments__c,Due_Datee__c,Employee__r.Employee_Name__c,Id,Name,Status__c,Voucher__r.Name,Employee__r.Name FROM Certification_Request__c WHERE Status__c='Assigned voucher' ORDER BY Name DESC NULLS FIRST] ;
        return reqs;
    }
    @AuraEnabled(cacheable=true)
    public static List<Certification_Request__c> getApprovedRequests(){
        List<Certification_Request__c> reqs = [SELECT Certification__r.Name,Comments__c,Due_Datee__c,Employee__r.Employee_Name__c,Id,Name,Status__c,Voucher__r.Name,Voucher__c,Employee__r.Name FROM Certification_Request__c WHERE Status__c='Approved' ORDER BY Name DESC NULLS FIRST] ;
        return reqs;
    }
  
    @AuraEnabled(cacheable=true)
    public static List<Certification_Request__c> getRejectedRequests(){
        List<Certification_Request__c> reqs = [SELECT Certification__r.Name,Comments__c,Due_Datee__c,Employee__r.Employee_Name__c,Id,Name,Status__c,Voucher__r.Name,Employee__r.Name FROM Certification_Request__c WHERE Status__c='Rejected' ORDER BY Name DESC NULLS FIRST] ;
        return reqs;
    }
    @AuraEnabled(cacheable=true)
    public static List<Certification_Request__c> getResultRequests(){
        List<Certification_Request__c> reqs = [SELECT Certification__r.Name,Comments__c,Due_Datee__c,Employee__r.Employee_Name__c,Id,Name,Status__c,Voucher__r.Name,Employee__r.Name FROM Certification_Request__c WHERE Status__c='Passed' AND Status__c='Failed' ORDER BY Name DESC NULLS FIRST] ;
        return reqs;
    }
    @AuraEnabled(cacheable=true)
    public static List<Certification_Request__c> getPassedRequests(){
        List<Certification_Request__c> reqs = [SELECT Certification__r.Name,Comments__c,Due_Datee__c,Employee__r.Employee_Name__c,Id,Name,Status__c,Voucher__r.Name,Employee__r.Name FROM Certification_Request__c WHERE Status__c='Passed' ORDER BY Name DESC NULLS FIRST] ;
        return reqs;
    }
    @AuraEnabled(cacheable=true)
    public static List<Certification_Request__c> getFailedRequests(){
        List<Certification_Request__c> reqs = [SELECT Certification__r.Name,Comments__c,Due_Datee__c,Employee__r.Employee_Name__c,Id,Name,Status__c,Voucher__r.Name,Employee__r.Name FROM Certification_Request__c WHERE Status__c='Failed' ORDER BY Name DESC NULLS FIRST] ;
        return reqs;
    }
    //code for adding new employee record
    @AuraEnabled
    public static String addNewEmp(String EmpName,String EmpId,String EmpMail,String EmpPS,String EmpSS,Decimal EmpExp,String EmpComm){
        Employee__c newemp = new Employee__c(Name=EmpId,Employee_Name__c=EmpName,  Email__c=EmpMail,Primary_Skill__c=EmpPS, Secondary_Skill__c=EmpSS, Experience__c=EmpExp, Comments__c=EmpComm);
        
        try {insert newemp; }
        catch(Exception e){
             return e.getMessage();
        } 
        return 'Employee Created Successfully';
        
    }
    //code for adding new certification record
    @AuraEnabled
    public static String addNewCert(String CertName,String CertId, Decimal CertCost, String CertComm){
        Certification__c newcert = new Certification__c(Name=CertName,Comments__c = CertComm,Certification_ID__c = CertId, Certification_Cost__c=CertCost);
       
          
        try {insert newcert; }
        catch(Exception e){
             return e.getMessage();
        } 
        return 'Certification Created Successfully';       
    }
    //code for updating certification details
    @AuraEnabled
    public static String UpdateCertification(String recordId,String CertName,String CertId, Decimal CertCost, String CertComm){
        Certification__c newcert = new Certification__c(Id=recordId,Name=CertName,Certification_ID__c = CertId,Comments__c = CertComm, Certification_Cost__c=CertCost);
       
          
        try {update newcert; }
        catch(Exception e){
             return e.getMessage();
        } 
        return 'Certification Updated Successfully';       
    }
    //code for adding new voucher record
    @AuraEnabled
    public static String addNewVou( Decimal VouCost, Date VouValid,String VouCert,String VouId){
        Voucher__c newvou = new Voucher__c(Voucher_Cost__c=VouCost, Validity__c=VouValid,Name = VouId ,Certification__c=VouCert);
       try {insert newvou; }
       catch(Exception e){
            return e.getMessage();
       } 
       return 'Voucher Added Successfully';    
    }


    //code for adding new Request record
    @AuraEnabled
    public static String addNewReq(String ReqEmp, String ReqCert, Date ReqDueDate, String ReqComm){
        Certification_Request__c newreq = new Certification_Request__c(Employee__c=ReqEmp, Certification__c=ReqCert,Due_Datee__c = ReqDueDate,Comments__c = ReqComm);
        try {insert newreq; }
        catch(Exception e){
            //throw e;
            return e.getMessage();
       } 
       return 'Request Added Successfully';      
    }



    //code for submitting request for approval
    @AuraEnabled
    public static String updateRequest(String ReqRecordId,String status,String comments){
        Certification_Request__c updreq = new Certification_Request__c(Id=ReqRecordId,Status__c=status,Comments__c=comments);
        try {update updreq; }
        catch(Exception e){
            //throw e;
            return e.getMessage();
       } 
       return 'Request Updated Successfully';     
    }

}