from flask import Flask, request, jsonify
from flask_cors import CORS  # Import the CORS extension

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
        print(finalSearchQuery)
        return jsonify({'message': 'Data received successfully.'}), 200
    except Exception as e:
        print('Error processing data:', str(e))
        return jsonify({'error': 'Failed to process data.'}), 500
    

if __name__ == '__main__':
    app.run(debug=True, port=5000)
