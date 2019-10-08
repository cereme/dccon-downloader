import json
from bs4 import BeautifulSoup 
import requests
import zipfile
import os
import base64
import aiohttp
import asyncio

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
    if os.path.exists('/tmp/dccon'):
        d='/tmp/dccon'
        filesToRemove = [os.path.join(d,f) for f in os.listdir(d)]
        for f in filesToRemove:
            os.remove(f)
    else:
        os.mkdir(f'/tmp/dccon')
    with open(f'/tmp/dccon/info.json','w') as f:
        f.write(json.dumps(dccon_data['info'], ensure_ascii=False))
    
    async def download_single_dccon(dccon):
        query_string = {'no': dccon['path']}
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers, params=query_string) as res:
                with open(f'/tmp/dccon/{dccon["title"]}.{dccon["ext"]}','wb') as img:
                    img.write(await res.read())
    
    dccon_requests = [download_single_dccon(dccon) for dccon in dccon_data['detail']]
    loop = asyncio.get_event_loop()
    loop.run_until_complete(asyncio.wait(dccon_requests))

def zip_dccon(name):
    with zipfile.ZipFile(f'/tmp/{name}.zip', 'w') as _z:
        for file in os.listdir('/tmp/dccon/'):
            _z.write(f'/tmp/dccon/{file}', f'/{file}',compress_type=zipfile.ZIP_DEFLATED)

def lambda_handler(event, context):
    dccon_num = event['dccon_num']
    try:
        data = get_dccon_data(dccon_num)
    except json.JSONDecodeError:
        return {
            'statusCode': 400
        }
    title = data["info"]["title"]
    save_dccon(data)
    zip_dccon(title)
    return {
        'statusCode': 200,
        'body': base64.b64encode(open(f'/tmp/{title}.zip', 'rb').read()).decode('utf-8'),
        'filename': f'{title}.zip',
    }