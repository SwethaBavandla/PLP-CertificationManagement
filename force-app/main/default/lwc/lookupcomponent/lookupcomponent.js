import { LightningElement,track,api } from 'lwc';
import searchRecords from '@salesforce/apex/CustomSearchController.searchRecords';
export default class Lookupcomponent extends LightningElement {
    @api objectName = 'Account';
    @api fieldName  = 'Name';
    @api iconname   = 'standard:record';
    @api label      = 'Account';
    @api parentidfield = 'AccountId';

   
    @track records;  
    @api selectedRecord;
    @api provideRecord;
  //  @api VouCert;

    hanldeSearch(event) {

        var searchVal = event.detail.value;

        searchRecords({
            objName   : this.objectName,
            fieldName : this.fieldName,
            searchKey : searchVal
        })
        .then( data => {
            if ( data ) {
                let parsedResponse = JSON.parse(data);
                let searchRecordList = parsedResponse[0];
                for ( let i=0; i < searchRecordList.length; i++ ) {
                      let record = searchRecordList[i];
                      record.Name = record[this.fieldName];
                }
                //window.console.log(' data ', searchRecordList);
                this.records = searchRecordList;
            }
        })
        .catch( error => {
            window.console.log(' error ', error);
        });
    }

    handleSelect(event) {
        var selectedVal = event.detail.selRec;
        this.selectedRecord =  selectedVal;
       // this.VouCert = this.selectedRecord.Name;
        //alert(this.selectedRecord.Id);
        let finalRecEvent = new CustomEvent('select',{
            detail : { selectedRecordId : this.selectedRecord.Id, parentfield : this.parentidfield,selectedRecordName: this.selectedRecord.Name }
        });
        this.dispatchEvent(finalRecEvent);
    } 

    handleRemove() {
        this.selectedRecord =  undefined;
        this.records = undefined;
        console.log('1');
        console.log(this.provideRecord);
        console.log(this.selectedRecord);
        console.log(this.records);
        let finalRecEvent = new CustomEvent('select',{
            detail : { selectedRecordId : undefined, parentfield : this.parentidfield }
        });
        this.dispatchEvent(finalRecEvent);
    }
    handleRemove1() {
        this.provideRecord =  undefined;
        console.log('2');
        console.log(this.provideRecord);
        console.log(this.selectedRecord);
        console.log(this.records);
        //this.records = undefined;
        // let finalRecEvent = new CustomEvent('select',{
        //     detail : { selectedRecordId : undefined, parentfield : this.parentidfield }
        // });
        // this.dispatchEvent(finalRecEvent);
    }
    
}