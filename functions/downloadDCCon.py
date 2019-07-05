import json
from bs4 import BeautifulSoup 
import requests
import zipfile
import os

def get_dccon_data(dccon_num):
    url = "https://dccon.dcinside.com/index/package_detail"
    payload = f"-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"package_idx\"\r\n\r\n{dccon_num}\r\n-----011000010111000001101001--\r\n"
    headers = {
        'content-type': "multipart/form-data; boundary=---011000010111000001101001",
        'x-requested-with': "XMLHttpRequest"
    }
    response = requests.request("POST", url, data=payload, headers=headers)
    return json.loads(response.content)

def save_dccon(dccon_data):
    url = "https://dcimg5.dcinside.com/dccon.php"
    headers = {'referer': 'https://dccon.dcinside.com/'}
    os.mkdir(f'./dccon')
    with open(f'./dccon/info.json','w') as f:
        f.write(json.dumps(dccon_data['info'], ensure_ascii=False))
    
    #TODO: better speed with async / multi-thread
    for dccon in dccon_data['detail']:
        query_string = {'no': dccon['path']}
        img_data = requests.request('GET',url,headers=headers,params=query_string)
        with open(f'./dccon/{dccon["title"]}.{dccon["ext"]}','wb') as img:
            img.write(img_data.content)

def zip_dccon(name):
    with zipfile.ZipFile(f'./{name}.zip', 'w') as _z:
        for file in os.listdir('./dccon/'):
            _z.write(f'./dccon/{file}', f'/{file}',compress_type=zipfile.ZIP_DEFLATED)

def lambda_handler(event, context):
    dccon_num = event['dccon_num']
    data = get_dccon_data(dccon_num)
    title = data["info"]["title"]
    print(title)
    save_dccon(data)
    zip_dccon(title)
    #TODO: encode & send
    return {
        'statusCode': 200,
        'body': None
    }
    