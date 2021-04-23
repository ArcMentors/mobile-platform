import config from '../config';
import Auth from '@aws-amplify/auth';
import { API } from "aws-amplify";


const ApiHelper = {
    apiPath: config.apiGateway.URL,

    getUserData: function(name) {
        return API.get("apis", name);
    },

    setUserData: function(name, data) {
        return API.post("apis", name, {body: data});        
    },


}

export default ApiHelper;