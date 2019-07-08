from bs4 import BeautifulSoup
import requests
import urllib.request
data =  requests.get("https://twitter.com/tomamitycorless/status/997766042008113152?s=21").text

soup = BeautifulSoup(data, "html.parser")

#array of tags
img_data = soup.find_all("div", {"class": "AdaptiveMedia-photoContainer"})

for i in img_data:
  #saving images
    i  = i.find("img")['src']
    urllib.request.urlretrieve(i, i.replace("https://pbs.twimg.com/media/", ""))