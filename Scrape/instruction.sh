python -m venv venv # create venv
source venv/bin/activate # activate 

# spider setup
scrapy startproject <name>
cd <name>/<name>/spiders
scrapy genspider <spiderName> <websiteTBscraped>

# python shell
pip install ipython
# <name>/scrapy.cfg:
[settings]
shell = ipython
# Enter shell
scrapy shell
fetch('url')
books = response.css('<element>.<class>')
response.css('<element>.<class>').get() # get 1e elem
len(books)
_1 = books[0]
# get text
_1.css('<elem> <subElem>::text').get()
_1.css('.<1esubClass> .<2esubClass>::text').get()

# get href
_1.css('h3 a').attrib['href']

# exit shell
exit

# ------- put ex supra in spider.parse() ------
# run spider
scrapy crawl <spider.name>
# save in a file
scrapy crawl <spider.name> -o <filename>.csv/json