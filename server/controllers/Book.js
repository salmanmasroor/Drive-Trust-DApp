const setBook = async(req,res)=>{
    if (!req.file) {
        res.send({ pic: 'Please upload your Cnic' });
      }
    else if (!req.file.filename.endsWith(".jpg") && !req.file.filename.endsWith(".png") && !req.file.filename.endsWith(".jpeg")) {
          res.send({ pic: "Only JPG, JPEG, and PNG files are allowed" });
      }
    else{
        res.send({ok:req.file.filename})
    }
}

module.exports = {setBook}