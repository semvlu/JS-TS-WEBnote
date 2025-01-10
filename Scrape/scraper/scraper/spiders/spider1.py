import scrapy


class Spider1Spider(scrapy.Spider):
    name = "spider1"
    allowed_domains = ["books.toscrape.com"]
    start_urls = ["https://books.toscrape.com"]

    def parse(self, response):
        # books = response.css('<element>.<class>')
        books = response.css('article.product_pod')
        for book in books:
            yield {
                # book.css('<elem> <subElem>::text').get()
                'name' : book.css('h3 a::text').get(),
                # book.css('.<1esubClass> .<2esubClass>::text').get()
                'price' : book.css('.product_price .price_color::text').get(),
                'url' : book.css('h3 a').attrib['href'],
            }
        nextPg=response.css('li.next a ::attr(href)').get()

        if nextPg is not None:
            if 'catalogue/' in nextPg:
                # remember / in the end
                nextPgUrl='https://books.toscrape.com/' + nextPg
            else: nextPgUrl='https://books.toscrape.com/catalogue/' + nextPg
            yield response.follow(nextPgUrl, callback=self.parse)
