import { Errors } from "./errors.js";

export class ValidatorsControl{
    constructor(form){
        this.form = form;
    }

    validateField(field) {
        const value = field.value;
        for (const validator of field.validators) {
            const error = validator(value);
            if (error) return error;
        }
        return null;
    }

    validateForm(form) {
        const errors = {};
        for (const key in form) {
            const error = this.validateField(form[key]);
            if (error) {
                errors[key] = error;
            }
        }
        return errors;
    }
    
    getFirstErrorMessage(field, error, alias) {
        return error ? this.getMessage(field, error, alias) : '';
    }

    getMessage(field, error, alias) {
        const [validator] = Object.entries(error);
        const message = Errors[validator[0]] ?? '';
        let msg = alias !== '' && alias != undefined ? message.replace(':field', alias) : message.replace(':field', field);
        if(validator[0] === 'maxLength' || validator[0] === 'minLength'){
            msg = msg.replace('{error}', validator[1].requiredLength);
        } else if ( validator[0] === 'maxNumber' || validator[0] === 'minNumber'){
            msg = msg.replace('{error}', validator[1]);
        }  
        return msg;
    }

    addValidators(fieldName, validators) {
        if (this.form[fieldName]) {
            this.form[fieldName].validators = [...this.form[fieldName].validators, ...validators];
        } else {
            this.form[fieldName] = { value: '', validators: validators };
        }
    }

    setFieldValue(fieldName, value) {
        if (this.form[fieldName]) {
            this.form[fieldName].value = value;
        } else {
            this.form[fieldName] = { value: value, validators: [] };
        }
    }

    setField(fieldName, value, validators) {
        this.form[fieldName] = { value: value, validators: validators };
    }

    submitForm(event){
        event.preventDefault();
        const errors = this.validateForm(this.form);
        document.querySelectorAll('.error-message').forEach(element => element.textContent = '');
        if (Object.keys(errors).length > 0) {
            for (const key in errors) {
                const errorElement = document.querySelector(`[validation="${key}"]`);
                if (errorElement) {
                    errorElement.textContent = this.getFirstErrorMessage(key, errors[key], errorElement.getAttribute("alias"));
                }
            }
            return false;
        } else {
            return true;
        }
    }
}