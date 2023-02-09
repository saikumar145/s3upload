const express = require("express");
const upload = require("express-fileupload");
const AWS = require("aws-sdk");


const app = express();
const PORT = 80;
app.set('view engine', 'ejs')

app.use(upload());
app.use(express.json());
app.get('/', async (req, res, next) => {
    res.render('index')
})
app.get('/create', async (req, res, next) => {
    res.render('create')
})

// Configure the SDK with AWS credentials
// AWS.config.update({
//     accessKeyId: '',
//     secretAccessKey: '',
//     region: 'ap-south-1'
// });
AWS.config.update({ region: 'ap-south-1' });
// s3 config
const s3 = new AWS.S3();
// uploading file
async function uploadFile(file) {
    const params = {
        Bucket: "ec2s3upload",
        Key: `uploads-${Date.now()}-${file.name}`,
        Body: file.data,
        // ACL: 'private'
        // ACL: "public-read",
    };
    const data = await s3.upload(params).promise();
    return data.Location;
}

app.post("/upload", async (req, res) => {
    try {
        console.log('req.files', req.files)
        const fileLocation = await uploadFile(req.files.uFile);
        console.log(fileLocation)
        res.send(fileLocation)
    } catch (error) {
        console.log(error)
        res.send('Error uploading file')
    }
});

app.post("/create", async (req, res) => {
    console.log('req', req.body.bucket)
    try {
        const bucketName = req.body.bucket
        var bucketParams = {
            Bucket: bucketName
        };
        s3.createBucket(bucketParams, function (err, data) {
            if (err) {
                console.log("Error", err);
                res.send('Error creating bucket ' + err)

            } else {
                console.log("Success", data);
                res.redirect("/")
            }
        });
    } catch (error) {
        console.log(error)
        res.send('Error creating bucket ' + error)

    }
})
app.get("/files", async (req, res) => {
    try {
        const data = await s3.listObjectsV2({ Bucket: "ec2s3upload" }).promise();
        console.log('list objects',data)
        let files = []
        data.Contents.forEach(content => {
            const fileParams = {
                Bucket: "ec2s3upload",
                Key: content.Key
            };

            data.Contents.forEach(content => {
                const url = s3.getSignedUrl('getObject', {
                    Bucket: "ec2s3upload",
                    Key: content.Key
                });
                console.log(url);
                files.push(url)
            });
        });
        res.render('files', { files });

        // res.redirect('/')
    } catch (error) {
        console.log(error)
        res.send('Error uploading file')
    }
})
app.listen(PORT, () => console.log(`server started at PORT: ${PORT}`));