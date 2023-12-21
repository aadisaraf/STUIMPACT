const axios = require('axios');

axios.get('https://app.scrapingbee.com/api/v1/store/google', {
    params: {
        'api_key': '2ZM4IM8LIKH7O15OI3Y5SB43Z863WNVRR5L0IJAJDL42B7H97UZFWB8UU2MWSQAPMBUEERV1OH07CZ35',
        'search': 'pizza new york',
    }
}).then(function (response) {
    // handle success
    console.log(response);
})