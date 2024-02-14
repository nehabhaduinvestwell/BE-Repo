const isValidUsername = /^[A-Za-z ]+$/;
const isValidPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?!.*[^A-Za-z\d@]).{6,}$/;


module.exports = {isValidPassword, isValidUsername};