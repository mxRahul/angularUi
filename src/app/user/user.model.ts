export class Users {
    public firstName: string;
    public lastName: string;
    public userName: string;
    public password: string;
    public age: number;
    public city: string;
    public email: string;
    public mobile: number;

    // tslint:disable-next-line:max-line-length
    constructor(firstName: string, lastName: string, userName: string, password: string, age: number, city: string, email: string, mobile: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.password = password;
        this.age = age;
        this.city = city;
        this.email = email;
        this.mobile = mobile;
    }
}
