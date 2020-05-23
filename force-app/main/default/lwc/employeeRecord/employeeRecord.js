import { LightningElement, wire , track} from 'lwc';
import getAllEmployees from '@salesforce/apex/CertificationManagementComponentsHandle.getAllEmployees';
import {deleteRecord} from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {refreshApex} from '@salesforce/apex';
import NoHeader from '@salesforce/resourceUrl/NoHeader';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

export default class EmployeeRecord extends LightningElement {
    @track Employees;
    newempform;
    editemployee;
    recordId;
    valueOfViewEmployees;
    @wire(getAllEmployees)
    getApexData(value){
        this.valueOfViewEmployees=value;
        const {error,data}=value;
        if(data){
            console.log(data);
            this.Employees=data;
        }
        if(error){
            console.log('error has occured');
        }
    }
    empform(){
        this.newempform = true;
    }
    editemp(event){
        this.editemployee = true;
        this.recordId = event.currentTarget.dataset.key;
    }
    deleteemp(event){
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
                refreshApex(this.valueOfViewEmployees);
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
    handleSuccess(){
        this.editemployee = false;
        refreshApex(this.valueOfViewEmployees);
        this.notify('Record Updated Successfully', '', 'success');

    }
    handleSuccess1(){
        this.newempform = false;
        refreshApex(this.valueOfViewEmployees);
        this.notify('Record Created Successfully', '', 'success');
    }
    handleError(){
        this.notify('Unique Employee ID required', '', 'error');
    }
    notify(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }
    closepopup(){
        this.newempform = false; 
        this.editemployee = false;   
    }
    connectedCallback(){
        loadStyle(this, NoHeader);
    }
}