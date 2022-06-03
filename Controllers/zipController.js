const zipadm = require('adm-zip')
const fs = require('fs');
const fetch = require('node-fetch');
const zipfile = ((req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
     
      const url = "https://workluge-work-files.s3.ap-south-1.amazonaws.com/files/pexels-flickr-145939.jpg" //req.body.images
      const zip = new zipadm()
      console.log("hello");
      const response = await fetch(url);
      console.log("url called");
      const imagenormal = 'imagetest.jpg'
      const buffer = await response.buffer();
      console.log(buffer);
    
    
      fs.writeFile(`./public/${imagenormal}`, buffer, () => console.log('finished downloading!'));
      const outputFile = "imagezipped.zip";
      const bufer= new Buffer.from(outputFile).toString('base64')
      console.log(bufer);
      zip.addLocalFile(`./public/${imagenormal}`);
      zip.writeZip(outputFile);
      const data = zip.toBuffer(outputFile)
      req.imagebuffer = bufer
      req.zipfile = outputFile
      req.url = url
      resolve(data)
    } catch (err) {

      reject('error happened' + err)
    }
  })
})
module.exports = { zipfile }  