*Python Script Overview*
Purpose..
The Python script serves as a Flask API for extracting text from screenshots of web pages based on user inputs. It integrates with external services to fetch relevant web pages, captures screenshots, and performs optical character recognition (OCR) to extract text.

YOU MUST DOWNLOAD TESSERACT ON DESKTOP FOR THIS APPLICATION TO WORK, https://github.com/UB-Mannheim/tesseract/wiki


Dependencies..
Flask: A micro web framework for building web applications in Python.
requests: A library for making HTTP requests.
pytesseract: A Python wrapper for the Tesseract OCR engine.
Pillow: A Python Imaging Library (PIL) fork for image processing.

Installation..
Install dependencies using pip:

pip install Flask requests pytesseract Pillow
Ensure Tesseract OCR Engine is installed on your system.
Usage
Run the Flask server:

python app.py

Send a POST request to /api/save_data with JSON payload containing user inputs (location, grade, internship types).
The API will extract text from screenshots and return the extracted text along with corresponding screenshot links.

Key Features...
Web Scraping: Fetches relevant web pages using an external service (scrapingbee.com).
Screenshot Capture: Takes screenshots of web pages using the requests library.
Text Extraction: Performs OCR on screenshots to extract text using pytesseract.
Response Formatting: Returns extracted text and screenshot links in a JSON response.
Future Enhancements
Improve error handling and logging.
Implement caching for frequently accessed web pages to reduce API calls.
Enhance OCR accuracy and performance.
