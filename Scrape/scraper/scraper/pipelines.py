# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter


class ScraperPipeline:
    def process_item(self, item, spider):
        adptr = ItemAdapter(item)

        # Strip whitespaces from strings
        field_names = adptr.field_names()
        for fn in field_names:
            if fn != 'description':
                val = adptr.get(fn)
                adptr[fn] = val[0].strip()


        # Category & Product Type in lowercase
        lowercase_keys = ['category', 'product_type']
        for lk in lowercase_keys:
            val = adptr.get(lk)
            adptr[lk] = val.lower()


        # Price into float
        price_keys = ['price', 'price_excl_tax', 'price_incl_tax', 'tax']
        for pk in price_keys:
            val = adptr.get(pk)
            val = val.replace('£', '')
            adptr[pk] = float(val)


        ## Availability --> extract number of books in stock
        avail_str = adptr.get('availability')
        split_strArr = avail_str.split('(')
        if len(split_strArr) < 2:
            adptr['availability'] = 0
        else:
            avail_arr = split_strArr[1].split(' ')
            adptr['availability'] = int(avail_arr[0])


        # Reviews: string to int
        num_reviews_str = adptr.get('num_reviews')
        adptr['num_reviews'] = int(num_reviews_str)


        # Stars: string to int
        stars_str = adptr.get('stars')
        split_starsArr = stars_str.split(' ')
        stars_text_val = split_starsArr[1].lower()
        if stars_text_val == "zero":
            adptr['stars'] = 0
        elif stars_text_val == "one":
            adptr['stars'] = 1
        elif stars_text_val == "two":
            adptr['stars'] = 2
        elif stars_text_val == "three":
            adptr['stars'] = 3
        elif stars_text_val == "four":
            adptr['stars'] = 4
        elif stars_text_val == "five":
            adptr['stars'] = 5


        return item