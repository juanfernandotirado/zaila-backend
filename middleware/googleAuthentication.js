const jwt = require('jsonwebtoken');
const axios = require('axios')
var jwkToPem = require('jwk-to-pem')

exports.validateGoogleToken = (req, res, next) => {

    //console.log(req.path)

    let token = req.headers.authorization != undefined ? req.headers.authorization.split(" ")[1]  : "";
    //console.log("token---", token);
    if (token) {
        let header = token.split(".")[0];   
        //console.log("header----", header);
        let payload = token.split(".")[1];
        //console.log('payload---', payload);
    
        let decodedHeader = JSON.parse(new Buffer(header, "base64").toString("ascii"));
        //console.log('decoded----', decodedHeader);
        //console.log('kid----', decodedHeader.kid);
    
        let decodedPayload = JSON.parse(new Buffer(payload, "base64").toString("ascii"));
        console.log('decoded----', decodedPayload);
        //console.log('issuer----' + decodedPayload.iss)
      
        if (decodedPayload.iss === 'https://accounts.google.com') {
    
            axios.get("https://www.googleapis.com/oauth2/v3/certs")
            .then(result => {
                //console.log(result.data)
                var publicKey = jwkToPem(result.data.keys.find(key => key.kid === decodedHeader.kid));
                //console.log(publicKey);
        
                jwt.verify(token, publicKey, (err, decoded) => {
                    if (err) {
                    console.log(err);
                    res.send(err);
                    } else {
                        //console.log('===>', decoded)
                        if (req.path === '/registerUser') {
                            req.body.user = {
                                email : decodedPayload.email,
                                preferredLanguage : 'en-US',
                                name : decodedPayload.name,
                                profileUrl : decodedPayload.picture,
                                iss: 'Google'
                              }
                              
                        } else {
                            req.body = {
                                email: decodedPayload.email,
                                iss: 'Google'
                            }
                            
                        }
                        //console.log('body----> ', req.body)
                        next();
                    }
                });
        
            })
            .catch(error => {
              console.log(error);
              res.send(error)
            });
        }
      
    } else {
        next();    
    }
}

