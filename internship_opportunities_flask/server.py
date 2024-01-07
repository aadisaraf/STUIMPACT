from flask import Flask, request, jsonify
from flask_cors import CORS  # Import the CORS extension
import requests
from scrapingbee import ScrapingBeeClient


client = ScrapingBeeClient(api_key='NH07W9TZ6UWUI3YGDKE27YH736KMTFTLRN2PDK8G057JWGJ03ABA8DT7J0XVEY33JYTZ7P91XI8VVKPY')

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/save_data', methods=['POST'])
def save_data():
    try:
        data = request.get_json()
        location = data.get('location')
        selectedGrade = data.get('selectedGrade')
        selectedInternshipTypes = data.get('selectedInternshipTypes')
        
        # Your logic to save or process the data goes here
        print('Received data - Location:', location)
        print('Received data - Grade:', selectedGrade)
        print('Received data - Internship Types:', selectedInternshipTypes)
        #get a search-able list of Internship Types
        listInternshipTypes= ""
        for x in selectedInternshipTypes:
            y=x+", "
            listInternshipTypes+=y
        #Get the Location in the common form
        city = location.get('city', '')
        state = location.get('state', '')
        country = location.get('country', '')

        formatted_location = f"{city}, {state}, {country}"
        finalSearchQuery = selectedGrade + " internship opportunities for "+listInternshipTypes+"in "+formatted_location
        
        response = requests.get(
            url="https://app.scrapingbee.com/api/v1/store/google",
            params={
                "api_key": "NH07W9TZ6UWUI3YGDKE27YH736KMTFTLRN2PDK8G057JWGJ03ABA8DT7J0XVEY33JYTZ7P91XI8VVKPY",
                "search": finalSearchQuery,
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
            
        print(finalSearchQuery)
        return jsonify({'message': 'Data received successfully.'}), 200
    except Exception as e:
        print('Error processing data:', str(e))
        return jsonify({'error': 'Failed to process data.'}), 500
    

    


if __name__ == '__main__':
    app.run(debug=True, port=5000)
