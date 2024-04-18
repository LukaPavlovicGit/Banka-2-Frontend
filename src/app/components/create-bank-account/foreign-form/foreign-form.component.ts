import { Component, inject, Input } from '@angular/core';
import { DropdownOption } from '../../../utils/constants';
import { FormBuilder, Validators } from '@angular/forms';
import {
	bankAccountNumberValidator,
	emailValidator,
} from '../../../utils/validators';
import { AccountService } from '../../../services/bank-service/account.service';
import { ForeignAccountDto } from '../../../dtos/foreign-account-dto';

@Component({
	selector: 'app-foreign-form',
	templateUrl: './foreign-form.component.html',
	styleUrls: ['./foreign-form.component.css'],
})
export class ForeignFormComponent {
	@Input() currencyOptions!: DropdownOption[];
	bankService = inject(AccountService);
	foreignBankAccountForm = this.fb.group({
		accountNumber: [
			'',
			[Validators.required, bankAccountNumberValidator()],
		],
		email: ['', [Validators.required, emailValidator()]],
		currencyCode: ['', [Validators.required]],
	});

	constructor(private fb: FormBuilder) {}

	onSubmit() {
		if (this.foreignBankAccountForm.valid) {
			const account = this.foreignBankAccountForm
				.value as ForeignAccountDto;
			account.accountNumber = account.accountNumber.replaceAll('-', '');
			this.bankService
				.postCreateForeignAccount(account)
				.subscribe(response => {
					console.log(response);
					this.foreignBankAccountForm.reset();
				});
		}
	}
}
