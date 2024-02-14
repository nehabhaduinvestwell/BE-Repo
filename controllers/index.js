const {logService, signService} = require('../services')
const {isValidPassword, isValidUsername} = require('../constants/index.js')
const jwt = require('jsonwebtoken') 
const secretKey= "secretKey";
const pdfFolderPath = '/home/nehabhadu/Git/frontend/src/media/pdfs';
const fs = require('fs');
// const pdfPath = '/home/nehabhadu/Git/frontend/public/pdfs/pdf1.pdf'
const path = require('path');

const loginController = async (req,res) => {

    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.send({
                success : false,
                message : "Enter email or password.",
                result : {}
            });
        }

        else{
            const loginData = {email,password};
            const loginServiceOutput = await logService(loginData);
            console.log("controllerresult----", loginServiceOutput);
            
            // console.log("testing----", name, " ", userID);
            
            if(loginServiceOutput === 'User not found!'){
                return res.send({
                    success: false,
                    message: "User not found",
                    loginServiceOutput : {},
                });
            }
            else if(loginServiceOutput === 'Incorrect Password'){
                return res.send({
                    success: false,
                    message: "Type correct password",
                    loginServiceOutput : {},
                });
            }
            else{
                const {name, userID}  = loginServiceOutput[0];
                const user = {userID, name, email};
                jwt.sign(user, secretKey, {expiresIn: '60s'}, (err, token)=>{
                    console.log("tokenlogin----",token);
                    res.cookie('token', token, {httpOnly: true});
                    return res.send({
                        success: true,
                        message: "logged In!",
                        loginServiceOutput,
                    });
                });
                // return res.send({
                //     success: true,
                //     message: "logged In!",
                //     loginServiceOutput
                // });
            }
        }
    }
    catch(error){
        console.log(error);
        return res.send({
            success: false,
            message: "Error",
            result: {},
        });
    }
}

const profileController = async (req,res) => {
    jwt.verify(req.token, secretKey, (err, authData)=>{
        console.log("req.token---", req.token);
        if(err){
            return res.send({
                success: false,
                message: "session expired",
                authData: {},
            });
        }
        else{
            if(!authData){
                console.log("undefined authData");
                return res.send({
                    success: false,
                    message: "session expired",
                    authData:  {}
                });
            }
            console.log("data sent to frontend");
            return res.send({
                success: true,
                message: "Token verified",
                authData
            });
        }
    });
}

const signupController = async (req,res) => {
    console.log("inside signupcontroller");

    try{
        const {name,email,password} = req.body; 
        const isValidEmail= email.substring(email.length-10, email.length);

        if(!name || !email || !password){
            return res.send({
                sucess : false,
                message : "Enter name, email or password.",
                result : {}
            })
        }

        else if(!(isValidUsername.test(name))){
            return res.send({
                success : false,
                message : "Enter a valid userName.",
                result : {}
            });
        }

        else if(!(isValidEmail === '@gmail.com')){
            return res.send({
                success : false,
                message : "Enter a valid mail address.",
                result : {}
            });
        }

        else if(!(isValidPassword.test(password))){
            return res.send({
                success : false,
                message : "Enter a valid password.",
                result : {}
            });
        }

        else{
            const signupData = {name,email,password};
            const signupSerivceOutput = await signService(signupData);

            if (signupSerivceOutput === 'Email already exists.'){
                return res.send({
                    success: false,
                    message: "User already exists!",
                    signupSerivceOutput
                });
            }
            else{
                return res.send({
                    success : true,
                    message : "User account created!",
                    signupSerivceOutput
                })
            }
        }
    }
    catch(error){
        console.log(error);
        return res.send({
            success:false,
            message : "Error in signup controller",
            result : {}
        })
    }
}

const policyController = async (req, res) => {
      
    try{
        console.log("folder path",pdfFolderPath);
        const files = fs.readdirSync(pdfFolderPath);
        const policies = [];
        let srNo = 0;
        files.map(file => {
            if(file.includes('.pdf')){
                srNo  += 1;
                const policy = {
                    srNo,
                    file
                } 
                policies.push(policy)
            }
        })
        console.log("policies sent");
        return res.send({
            success : true,
            message : "SUCCESS",
            policies
        })
    }catch(err){
      console.log(err);
      return res.send({
        success : false,
        message : "ERROR",
        policies: []
      })
    }
}

const pdfController = (req, res) => {
    try {
      const pdfPath = '/home/nehabhadu/Git/frontend/src/media/pdfs/pdf1.pdf';
      res.sendFile(path.resolve(pdfPath));
    } catch (err) {
      console.error(err);
      res.json({ error: 'error sending pdf' });
    }
};

// const pdfController = async(req, res) => {
//     try{
//         console.log("here");
//         res.send({
//             success : "true",
//             message : "pdf path sent",
//             pdfPath
//         }) 
//     }catch(err){
//          console.log(err);
//      }
// }

module.exports = {loginController,signupController, profileController, policyController, pdfController}