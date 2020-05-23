import { LightningElement,wire ,track,api} from 'lwc';
import addcertification from '@salesforce/apex/CertificationManagementComponentsHandle.addNewCert';
import viewcertifications from '@salesforce/apex/CertificationManagementComponentsHandle.getAllCertifications';
import UpdateCertification from '@salesforce/apex/CertificationManagementComponentsHandle.UpdateCertification';
import {refreshApex} from '@salesforce/apex';
import NoHeader from '@salesforce/resourceUrl/NoHeader';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import id from '@salesforce/user/Id';
import getUserDetails from '@salesforce/apex/CertificationManagementComponentsHandle.getUserDetails';
import delRequest from '@salesforce/apex/CertificationManagementComponentsHandle.delRequest';

import { ShowToastEvent } from 'lightning/platformShowToastEvent'
export default class Certifications extends LightningElement {
    certiflag;
    certiflag1;
    certiflag2;
    ind;
    @track Certifications;
    @track recordId;
    
    @track profile;
    @track isAddAble = true;
  //  @track recId;
    userId = id;
    @wire(getUserDetails, { recId: '$userId' })
    wiredUser({ error, data }) {
        if (data) {
            //console.log('1');
            console.log(data.Name);
            this.profile = data.Name;
            if (this.profile == 'App Admin') {
                this.isAddAble = false;
            }
        } else if (error) {
            this.error = error;
            console.log(error);
        }
    };
    deleteRequest(event) {
        var payload = this.Certifications[event.target.value];
        console.log(event.target.value);
        console.log(payload);
        console.log(payload.Id);
        delRequest({ recId: payload.Id }).then((result) => {
            if (result == "Request deleted Successfully") {
                refreshApex(this.valueOfViewCertifications);
                console.log('1');
                this.notify('Request deleted Successfully', '', 'success');
            } else { console.log('2');
                this.notify('Failed to delete Request', result, 'error');
               
            };
        });

    }
    notify(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }

    valueOfViewCertifications;
    @wire (viewcertifications)
    getApexData1(value){
        this.valueOfViewCertifications=value;
        const {error,data}=value;
        if(data){
            console.log(data);
            this.Certifications=data;
        }
        if(error){
            console.log('error has occured');
        }
    }

    certiform1(){
        this.certiflag1 = true;
    }
    certiform2(event){
        this.certiflag2 = true;
        this.recordId = event.currentTarget.dataset.key;
        this.ind = event.target.value;
       
        this.CertId = this.Certifications[this.ind].Certification_ID__c;
        this.CertName = this.Certifications[this.ind].Name ;
        this.CertComm  = this.Certifications[this.ind].Comments__c ;
        this.CertCost = this.Certifications[this.ind].Certification_Cost__c;
    }

    @track CertName;
    @track CertId;
    @track CertCost;
    @track CertComm;
    
    CertNameChange(event) {
        this.CertName = event.target.value;
    }
    CertIdChange(event) {
        this.CertId = event.target.value;
    }
    CertCostChange(event) {
        this.CertCost = event.target.value;
    }
    CertCommChange(event) {
        this.CertComm = event.target.value;
    }
    certiform(event) {
        this.certiflag = true;
        this.recordId = event.currentTarget.dataset.key;
        this.ind = event.target.value;
        this.CertId = this.Certifications[this.ind].Certification_ID__c;
        this.CertName = this.Certifications[this.ind].Name ;
        this.CertComm  = this.Certifications[this.ind].Comments__c ;
        this.CertCost = this.Certifications[this.ind].Certification_Cost__c;
        
        
        //alert(this.Vouchers[this.ind].Comments__c);
    }
    closepopup(){
        this.certiflag = false;
        this.certiflag1 = false;
        this.certiflag2 = false;
    }
    addcert() {
        if(this.CertName==null||this.CertId==null||this.CertCost==null){
            this.notify('Fill all the required fields','','error');
        }else{
        addcertification({ CertName: this.CertName, CertId: this.CertId, CertCost: this.CertCost, CertComm: this.CertComm }).then(result => { if (result == 'Certification Created Successfully') { this.notify('Certification Created Successfully', '', 'success');this.closepopup();refreshApex(this.valueOfViewCertifications) } else this.notify('Request invaild', result, 'error'); });
        this.certiflag1 = false;
        this.CertName = null;
        this.CertId = null;
        this.CertCost = null;
        this.CertComm = null;
        }   
    }
    updatecert(){
        if(this.CertName==null||this.CertId==null||this.CertCost==null){
            this.notify('Fill all the required fields','','error');
        }else{
        UpdateCertification({recordId: this.recordId,CertName: this.CertName, CertId: this.CertId, CertCost: this.CertCost, CertComm: this.CertComm}).then(result => { if (result == 'Certification Updated Successfully') { this.closepopup();refreshApex(this.valueOfViewCertifications);this.notify('Certification Updated Successfully', '', 'success'); } else this.notify('Unique Id required', result, 'error'); });
        this.certiflag = false;
        this.CertName = null;
        this.CertId = null;
        this.CertCost = null;
        this.CertComm = null;
        }
    }
    connectedCallback() {
        loadStyle(this, NoHeader);
    }

}