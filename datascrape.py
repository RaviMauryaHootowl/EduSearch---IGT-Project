import requests
from bs4 import BeautifulSoup
URL = 'https://collegedunia.com/btech/maharashtra-colleges'
page = requests.get(URL)

soup = BeautifulSoup(page.content, 'html.parser')
res = soup.find_all(class_="clg-name-address")

for name in res:
  print(name.text)