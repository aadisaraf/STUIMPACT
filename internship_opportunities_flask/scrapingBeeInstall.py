import requests
from scrapingbee import ScrapingBeeClient
import server

client = ScrapingBeeClient(api_key='NH07W9TZ6UWUI3YGDKE27YH736KMTFTLRN2PDK8G057JWGJ03ABA8DT7J0XVEY33JYTZ7P91XI8VVKPY')
urls = []
def send_request():
    response = requests.get(
        url="https://app.scrapingbee.com/api/v1/store/google",
        params={
            "api_key": "NH07W9TZ6UWUI3YGDKE27YH736KMTFTLRN2PDK8G057JWGJ03ABA8DT7J0XVEY33JYTZ7P91XI8VVKPY",
            "search": server.finalSearchQuery,
            "nb_results": "5"  # Set the number of results to 5
        },
    )
    print('Response HTTP Status Code:', response.status_code)

    if response.status_code == 200:
        # Parse the JSON content
        data = response.json()

        i = 0

        # Extract and print the URLs
        for result in data.get("organic_results", []):
            urls = result.get("url")
            screen = client.get(
                url=urls,
                params={
                    "screenshot_full_page": "true",
                },
            )

            if screen.status_code == 200:
                with open('screenshot{}.png'.format(i), 'wb') as f:
                    i += 1
                    f.write(screen.content)
                print("Image saved")

            else:
                print("Failed to save", screen.status_code)
            
                
            

send_request()
		

        



  
            

