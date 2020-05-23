import { LightningElement, wire, track } from 'lwc';
import getdata from '@salesforce/apex/CertificationManagementComponentsHandle.getDraftRequests';
import updateRequest from '@salesforce/apex/CertificationManagementComponentsHandle.updateRequest';
import NoHeader from '@salesforce/resourceUrl/NoHeader';
import { loadStyle } from 'lightning/platformResourceLoader';
import { refreshApex } from '@salesforce/apex';

import { ShowToastEvent } from 'lightning/platformShowToastEvent'

export default class ApprovalRequests extends LightningElement {

    
    @track Requests;
    @track comment;
    selectedRejection = false;

    valueOfViewRequests;
    @wire(getdata)
    getApexData(value) {
        this.valueOfViewRequests = value;
        const { error, data } = value;
        if (data) {
            console.log(data);
            this.Requests = data;
        }
        if (error) {
            console.log('error has occured');
        }
    }

    saveComment(event) {
        this.comment = event.target.value;
    }

    flagged = false;
    ind;

    approvereq(event) {
        this.selectedRejection = false;
        this.ind = event.target.value;
        this.flagged = true;
        this.ReqRecordId = this.Requests[this.ind].Id;
    }
    rejectreq(event) {
        this.ind = event.target.value;
        this.selectedRejection = true;
        this.flagged = true;
        this.ReqRecordId = this.Requests[this.ind].Id;
    }

    refreshButtonClicked(event){
        refreshApex(this.valueOfViewRequests);
    }
    notify(title, message, variant) {
        const evnt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evnt);
    }
    AddComment() {
        if (this.selectedRejection == true) {
            if (this.comment != null && this.comment != '') {
                updateRequest({ ReqRecordId: this.ReqRecordId, status: 'Rejected', comments: this.comment })
                .then(result => {
                    if (result == 'Request Updated Successfully') {
                        this.notify('Request Updated Successfully', '', 'success');
                        refreshApex(this.valueOfViewRequests);
                    }
                    else {
                        this.notify('Error', result, 'error');
                    }
                    this.selectedRejection = false;
                });
                this.closepopup();
            }
            else {               
                this.selectedRejection = true;
                this.comment='';
                this.notify('Enter Comments', '', 'error');
            }
        }
        else {
            updateRequest({ ReqRecordId: this.ReqRecordId, status: 'Approved', comments: this.comment }).
                then(result => {
                    if (result == 'Request Updated Successfully') {
                        this.notify('Request Updated Successfully', '', 'success');
                        refreshApex(this.valueOfViewRequests);
                    }
                    else {
                        this.notify('Error', result, 'error');
                    }
                });
                this.closepopup();
        }
        this.comment = null;

    }

    closepopup() {
        this.flagged = false;
        this.selectedRejection = false;
        this.comment = null;
    }
    connectedCallback() {
        
        loadStyle(this, NoHeader);

    }

}