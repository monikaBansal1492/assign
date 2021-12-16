import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  allContacts: any;
  showAllContact:boolean;
  isContact: boolean;
  contactForm : FormGroup;
  error: boolean;
  errorMessage: string;
  findIdIndex: number;
  constructor(private contactService: ContactService) {

  }
  ngOnInit() {
        this.getAllContacts();
        this.contactForm = new FormGroup({
          id: new FormControl('', Validators.required),
          firstName: new FormControl('', Validators.required),
          lastName: new FormControl('', Validators.required),
          phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10) ])
        })
  }
  getAllContacts() {
    this.contactService.getContacts().subscribe((response) => {
        if(response) {
          this.allContacts = response;
          this.showAllContact = true;
        }
    });
  }
  deleteContact(id) {
    this.allContacts = this.allContacts.filter((value)=>{
         return value.id!==id;
    });
    if(this.allContacts.length === 0) {
      this.showAllContact = false;
    }
  }
  isAddContact() {
    this.isContact = true;
  }

  addContact() {
    let filterArray = this.allContacts.filter((value, index)=>{
      if(value.id === this.contactForm.controls['id'].value) {
        this.findIdIndex= index;
      }
       
       return value.id === this.contactForm.controls['id'].value;
    })
    if(this.contactForm.invalid) {
      this.error = true;
      this.errorMessage = 'please enter corect data';
      return;
    }
    this.error = false;
    this.allContacts[this.findIdIndex] = {id: this.contactForm.controls['id'].value, 
    firstName: this.contactForm.controls['firstName'].value, 
    lastName: this.contactForm.controls['lastName'].value,
    phone: this.contactForm.controls['phoneNumber'].value};
    this.contactForm.reset();
  }
  updateContact(id) {
    this.isContact = true;
    let filterArray = this.allContacts.filter((value)=>{
      return value.id === id;
    });
    this.contactForm.patchValue({
      id: filterArray[0].id,
      firstName: filterArray[0].firstName,
      lastName: filterArray[0].lastName,
      phoneNumber: filterArray[0].phone
    })
  }

}
