import Validators from "./normal.validator";

export const Rules = {
    noValidate: [],
    fullname: [Validators.requiredString, Validators.minLength(4), Validators.maxLength(16)],
    email: [Validators.requiredString, Validators.email, Validators.maxLength(255)],
    name: [Validators.requiredString, Validators.maxLength(100)],
    isActivce: [],
    description: [Validators.maxLength(1000)],
    phoneNumber: [Validators.requiredString, Validators.phoneNumber],
    password: [Validators.requiredString, Validators.minLength(8), Validators.maxLength(20), Validators.password],
    code: [Validators.requiredString, Validators.minLength(3), Validators.maxLength(6)],
    price: [Validators.required, Validators.number, Validators.maxNumber(2000000000)],
    title: [Validators.requiredString, Validators.maxLength(40)],
    content: [Validators.requiredString],
    youtubeLink: [Validators.requiredString, Validators.youtubeLink],
    question: [Validators.requiredString, Validators.maxLength(500)],
    answerContent: [Validators.requiredString, Validators.maxLength(100)],
    explain: [Validators.requiredString, Validators.maxLength(500)],
    requiredString: [Validators.requiredString],
    quizName: [Validators.requiredString, Validators.maxLength(50)],
    number: [Validators.required, Validators.number],
    isbn: [Validators.requiredString, Validators.isbn],
    releaseDate: [Validators.validDate, Validators.pastDate],
    status: [Validators.requiredString, Validators.status],
    discount: [Validators.required, Validators.number, Validators.maxNumber(100)],  
    date: [Validators.required, Validators.validDate],
    quantity: [Validators.required, Validators.integer, Validators.minNumber(1)],
};
