exports.UserResponseDto = class UserResponseDto {
  firstName;
  lastName;
  email;
  token;
  isVerified;
  constructor(data) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.token = data.token;
    this.isVerified = data.isVerified;
  }
};
