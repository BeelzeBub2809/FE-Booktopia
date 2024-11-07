const Validators = {
    required: value => value ? null : { required: true },
    requiredString: value => value.trim().length > 0 ? null : {required : true},
    minLength: min => value => value.trim().length >= min ? null : { minLength: { requiredLength: min, actualLength: value.length } },
    maxLength: max => value => value.trim().length <= max ? null : { maxLength: { requiredLength: max, actualLength: value.length } },
    pattern: regex => value => regex.test(value) ? null : { pattern: { requiredPattern: regex, actualValue: value } },
    email: value => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) ? null : { email: true },
    phoneNumber: value => value && value.trim().length === 10  && /^0\d{9}$/.test(value) ? null : { phoneNumber: true},
    password: value => value && value.trim().length > 0 && /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) ? null : { password: true },
    number: value => value && /^\d+(\.\d{1,2})?$/.test(value) ? null : { price: true },
    maxNumber: max => value => value <= max ? null : { maxNumber: max}, 
    minNumber: min => value => value >= min ? null : { maxNumber: min}, 
    isbn: value => value && /^(?:\d{9}X|\d{10}|\d{3}[- ]?\d{1,5}[- ]?\d{1,7}[- ]?\d{1,7}[- ]?\d{1})$/.test(value) ? null : { isbn: true },
    validDate: value => !isNaN(new Date(value)) ? null : { validDate: true },
    pastDate: value => new Date(value) < new Date() ? null : { pastDate: true },
    status: value => value.trim() === 'active' || value.trim() === 'inactive' ? null : { status: true },
    integer: value => value && /^[1-9]\d*$/.test(value) ? null : { integer: true },
};

export default Validators;