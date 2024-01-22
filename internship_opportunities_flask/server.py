from flask import Flask, request, jsonify
from flask_cors import CORS  # Import the CORS extension
import requests
from scrapingbee import ScrapingBeeClient


client = ScrapingBeeClient(api_key='F3MF64TZTX1GFU4HZWHNVT6SE7XUOL4OXYZJRU6ZJSJMG4R8VRT5CZ9G85RH4XFVZ2DLCTMGS18DF27J')

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
                "api_key": "F3MF64TZTX1GFU4HZWHNVT6SE7XUOL4OXYZJRU6ZJSJMG4R8VRT5CZ9G85RH4XFVZ2DLCTMGS18DF27J",
                "search": finalSearchQuery,
                "nb_results": "10"  # Set the number of results to 5 plus an error margin which will be used later in code
            },
        )
        print('Response HTTP Status Code:', response.status_code)

        if response.status_code == 200:
            # Parse the JSON content
            data = response.json()

            i = 0

            
            blacklist = ["linkedin.com"]#BLACKLIST, ADD AND REMOVE AS NECESSARY
            TAKEN_SITE_SCREENSHOTS = 0

            # Extract and print the URLs
            for result in data.get("organic_results", []):
                urls = result.get("url")
                
                screen = client.get(
                    url=urls,
                    params={
                        "screenshot_full_page": "true",
                    },
                )
                for blacklisted_element in blacklist:
                    if TAKEN_SITE_SCREENSHOTS==5:
                        break
                    if blacklisted_element in screen.url:
                        print("ITEM BLACKLISTED")
                        continue #stops code from taking screenshots of these pages, and ensures uses another url, which is provided from the error margin itself
                    
                if screen.status_code == 200:
                    with open('screenshot{}.png'.format(i), 'wb') as f:
                        i += 1
                        f.write(screen.content)
                    print("Image saved")
                    TAKEN_SITE_SCREENSHOTS +=1
                else:
                    print("Failed to save", screen.status_code)
                
        print(finalSearchQuery)
        return jsonify({'message': 'Data received successfully.'}), 200
    except Exception as e:
        print('Error processing data:', str(e))
        return jsonify({'error': 'Failed to process data.'}), 500
    

    


if __name__ == '__main__':
    app.run(debug=True, port=5000)
