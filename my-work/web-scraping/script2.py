# import requests

from requests_html import HTMLSession


cookies = {
    'Hm_lvt_bf70f9f8f23b49912e2b91b0ff75936a': '1585977449',
    '__utmc': '44636966',
    '__utmz': '44636966.1585977455.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)',
    'JSESSIONID': '71A1FE0A6EAD1DD2A6C6271FAE3F33F2',
    '__utma': '44636966.1082036164.1585977455.1586156037.1586253410.3',
    '__utmb': '44636966.3.10.1586253410',
    'Hm_lpvt_bf70f9f8f23b49912e2b91b0ff75936a': '1586254530',
}

headers = {
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Referer': 'http://www.swzl.com/shiwuzhaoling_p310000.html',
    'Accept-Language': 'zh-CN,zh;q=0.9',
}
session = HTMLSession()

response = session.post('http://www.swzl.com/shiwuzhaoling_p310000.html', headers=headers, cookies=cookies, verify=False)


div = response.html.find('a.detailtextforAfromTaobao')
print(div)
print("\n")
