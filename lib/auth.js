const jwtDecode = require('jwt-decode');

const getUserFromToken = (token)=>{

   return jwtDecode(token).data;
}

module.exports = {
    getUserFromToken
}