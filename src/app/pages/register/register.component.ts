import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../theme/validators';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'register',
    templateUrl: './register.html',
    styleUrls: ['./register.scss']
})
export class Register {

    public form: FormGroup;
    public lastName: AbstractControl;
    public middleName: AbstractControl;
    public name: AbstractControl;
    public email: AbstractControl;
    public password: AbstractControl;
    public repeatPassword: AbstractControl;
    public passwords: FormGroup;
    public phone: AbstractControl;

    public submitted: boolean = false;

    constructor(fb: FormBuilder, private authService: AuthenticationService) {

        this.form = fb.group({
            'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'lastName': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            'phone': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'middleName': [''],
            'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
            'passwords': fb.group({
                'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
                'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
            }, { validator: EqualPasswordsValidator.validate('password', 'repeatPassword') })
        });

        this.name = this.form.controls['name'];
        this.phone = this.form.controls['phone'];
        this.lastName = this.form.controls['lastName'];
        this.middleName = this.form.controls['middleName'];
        this.email = this.form.controls['email'];
        this.passwords = <FormGroup>this.form.controls['passwords'];
        this.password = this.passwords.controls['password'];
        this.repeatPassword = this.passwords.controls['repeatPassword'];
    }

    public onSubmit(values: Object): void {
        this.submitted = true;
        if (this.form.valid) {
            console.log(values);
            this.authService.register(values)
                .subscribe(resp => {
                    if (resp.isOk) {
                        alert('OK');
                        //this.authService.login(values.email, values.password)
                    }
                });
            
        }
    }
}
