import { LightningElement } from 'lwc';
import findContacts from '@salesforce/apex/ContactController.findContacts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ApexImperativeMethodWithParams extends LightningElement {
    searchKey = '';
    contacts;
    error;

    handleKeyChange(event) {
        this.searchKey = event.target.value;
    }

    handleSearch() {
        findContacts({ searchKey: this.searchKey })
            .then((result) => {
                this.contacts = result;
                this.error = undefined;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Fetched',
                        message: 'showing results',
                        variant: 'success'
                    })
                );
                
            })
            .catch((error) => {
                this.error = error;
                this.contacts = undefined;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Unable To Fetch',
                        message: 'Retrieval Failed',
                        variant: 'error'
                    })
                );
            });
    }
}