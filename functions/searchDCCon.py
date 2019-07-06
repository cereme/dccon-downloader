import json
from bs4 import BeautifulSoup 
import requests
import re
import base64
from multiprocessing.dummy import Pool as ThreadPool 

def get_base64_thumbnail(url):
    headers = {'referer': 'https://dccon.dcinside.com/'}
    img_data = requests.request('GET',url,headers=headers)
    return base64.b64encode(img_data.content).decode('utf-8')

def get_search_result(query_text, offset=0):
    def get_package(dccon):
        num = dccon.get('package_idx')
        thumbnail_url = dccon.find('img','thumb_img').get('src')
        thumbnail = get_base64_thumbnail(thumbnail_url)
        name = dccon.find('strong','dcon_name').get_text()
        seller = dccon.find('span','dcon_seller').get_text()
        return {
            'num': num,
            'thumbnail': thumbnail,
            'name': name,
            'seller': seller,
        }
    page = 1 + offset
    res = requests.get('https://dccon.dcinside.com/hot/%d/title/%s' % (page, query_text) )
    bs = BeautifulSoup(res.text, 'html.parser')
    dccons = bs.findAll('li','div_package')
    pool = ThreadPool(4) 
    search_result = pool.map(get_package,dccons)
    return search_result

def get_all_search_result(query_text):
    result = []
    offset = 0
    while True:
        data = get_search_result(query_text, offset)
        if data == []:
            break
        result.extend(data)
        offset += 1
    return result

def lambda_handler(event, context):
    query_text = event['query_text']
    data = get_all_search_result(query_text)
    return {
        'statusCode': 200,
        'body': json.dumps(data, ensure_ascii=False)
    }

res = lambda_handler({'query_text':'뱅드림'},None)
print(res)