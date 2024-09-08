import dotenv from "dotenv";


dotenv.config();

const devApp = {
    dev: {
        port: process.env.SERVERPORT,
    
    db: {
        uri: process.env.DB_URI
    },
    
  },

};


export default devApp;