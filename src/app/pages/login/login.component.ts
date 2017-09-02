import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DefaultModal } from '../../theme/components/modals/default-modal.component';

@Component({
    selector: 'login',
    templateUrl: './login.html',
    styleUrls: ['./login.scss']
})
export class Login {

    public form: FormGroup;
    public email: AbstractControl;
    public password: AbstractControl;
    public submitted: boolean = false;

    returnUrl: string;
    activeModal;

    constructor(

        fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private modalService: NgbModal
    ) {

        this.form = fb.group({
            'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
        });

        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
    }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    modalWait() {
      this.activeModal = this.modalService.open(DefaultModal, {size: 'lg'});
      this.activeModal.componentInstance.modalHeader = 'Вхід';
      this.activeModal.componentInstance.modalContent = 'Зачекайте, будь ласка. Виконується вхід у систему.';
      this.activeModal.componentInstance.modalButton = 'OK';
    }    

    modalError() {
      this.activeModal = this.modalService.open(DefaultModal, {size: 'lg'});
      this.activeModal.componentInstance.modalHeader = 'Помилка входу';
      this.activeModal.componentInstance.modalContent = 'Email або пароль невірні. Будь ласка, повторіть спробу входу.';
      this.activeModal.componentInstance.modalButton = 'Повторити спробу';
    }    

    
    public onSubmit(values: Object): void {
        this.submitted = true;

        this.modalWait();        
        
        if (this.form.valid) {
            this.authenticationService.login(this.email.value, this.password.value)
                .subscribe(
                data => {
                    this.activeModal.close();
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.activeModal.close();
                    this.modalError();
                    //this.alertService.error(error);
                    this.submitted = false;
                });
        }
    }
}
