from flask import Flask, request, jsonify
from flask_cors import CORS  # Import the CORS extension
import requests
from scrapingbee import ScrapingBeeClient
from threading import Thread

API_KEY = '7W07026UP5TUAVWMQB2L59FJCWI8W0DSNXMU6X6CZBWNYPSHSD9OFYWTP6KJ6G24K75Q937FBBRUUJOY'
client = ScrapingBeeClient(api_key=API_KEY)

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
                "api_key": API_KEY,
                "search": finalSearchQuery,
                "nb_results": "7"  # Set the number of results to 5 plus an error margin which will be used later in code
            },
        )
        print('Response HTTP Status Code:', response.status_code)
        # def getScreenshots(result, i):
        #     urls = result.get("url")
        #     screen = client.get(
        #         url=urls,
        #         params={
        #             "screenshot_full_page": "true",
        #         },
        #     )
        #     for blacklisted_element in blacklist:
        #         if blacklisted_element in screen.url:
        #             print("ITEM BLACKLISTED")
        #             continue #stops code from taking screenshots of these pages, and ensures uses another url, which is provided from the error margin itself
                
        #     if screen.status_code == 200:
        #         with open('screenshot{}.png'.format(i), 'wb') as f:
        #             i += 1
        #             f.write(screen.content)
                    
        #         print("Image saved")
        #     else:
        #         print("Failed to save", screen.status_code) 
        
        if response.status_code == 200:
            # Parse the JSON content
            data = response.json()

            i = 0

            
            blacklist = ["linkedin.com"]#BLACKLIST, ADD AND REMOVE AS NECESSARY

            # Extract and print the URLs
            for result in data.get("organic_results", []):
                # Thread(target=getScreenshots(result,i)).start()
                urls = result.get("url")
                
                screen = client.get(
                    url=urls,
                    params={
                        "screenshot_full_page": "true",
                    },
                )
                for blacklisted_element in blacklist:
                    
                    if blacklisted_element in screen.url:
                        print("ITEM BLACKLISTED")
                        continue #stops code from taking screenshots of these pages, and ensures uses another url, which is provided from the error margin itself
                    
                if screen.status_code == 200:
                    with open('screenshot{}.png'.format(i), 'wb') as f:
                        i += 1
                        f.write(screen.content)

                    # Extract text from screenshot using pytesseract and PIL
                    screenshot = Image.open(io.BytesIO(screen.content))
                    text = pytesseract.image_to_string(screenshot)
                    screenshot_texts.append(text)
                    screenshot_links.append('screenshot{}.png'.format(i))

                    print("Image OCR completed")
                else:
                    print("Failed to process OCR", screen.status_code)
                
        print(finalSearchQuery)
        return jsonify({'message': 'Data received successfully.'}), 200
    except Exception as e:
        print('Error processing data:', str(e))
        return jsonify({'error': 'Failed to process data.'}), 500
    

    


if __name__ == '__main__':
    app.run(debug=True, port=5000)
