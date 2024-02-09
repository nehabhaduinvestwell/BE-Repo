const { loginQuery, signupQuery, addUser}  = require("../repositories")
const crypto = require('crypto');
const { encryption } = require( "../utility");

// const encrpytLoginPassword = (result, inputPassword)=> {
//     const {myKey, initVector} = result[0];
//     const newKey = Buffer.from(myKey, 'hex');
//     console.log("newkey- ", newKey);
//     const newInitVector = Buffer.from(initVector, 'hex');
//     console.log("newInitVector- ", newInitVector);
//     const cipher = crypto.createCipheriv('aes-128-cbc', newKey, newInitVector);
//     let inputEncryptedPassword = cipher.update(inputPassword, 'utf-8', 'hex');
//     inputEncryptedPassword += cipher.final('hex');
//     console.log("inputencryptedpass- ", inputEncryptedPassword);
//     return inputEncryptedPassword;
// };

// const encryptSignupPassword= (password)=> {
//     let key = crypto.scryptSync(password, 'salt', 16);
//     let initVector = crypto.randomBytes(16);
//     const cipher = crypto.createCipheriv('aes-128-cbc', key, initVector);
//     console.log("cipher - ", cipher);
//     let encryptionKey = cipher.update(password, 'utf-8', 'hex');
//     encryptionKey += cipher.final('hex');
//     key = key.toString('hex');
//     initVector = initVector.toString('hex');
//     console.log("EK - ", encryptionKey);
//     console.log("initVector - ", initVector);
//     console.log("key - ", key);
//     return {encryptionKey, key, initVector};

// };



const logService = async (loginData) => {   
    const inputPassword = loginData.password;
    console.log("controllerinputpass- ", inputPassword);
    const result = await loginQuery(loginData);
    console.log("serviceresult- ", result);

    if(result.length>0) {
        const {password, salt}= result[0];
        const hash= crypto.createHash('sha256');
        const inputEncryptedPassword= encryption(inputPassword, salt);


        if (inputEncryptedPassword === password) {
            return result;
        }
        else{
            return 'Incorrect Password';
        }
    }
    else{
        return 'User not found!';
    }

};

const signService = async(signupData) => {
    const {name, email, password} = signupData;


    const checkUser = await signupQuery({name, email, password});
    if(checkUser.length > 0){
        return 'Email already exists.';
    }
    else {
        const salt= crypto.randomBytes(16).toString('hex');
        const encryptedPassword= encryption(password, salt);
        const result= await addUser({name, email, encryptedPassword, salt});
        return result;
    }
}

module.exports = {logService,signService}