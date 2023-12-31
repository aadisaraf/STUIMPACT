import requests
import scrapingBee

urls = []
def send_request():
    response = requests.get(
        url="https://app.scrapingbee.com/api/v1/store/google",
        params={
            "api_key": "85APE50M3YAGCTXNI6HG33YA3WQXMH9G0PD9QJMP8UN5PRULINX3GME2BYV4DK5M1MOMXQDK11IJPG4Z",
            "search": "11th Grade internship opportunities for Computer and Technology, Healthcare, Business, in Sammamish, Washington, US",
            "nb_results": "5"  # Set the number of results to 5
        },
    )

    if response.status_code == 200:
        # Parse the JSON content
        data = response.json()
        

        # Extract and print the URLs
        for result in data.get("organic_results", []):
            urls = result.get("url")
            response = requests.get(
                url='https://app.scrapingbee.com/api/v1/',
                params={
                    'api_key': '85APE50M3YAGCTXNI6HG33YA3WQXMH9G0PD9QJMP8UN5PRULINX3GME2BYV4DK5M1MOMXQDK11IJPG4Z',
                    'url': urls, 
                    'screenshot_full_page': 'true', 
            },
        
            )
        


send_request()


  
            

