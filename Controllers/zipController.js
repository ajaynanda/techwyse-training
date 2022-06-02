const zipadm = require('adm-zip')
const fs = require('fs');
const fetch = require('node-fetch');
const zipfile=((req,res)=>{
    return new Promise(async(resolve,reject)=>{
      try{
        const url=req.body.images
        const zip=new zipadm()
        const response = await fetch(url);
        const imagenormal='imagetest.jpg'
        const buffer = await response.buffer();
        console.log(buffer); 
        fs.writeFile(`./public/${imagenormal}`, buffer, () => 
          console.log('finished downloading!'));
        const outputFile = "imagenormal.zip";
        zip.addLocalFile(`./public/${imagenormal}`);
        zip.writeZip(outputFile);
        const data=zip.toBuffer()
        console.log(`Created ${outputFile} successfully`);
        req.imagebuffer=buffer
        req.zipfile=outputFile
        resolve(data)
      }catch(err){
        reject('error happened' +err)
      }
})
})
module.exports={zipfile}  