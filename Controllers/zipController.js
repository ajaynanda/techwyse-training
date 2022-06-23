const zipadm = require('adm-zip')
const fs = require('fs');
const fetch = require('node-fetch');
const zipfile = ((req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(req.body);
      const url = req.body.images
      const zip = new zipadm()
      const response = await fetch(url);
      const imagenormal = 'imagetest.jpg'
      const buffer = await response.buffer();
      console.log(buffer);
      fs.writeFile(`./public/${imagenormal}`, buffer, () => console.log('finished downloading!'));
      const outputFile = "imagezipped.zip";
      const data = zip.toBuffer(outputFile)
      zip.addFile(`./public/${imagenormal}`,buffer)
      zip.writeZip(`./public/${outputFile}`);
      req.zipfile = outputFile
      req.url = url
      resolve(data)
    } catch (err) {
      reject('error happened' + err)
    }
  })
})
module.exports = { zipfile }  