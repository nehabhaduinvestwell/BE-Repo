const {logService, signService} = require('../services')
const {isValidPassword, isValidUsername} = require('../constants/index.js')
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
            console.log("controllerresult", loginServiceOutput);
            
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
                return res.send({
                    success: true,
                    message: "logged In!",
                    loginServiceOutput
                });
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

module.exports = {loginController,signupController}