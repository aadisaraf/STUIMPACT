import requests

def send_request():
    response = requests.get(
        url="https://app.scrapingbee.com/api/v1/store/google",
        params={
            "api_key": "85APE50M3YAGCTXNI6HG33YA3WQXMH9G0PD9QJMP8UN5PRULINX3GME2BYV4DK5M1MOMXQDK11IJPG4Z",
            "search": "11th Grade internship opportunities for Computer and Technology, Healthcare, Business, in Sammamish, Washington, US",
        },

    )
    print(response.links)
    print('Response HTTP Status Code: ', response.status_code)
    print('Response HTTP Response Body: ', response.content)
send_request()