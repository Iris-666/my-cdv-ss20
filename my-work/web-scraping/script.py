from requests_html import HTMLSession
import json
import codecs

#open the browser
session = HTMLSession()

#get the website
baseURL = "https://gaj.sh.gov.cn/shga/vZswwh/pagaList?pa=f2947ff5bf8fa99794765b38f1f50b7d734dd79a948b6724&page="

numbers = []
names = []
locations = []
types = []
times = []
features = []
all = []

for i in range(288):
    url = baseURL + str(i)
    # print('getting', url)
    page = session.get(url)
    #print(page.text)

    tr = page.html.find('tr.tr02')
    td = page.html.find("td")
    # print(len(td))

    # name = td[8]
    # print(name.text)
    index = 0
    for t in td:
        # print(str(index) + t.text)
        if index > 6:
            if index % 7 == 0:
                number = t.text
                # print(number)
                numbers.append(number)
            if (index - 1) % 7 == 0:
                name = t.text
                names.append(name)
            if (index - 2) % 7 == 0:
                location = t.text
                locations.append(location)
            if (index - 3) % 7 == 0:
                type = t.text
                types.append(type)
            if (index - 4) % 7 == 0:
                time = t.text
                times.append(time)
            if (index - 5) % 7 == 0:
                feature = t.text
                features.append(feature)

        index += 1

for i in range(len(numbers)):
    infoObject = {"number":numbers[i], "name":names[i], "location":locations[i],"type":types[i], "time":times[i],"feature":features[i]}
    all.append(infoObject)
# print(all)
# with codecs.open("data_file.json2", "w",encoding='utf-8') as write_file:
#     json.dump(all, write_file, indent=4)

with open("data_file3.json","w",encoding='utf-8') as f:
 json.dump(all,f,ensure_ascii=False,sort_keys=True, indent=4);
 print(u'loaded into file completion...');


# with open("data_file.json", "w") as write_file:
#     json.dump(data, write_file)
