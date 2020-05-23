import { LightningElement, wire, track } from 'lwc';
import getdata from '@salesforce/apex/CertificationManagementComponentsHandle.getNoneRequests';
import updateRequest from '@salesforce/apex/CertificationManagementComponentsHandle.updateRequest';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import { refreshApex } from '@salesforce/apex';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners } from 'c/pubsub';

export default class SubmitForApproval extends LightningElement {

    @track Requests;

    @wire(CurrentPageReference) pageRef;

    valueOfNoneRequests;
    @wire (getdata)
    getApexData(value) {
       const { error, data }=value;
       this.valueOfNoneRequests=value;
        if (data) {          
            this.Requests=data;
            console.log(data);
        }
        if (error) {
            console.log('error has occured');
        }
       
    };

    notify(title, message, variant) {
        const evnt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evnt);
    }


    ind;
    connectedCallback() {
        registerListener('usercomp1click', this.handleRegusercomp1click, this);
    }
    disconnectedCallback() {
        unregisterAllListeners(this);
        //unregisterListener('usercomp1click',this.handleDeregusercomp1click,this);
    }

    handleRegusercomp1click(dataFromComp) {
        this.RecallWiredData();
    }

    submitreq(event) {
        // alert('button working');
        this.ind = event.target.value;
        //alert('index : '+this.ind);
        this.ReqRecordId = this.Requests[this.ind].Id;
        // alert('Record Id : '+this.ReqRecordId);
        updateRequest({ ReqRecordId: this.ReqRecordId, status: 'Draft' }).then(result => {
            if (result == 'Request Updated Successfully') {
                this.notify('Submitted for approval', '', 'success');
                //window.location.reload();
                this.RecallWiredData();
            }
            else this.notify('Request Invalid', result, 'error');
        });
    }

    RecallWiredData() {
       // setTimeout(function () { this.callItOnceMore = !this.callItOnceMore; }, 10000);
         refreshApex(this.valueOfNoneRequests);
    }




}