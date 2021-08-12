import csv
import sys
import re
from pprint import pprint
from collections import defaultdict, Counter

from fuzzywuzzy import fuzz, process

FILE_LOCATION = './restaurants.csv'

SPRINGS_RESTAURANTS = (
    'The Daily Poutine',
    'City Works Eatery & Pour House',
    'The Edison',
    "Enzo's Hideaway",
    "Erin McKenna's Bakery NYC",
    'T-REX ™',
    "Amorette's Patisserie",
    'Terralina Crafted Italian',
    'Paddlefish',
    'YeSake Kiosk',
    'Raglan Road™ Irish Pub and Restaurant',
    'Dockside Margaritas',
    'The Front Porch',
    'Sunshine Churros at Disney Springs West Side',
    'The BOATHOUSE®: Great Food, Waterfront Dining, Dream Boats™',
    'Marketplace Snacks',
    'Splitsville Dining Room',
    'AMC® Disney Springs 24 Dine-In Theatres',
    'Wolfgang Puck® Express at Disney Springs Marketplace',
    'D-Luxe Burger',
    "Gideon's Bakehouse",
    'Cookes of Dublin',
    'AristoCrêpes',
    'Häagen-Dazs® Kiosk at Disney Springs West Side',
    "Chef Art Smith's Homecomin'",
    'Sunshine Churros at Disney Springs Marketplace',
    'Ghirardelli Soda Fountain & Chocolate Shop',
    "Blaze Fast-Fire'd Pizza",
    'Paradiso 37, Taste of the Americas',
    'Stargazers Bar',
    "B.B. Wolf's Sausage Co.",
    'STARBUCKS® at Disney Springs West Side',
    'Jaleo by José Andrés',
    'Pepe by José Andrés',
    'MacGUFFINS',
    "Wetzel's Pretzels Kiosk at Disney Springs West Side",
    'Sprinkles',
    'The Basket at Wine Bar George',
    'Lava Lounge at Rainforest Cafe®',
    "Joffrey's Handcrafted Smoothies at Disney Springs Marketplace",
    "Maria & Enzo's Ristorante",
    'Pizza Ponte',
    'STK Orlando',
    'Frontera Cocina',
    'Wine Bar George – A Restaurant & Bar',
    'Planet Hollywood',
    'Morimoto Asia Street Food',
    'Disney Food Trucks',
    'Earl Of Sandwich®',
    '4 Rivers Cantina Barbacoa Food Truck',
    'Rainforest Cafe® at Disney Springs Marketplace',
    'Chicken Guy!',
    'Beatrix',
    'House of Blues Restaurant & Bar',
    'The Smokehouse at House of Blues',
    'Wolfgang Puck Bar & Grill',
    'Morimoto Asia',
    "Wetzel's Pretzels Kiosk at Disney Springs Marketplace",
    'Coca-Cola Store Rooftop Beverage Bar',
    "Joffrey's Coffee & Tea Company® at The Landing at Disney Springs",
    'The Polite Pig',
    'STARBUCKS® at Disney Springs Marketplace',
    'Vivoli il Gelato',
    "Jock Lindsey's Hangar Bar"
)

def rawselect(prompt, choices):
    # Return choice
    while True:
        print(prompt)
        i = 1
        for choice in choices:
            print(str(i)+": "+choice)
            i += 1
        resp = input()
        try:
            if resp == "":
                return choices[0]
            else:
                response = int(resp) - 1
                return choices[response]
        except:
            return resp


def confirm(prompt):
    # Return true/false
    print(prompt+" [Y/n]")
    key = input()
    return key == "" or key == "Y" or key == "y"


answers_list = []

counter = 0
with open(FILE_LOCATION, 'r') as read_obj:
    csv_reader = csv.reader(read_obj)
    for row in csv_reader:
        counter += 1
        clean_row = list(set([x for x in row if x]))
        for x in clean_row:
            answers_list.append(x)

answer_counter = Counter(answers_list)
with open('restaurants_out.csv', 'w') as csvfile:
    csv_writer = csv.writer(csvfile)
    for x in sorted(SPRINGS_RESTAURANTS):
        hit = answer_counter[x]
        percentage = int(hit * 100.0 / counter)
        csv_writer.writerow([x, hit, percentage])
        # print(f'{x} - {hit} {percentage}')

# not_in_answers_set = set(not_in_answers_list)
# not_in_answers_count = Counter(not_in_answers_list)
# print(not_in_answers_count)
# print(len(not_in_answers_list))