const express = require("express");
const router = express.Router();
const aws = require('aws-sdk')



router.get('/sign-s3', (req, res) => {
    const s3 = new aws.S3();
    const fileName = req.query['fileName'];
    const fileType = req.query['fileType'];
    aws.config.region = 'us-west-2';
    const s3Params = {
        Bucket: process.env.S3_BUCKET,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read'
    };
  
    console.log(`calling s3 to get Signed url for ${fileName}`)
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if(err){
            console.log(err);
            return res.end();
        }
        const returnData = {
            signedRequest: data,
            url: `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${fileName}`
        };
        console.log(returnData)
        res.send(JSON.stringify(returnData));
        
    });
  });

exports.storageRouter = router;