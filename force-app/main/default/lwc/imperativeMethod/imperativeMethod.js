import { LightningElement, track } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class imperativeMethod extends LightningElement {
    @track loading = false;
    @track contacts;
    @track error;
    handleLoad() {
        this.loading = true;
        getContactList()
            .then((result) => {
                this.contacts = result;
                this.error = undefined;
                this.loading = false;                
            })
            .catch((error) => {
                this.error = error;
                this.contacts = undefined;
                this.loading = false;
            });
    }
}