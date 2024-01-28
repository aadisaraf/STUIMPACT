# Upgrading pip
pip install
#  Installing the Python Requests library
pip install requests
# Installing the pytesseract library
pip install pytesseract
# Installing the PIL
pip install pillow
import requests
import pytesseract
import numpy as np

from PIL import Image
from scrapingbee import ScrapingBeeClient

client = ScrapingBeeClient(api_key'R3PM2S3UKNMJXMFQ3IVRA1JRL51JRJRTK3ZFTST03PWB5PXCXM1TK9ZJFLO3ULMRNGVMC55UJJ5VBRNM'=)


response = client.get(
	'https://smartinternz.com/',
	params={
    	'screenshot_full_page': True,
	}
)
if response.status_code == 200:
	with open('screenshot.png', 'wb') as f:
    	f.write(response.content)
    	print("Successfully saved the screenshot!")
else:
    print("Failed to fetch screenshot")

# Opening the image file
image=np.array(Image.open('screenshot.png'))
# Image Processing
import cv2norm_img = np.zeros((image.shape[0], image.shape[1]))
image = cv2.normalize(image, norm_img, 0, 255, cv2.NORM_MINMAX)
image = cv2.threshold(image, 100, 255, cv2.THRESH_BINARY)[1]
image = cv2.GaussianBlur(image, (1, 1), 0)
# Performing OCR
text=pytesseract.image_to_string(image)
# Print
print(text)
