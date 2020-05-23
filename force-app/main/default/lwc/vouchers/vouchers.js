import { LightningElement,wire ,track,api} from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import viewvouchers from '@salesforce/apex/CertificationManagementComponentsHandle.getAllVouchers';
import updateVou from '@salesforce/apex/CertificationManagementComponentsHandle.UpdateVou';
import addvoucher from '@salesforce/apex/CertificationManagementComponentsHandle.addNewVou';
import {refreshApex} from '@salesforce/apex';
import NoHeader from '@salesforce/resourceUrl/NoHeader';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import id from '@salesforce/user/Id';
import getUserDetails from '@salesforce/apex/CertificationManagementComponentsHandle.getUserDetails';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
export default class Vouchers extends LightningElement {
    vouflag;
    vouflag1;
    vouflag2;
    ind;
    @track Vouchers;
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
                refreshApex(this.valueOfViewVouchers);
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
    notify(title, message, variant) {
        const evnt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evnt);
    }

    valueOfViewVouchers;


    
    @wire (viewvouchers)
    getApexData2(value){
        this.valueOfViewVouchers=value;
        const {error,data}=value;
        if(data){
            console.log(data);
            this.Vouchers=data;
        }
        if(error){
            console.log('error has occured');
        }
    }
    vouform1(){
        this.vouflag1 = true;
    }
    vouform2(event){
        this.vouflag2 = true;
        this.recordId = event.currentTarget.dataset.key;
        this.ind = event.target.value;
        this.VouId = this.Vouchers[this.ind].Name;
       
        this.CertRecordId=this.Vouchers[this.ind].Certification__c;
        this.VouCert = this.Vouchers[this.ind].Certification__r.Name ;
        this.Vouactive = this.Vouchers[this.ind].Active__c ;
        this.VouComm  = this.Vouchers[this.ind].Comments__c;
        this.VouCost = this.Vouchers[this.ind].Voucher_Cost__c;
        this.VouValid = this.Vouchers[this.ind].Validity__c;
    }
    @track VouId;
    @track VouCost;
    @track VouValid;
    @track VouCert;
    @track VouComm;
    @track Vouactive;
    CertRecordId;
    VouIdChange(event) {
        this.VouId = event.target.value;
    }
    VouCostChange(event) {
        this.VouCost = event.target.value;
    }
    VouValidChange(event) {
        this.VouValid = event.target.value;
        this.openlookup = true;
    }

    VouCommChange(event) {
        this.VouComm = event.target.value;
       
    }
    handleAutoSelect(event) {
        
        var nav = event.detail;
        this.VouCert = nav.selectedRecordName;
        this.CertRecordId = nav.selectedRecordId;
        
    }
    vouform(event) {
        
       
        this.vouflag = true;
        this.recordId = event.currentTarget.dataset.key;
        this.ind = event.target.value;
        this.VouId = this.Vouchers[this.ind].Name;
       
        this.CertRecordId=this.Vouchers[this.ind].Certification__c;
        this.VouCert = this.Vouchers[this.ind].Certification__r.Name ;
        
        this.VouComm  = this.Vouchers[this.ind].Comments__c;
        this.VouCost = this.Vouchers[this.ind].Voucher_Cost__c;
        this.VouValid = this.Vouchers[this.ind].Validity__c;
        
        
        //alert(this.Vouchers[this.ind].Comments__c);
    }
    closepopup(){
        this.vouflag = false;
        this.vouflag1 = false;
        this.vouflag2 = false;
    }
    addvou() {
        addvoucher({ VouId: this.VouId, VouCost: this.VouCost, VouValid: this.VouValid, VouCert: this.CertRecordId, VouComm: this.VouComm }).then(result => { if (result == 'Voucher Added Successfully')
         {this.notify('Voucher Created Successfully', '', 'success');
         this.closepopup();
         refreshApex(this.valueOfViewVouchers);
         this.vouflag = false;
        this.VouId = null;
        this.VouCost = null;
        this.VouValid = null;
        this.CertRecordId = null;
        this.VouComm = null; } else this.notify('Request invalid', result, 'error'); });
        
        
    }
    
    updateVoucher(){
        console.log(this.VouComm);
        updateVou({VouId: this.VouId,recordId: this.recordId, VouCost: this.VouCost, VouValid: this.VouValid, VouCert: this.CertRecordId, VouComm: this.VouComm }).then(result => { if (result == 'Voucher updated Successfully') { this.notify('Voucher Updated Successfully', '', 'success');console.log('update');refreshApex(this.valueOfViewVouchers); } else this.notify('Request invalid', result, 'error'); });
        this.vouflag = false;

        
    }
    connectedCallback() {
        loadStyle(this, NoHeader);
    }

}