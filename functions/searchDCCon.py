import json
from bs4 import BeautifulSoup 
import requests

def get_search_result(query_text, offset=0):
    page = 1 + offset
    res = requests.get('https://dccon.dcinside.com/hot/%d/title/%s' % (page, query_text) )
    bs = BeautifulSoup(res.text, 'html.parser')
    search_result = []
    dccons = bs.findAll('li','div_package')
    for dccon in dccons:
        num = dccon.get('package_idx')
        thumbnail = dccon.find('img','thumb_img').get('src')
        name = dccon.find('strong','dcon_name').get_text()
        seller = dccon.find('span','dcon_seller').get_text()
        search_result.append({
            'num': num,
            'thumbnail': thumbnail,
            'name': name,
            'seller': seller,
        })
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