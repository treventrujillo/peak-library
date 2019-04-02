const napsterAPI = 'https://api.napster.com';
const API_KEY = 'YWZkOTIxNzEtMmQ3OS00ZDA0LTk0MDctYjNhNTBlMDZlY2E4';
const oauthURL = `${napsterAPI}/oauth/authorize?client_id=${API_KEY}&response_type=code`;
const REDIRECT_URI = "http://localhost:9090/api/auth";

const width = 700;
const height = 400;
const left = (window.screen.width / 2) - (width / 2);
const top = (window.screen.height / 2) - (height / 2);

export default class Authentication {

    static authorized;

    constructor() {
        this.authorized = false;
    }

    checkToken = (tokenValid) => {
        if (tokenValid) {
            this.authorized = tokenValid;
        }
    }

    authenticate = () => {
        this.requestTempToken();
    }

    requestTempToken = () => {
        window.open(`${oauthURL}&redirect_uri=${REDIRECT_URI}`, 'Napster', `menubar=no, location=no, resizable=no, scrollbars=no,
            status=no, width=${width}, height=${height}, top=${top}, left=${left}`)
    }

    catchException = (error) => {
        console.log(error);
    }
}
