const jwt = require('jsonwebtoken'); 

const secret = 'test';

exports.auth = async (req, res, next) => {

  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);

      console.log(`DECODED DATA ${decodedData}`);

      if(decodedData.id == null){
        console.log(`error occured`); 
      }
      req.userId = decodedData.id;

    } else {
        
      decodedData = jwt.decode(token);

      if(decodedData.sub == null){
        console.log(`error occured`);
      }
      req.userId = decodedData.sub;
    }    

    next();
    
  } catch (error) {
    console.log(error);
  }
  
};
