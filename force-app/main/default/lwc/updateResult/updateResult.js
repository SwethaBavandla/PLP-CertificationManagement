import { LightningElement, wire, track } from 'lwc';
import getdata1 from '@salesforce/apex/CertificationManagementComponentsHandle.getAssignedRequests';
import getdata2 from '@salesforce/apex/CertificationManagementComponentsHandle.getPassedRequests';
import getdata3 from '@salesforce/apex/CertificationManagementComponentsHandle.getFailedRequests';
import updateRequest from '@salesforce/apex/CertificationManagementComponentsHandle.updateRequest';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import { refreshApex } from '@salesforce/apex';


export default class UpdateResult extends LightningElement {
    @track Requests1;
    @track Requests2;
    @track Requests3;
    
    valueOFGetApexData1;
    @wire(getdata1)
    getApexData1(value) {
        this.valueOFGetApexData1 = value;
        const { error, data } = value;
        if (data) {
            console.log(data);
            this.Requests1 = data;
        }
        if (error) {
            console.log('error has occured');
        }
    }

    valueOFGetApexData2;
    @wire(getdata2)
    getApexData2(value) {
        this.valueOFGetApexData2 = value;
        const { error, data } = value;
        if (data) {
            console.log(data);
            this.Requests2 = data;
        }
        if (error) {
            console.log('error has occured');
        }
    }

    valueOFGetApexData3;
    @wire(getdata3)
    getApexData3(value) {
        this.valueOFGetApexData3 = value;
        const { error, data } = value;
        if (data) {
            console.log(data);
            this.Requests3 = data;
        }
        if (error) {
            console.log('error has occured');
        }
    }
    notify(title, message, variant) {
        const evnt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evnt);
    }
    ind;
    passedreq(event) {
        this.ind = event.target.value;
        this.ReqRecordId = this.Requests1[this.ind].Id;
        updateRequest({ ReqRecordId: this.ReqRecordId, status: 'Passed' }).then(result => { if (result == 'Request Updated Successfully') { this.notify('Updated Successfully', '', 'success'); this.RecallWiredData(); } else this.notify('Error', result, 'error'); });
    }
    failedreq(event) {
        this.ind = event.target.value;
        this.ReqRecordId = this.Requests1[this.ind].Id;
        updateRequest({ ReqRecordId: this.ReqRecordId, status: 'Failed' }).then(result => { if (result == 'Request Updated Successfully') { this.notify('Updated Successfully', '', 'success'); this.RecallWiredData(); } else this.notify('Error', result, 'error'); });
    }

    RecallWiredData() {
          refreshApex(this.valueOFGetApexData1);
          refreshApex(this.valueOFGetApexData2);
          refreshApex(this.valueOFGetApexData3);
     }
     refreshButtonClicked(event){
          refreshApex(this.valueOFGetApexData1);
          
    }
    
}