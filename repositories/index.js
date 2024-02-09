const connection = require('./db')

const loginQuery = async (logData) => {
    return new Promise((resolve,reject) => {
        const {email} = logData;
        connection.query(`SELECT * FROM userData WHERE  email = ?`, [email], (error,result)=>{
            if(error){
                console.log(error);
                reject('error')
            }else{
                console.log("loginrepo ",result);
                resolve(result);
            }
        });
    }); 
};

const signupQuery = async (signData) => {
    return new Promise((resolve,reject)=>{
        const {email} = signData;

        connection.query(`SELECT * FROM userData WHERE email = ?`, [email], (error,result)=>{
            if(error){
                console.log(error)
                reject('error');
            }
            else{
                console.log("signup",result);
                resolve(result);
            }
        })
    })
}
const addUser= async(signData)=> {
    return new Promise((resolve,reject)=>{
        const {name, email, encryptedPassword, salt} = signData;
        console.log("repo pass- ", encryptedPassword);
        console.log("repo salt- ", salt);
        connection.query(`INSERT INTO userData(name,email,password,salt) VALUES(?,?,?,?)`, 
        [name,email,encryptedPassword,salt], (error,result)=>{
            if(error){
                reject('error');
            }
            else{
                resolve(result);
            }
        })
    })
}
module.exports = {loginQuery, signupQuery, addUser}


