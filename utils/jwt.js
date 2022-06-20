var jwt = require('jsonwebtoken');

const createJWT = async (obj) => {
    const token = await jwt.sign(obj, process.env.JWT_SECRET)
    return token
  }
  
  const generateToken = async (obj) => {
    try {
      let tokenInfo = {
        user_id: obj.user_id,
        email: obj.email,
        fname: obj.fname,
        lname: obj.lname,
      }
      const jwt = await createJWT(tokenInfo)
      return jwt
      //console.log(jwt);
      

    } catch (err) {
      logger.error('Error in generateToken', err)
    }
  }

  const verifyToken = async (token) => {
    try {
      const decodeToken = await jwt.verify(token, process.env.JWT_SECRET)
      delete decodeToken.iat
      return decodeToken
      //return true
      //console.log(decodeToken)
    } catch (err) {
      logger.error('Error in verifyToken', err)
      return false
    }
  }

  module.exports = {
    createJWT,
    generateToken,verifyToken}