import { LightningElement,track,wire } from 'lwc';
import addrequest from '@salesforce/apex/CertificationManagementComponentsHandle.addNewReq';
import getAllRequests from '@salesforce/apex/CertificationManagementComponentsHandle.getAllRequests';
import getNoneRequests from '@salesforce/apex/CertificationManagementComponentsHandle.getNoneRequests';
import getApproved from '@salesforce/apex/CertificationManagementComponentsHandle.getApprovedRequests';
import getRejected from '@salesforce/apex/CertificationManagementComponentsHandle.getRejectedRequests';
import getAssigned from '@salesforce/apex/CertificationManagementComponentsHandle.getAssignedRequests';
import getdata2 from '@salesforce/apex/CertificationManagementComponentsHandle.getPassedRequests';
import getdata3 from '@salesforce/apex/CertificationManagementComponentsHandle.getFailedRequests';
import getdata from '@salesforce/apex/CertificationManagementComponentsHandle.getDraftRequests';
import {refreshApex} from '@salesforce/apex';
import NoHeader from '@salesforce/resourceUrl/NoHeader';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
export default class CertificationRequests extends LightningElement {
    @track CertificationRequests;
    @track recordId;
    @track checkstatus1;
    @track valuee =  'View';
@track certi;
    @track Requests1;
    @track Requests2;
    @track Requests3;
    @track Requests23;
    valueOfViewCertificationRequests;
    reqflag1;
    @wire(getAllRequests)
    getApexData(value){
        this.valueOfViewCertificationRequests=value;
        const {error,data}=value;
        if(data){
            console.log(data);
            this.CertificationRequests=data;
           // console.log(data[0]);
        }
        if(error){
            console.log('error has occured');
        }
    }
    valueOfNoneRequests;
    @wire(getNoneRequests)
    getApexData234(value) {
        const { error, data } = value;
        this.valueOfNoneRequests = value;
        if (data) {
            this.Requests = data;
            console.log(data);
            //  this.certi = this.Requests;
        }
        if (error) {
            console.log('error has occured');
        }
        
    };
    valueOfViewRequests1;
    @wire(getdata)
    getApexData23(value) {
        this.valueOfViewRequests1 = value;
        const { error, data } = value;
        if (data) {
            console.log(data);
            this.Requests23 = data;
            
        }
        if (error) {
            console.log('error has occured');
        }
    }

    valueOfViewApproved;
    @wire(getApproved)
    getApexData1(value) {
        this.valueOfViewApproved = value;
        const { error, data } = value;
        if (data) {
            console.log(data);
            this.Requests1 = data;
        }

        if (error) {
            console.log('error has occured');
        }
    }


    valueOfViewRejected;
    @wire(getRejected)
    getApexData2(value) {
        this.valueOfViewRejected = value;
        const { error, data } = value;
        if (data) {
            console.log(data);
            this.Requests2 = data;
        }
        if (error) {
            console.log('error has occured');
        }
    };

    valueOfViewAssigned;
    @wire(getAssigned)
    getApexData3(value) {
        this.valueOfViewAssigned = value;
        const { error, data } = value;
        if (data) {
            console.log(data);
            this.Requests3 = data;
        }
        if (error) {
            console.log('error has occured');
        }
    }
    @track Requests11;
    @track Requests21;
    @track Requests31;

    valueOFGetApexData2;
    @wire(getdata2)
    getApexData21(value) {
        this.valueOFGetApexData2 = value;
        const { error, data } = value;
        if (data) {
            console.log(data);
            this.Requests21 = data;
            
        }
        if (error) {
            console.log('error has occured');
        }
    }

    valueOFGetApexData3;
    @wire(getdata3)
    getApexData31(value) {
        this.valueOFGetApexData3 = value;
        const { error, data } = value;
        if (data) {
            console.log(data);
            this.Requests31 = data;
        }
        if (error) {
            console.log('error has occured');
        }
    }
    reqform(){
        this.reqflag = true;
    }
    get options() {
        return [
            { label: 'All Requests', value: 'All Requests' },
            { label: 'Not submitted for approval', value: 'submit' },
            { label: 'Draft', value: 'Draft' },
            { label: 'Approved', value: 'Approved' },
            { label: 'Rejected', value: 'Rejected' },
            { label: 'Passed', value: 'Passed' },
            { label: 'Failed', value: 'Failed' }
        ];
    }
    notify(title, message, variant) {
        const evnt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evnt);
    }
    certiflag1;
    ind;
    reqflag;

    ReqEmp;
    ReqCert;
    ReqDueDate;
    ReqComm;

    CertRecordId;
    EmpRecordId;

    certireqform1(event){
    this.certiflag1 = true;
    this.recordId = event.currentTarget.dataset.key;
    
    
    }
    @wire(CurrentPageReference) pageRef;

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

    reqform1(event) {
        this.reqflag1 = true;
        this.valuee = event.detail.value;
        
        if(this.valuee=='Passed'){
            refreshApex(this.valueOFGetApexData2).then(r => {
                console.log('updated');
                console.log(this.valueOFGetApexData2);
                console.log(this.Requests21);
                this.certi = this.Requests21;
                console.log(this.certi);
            });
       }
        else if(this.valuee=='Failed'){
            refreshApex(this.valueOFGetApexData3).then(r => {
                console.log('updated');
                console.log(this.valueOFGetApexData3);
                console.log(this.Requests31);
                this.certi = this.Requests31;
                console.log(this.certi);
            });
        }
        else if(this.valuee=='Approved')
        {
            refreshApex(this.valueOfViewApproved).then(r => {
                console.log('updated');
                console.log(this.valueOfViewApproved);
                console.log(this.Requests1);
                this.certi = this.Requests1;
                console.log(this.certi);
            });
        }
        else if(this.valuee=='Rejected')
        {
            refreshApex(this.valueOfViewRejected).then(r => {
                console.log('updated');
                console.log(this.valueOfViewRejected);
                console.log(this.Requests2);
                this.certi = this.Requests2;
                console.log(this.certi);
            });
        }
        else if(this.valuee=='Assigned voucher')
        {
            refreshApex(this.valueOfViewAssigned).then(r => {
                console.log('updated');
                console.log(this.valueOfViewAssigned);
                console.log(this.Requests3);
                this.certi = this.Requests3;
                console.log(this.certi);
            });
        }
        else if(this.valuee=='Draft')
        {
            refreshApex(this.valueOfViewRequests1).then(r => {
                console.log('updated');
                console.log(this.valueOfViewRequests1);
                console.log(this.Requests23);
                this.certi = this.Requests23;
                console.log(this.certi);
            });
        }
        else if (this.valuee == 'submit') {
            refreshApex(this.valueOfNoneRequests).then(r => {
                console.log('updated');

                console.log(this.valueOfNoneRequests);
                console.log(this.Requests);
                this.certi = this.Requests;
                console.log(this.certi);
            });
        }
        else{
            refreshApex(this.valueOfViewCertificationRequests).then(r => {
                console.log('updated');

                console.log(this.valueOfViewCertificationRequests);
                console.log(this.CertificationRequests);
                this.certi = this.CertificationRequests;
                console.log(this.certi);
            });
        }
        
        

    }
    
    addreq() {
        addrequest({ ReqEmp: this.EmpRecordId, ReqCert: this.CertRecordId, ReqDueDate: this.ReqDueDate, ReqComm: this.ReqComm }).then(result => {
            if (result == 'Request Added Successfully') {
                var payLoad={'h': 'k'};
                fireEvent(this.pageRef, 'usercomp1click',payLoad);
                this.closepopup();
                this.notify('Request added Successfully', '', 'success');
                refreshApex(this.valueOfViewCertificationRequests)
                refreshApex(this.valueofNoneRequests);
                this.EmpRecordId=null;
                this.CertRecordId=null;
                this.ReqDueDate=null;
                this.ReqComm=null;
            } else {this.notify('Request Invalid', result, 'error');
            this.ReqDueDate=null;
        }
        });
    }
    
    closepopup() {
        this.reqflag = false;
        this.reqflag1 = false;
        this.valuee = null;
    }
    connectedCallback() {
        
        loadStyle(this, NoHeader);

    }

}