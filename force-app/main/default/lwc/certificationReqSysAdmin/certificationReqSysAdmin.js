import { LightningElement,track,wire } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import addrequest from '@salesforce/apex/CertificationManagementComponentsHandle.addNewReq';
import getAllRequests from '@salesforce/apex/CertificationManagementComponentsHandle.getAllRequests';
import {refreshApex} from '@salesforce/apex';
import NoHeader from '@salesforce/resourceUrl/NoHeader';
import { loadStyle} from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
export default class CertificationReqSysAdmin extends LightningElement {
    @track CertificationRequests;
    @track recordId;
    @track ReqEmp;
    @track ReqCert;
    @track ReqDueDate;
    @track ReqComm;
    @track Reqstatus;
    @track ReqvoucherId;
    valueOfViewCertificationRequests;
    reqflag;
    reqflag1;
    editcerti;
    CertRecordId;
    EmpRecordId;
    ind;
    
    @wire(getAllRequests)
    getApexData(value){
        this.valueOfViewCertificationRequests=value;
        const {error,data}=value;
        if(data){
            console.log(data);
            this.CertificationRequests=data;
        }
        if(error){
            console.log('error has occured');
        }
    }
    ReqDueDateChange(event) {
        this.ReqDueDate = event.target.value;
    }
    ReqCommChange(event) {
        this.ReqComm = event.target.value;
    }
    handleAutoSelect(event) {
        var nav = event.detail;

        this.VouCert = nav.selectedRecordName;
        this.CertRecordId = nav.selectedRecordId;

    }
    handleAutoSelect1(event) {
        var emp = event.detail;
        this.ReqEmp = emp.selectedRecordName;
        this.EmpRecordId = emp.selectedRecordId;

    }
    handleAutoSelect2(event) {
        var vou = event.detail;
        this.ReqvoucherId = vou.selectedRecordName;
        this.VouRecordId = vou.selectedRecordId;

    }

    reqform(){
        this.reqflag=true;
    }
    
    editcertireq(event){
        this.editcerti=true;
        this.recordId = event.currentTarget.dataset.key;
    }
    
    deletereq(event) {
        this.recordId = event.currentTarget.dataset.key;
        deleteRecord(this.recordId)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record deleted',
                        variant: 'success'
                    })
                );
                refreshApex(this.valueOfViewCertificationRequests);
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error deleting record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }

    addreq() {
        addrequest({ ReqEmp: this.EmpRecordId, ReqCert: this.CertRecordId, ReqDueDate: this.ReqDueDate, ReqComm: this.ReqComm }).then(result => {
            if (result == 'Request Added Successfully') {
                this.closepopup();
                refreshApex(this.valueOfViewCertificationRequests)
                this.EmpRecordId=null;
                this.CertRecordId=null;
                this.ReqDueDate=null;
                this.ReqComm=null;
                this.notify('Created request successfully', '', 'success');
            } else{
                alert(result);
                this.ReqDueDate=null;
                this.ReqComm=null;
            } 
        });
    }
    handleSubmit(event) {
        const fields = event.detail.fields;
        console.log(JSON.stringify(fields));
    }
    handleSuccess(event) {
        const updatedRecord = event.detail.id;
        console.log('onsuccess: ', updatedRecord);
        this.editcerti=false;
        refreshApex(this.valueOfViewCertificationRequests);
        this.notify('Updated record successfully', '', 'success');
    }
    
    notify(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }
    closepopup() {
        this.reqflag = false;
        this.reqflag1 = false;
        this.viewcertifcationreq=false;
        this.editcerti=false;
    }
connectedCallback(){
    loadStyle(this, NoHeader);
}
}