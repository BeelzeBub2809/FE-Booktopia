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
};

export default Validators;