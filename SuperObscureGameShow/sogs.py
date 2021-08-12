import csv
import sys
import re
from pprint import pprint
from collections import defaultdict, Counter

from fuzzywuzzy import fuzz, process

MATCH_THRESHOLD = 65
FILE_LOCATION = './The-Super-Obscure-Survey(2020-07-10).csv'

FASTPASS_ANSWERS = ('Alien Swirling Saucers',
                    'Avatar Flight of Passage',
                    'Big Thunder Mountain Railroad',
                    'Beauty and the Beast - Live on Stage',
                    "Buzz Lightyear's Space Ranger Spin",
                    'DINOSAUR',
                    'Disney & Pixar Short Film Festival',
                    'Disney Junior Dance Party!',
                    'Dumbo the Flying Elephant',
                    'Epcot Forever',
                    'Enchanted Tales with Belle',
                    'Expedition Everest',
                    'Fantasmic!',
                    'Festival of the Lion King',
                    'Finding Nemo - The Musical',
                    'Frozen Ever After',
                    'For the First Time in Forever: A Frozen Sing-Along Celebration',
                    'Haunted Mansion',
                    'Indiana Jones Epic Stunt Spectacular!',
                    "it's a small world",
                    "It's Tough to be a Bug!",
                    'Journey Into Imagination With Figment',
                    'Jungle Cruise',
                    'Kali River Rapids',
                    'Kilimanjaro Safaris',
                    'Living with the Land',
                    'Mad Tea Party',
                    'Meet Ariel at her Grotto',
                    'Meet Cinderella and Elena - Princess Fairytale Hall',
                    'Meet Mickey Mouse and Minnie Mouse - Town Square Theater',
                    'Meet Rapunzel and Tiana - Princess Fairytale Hall',
                    'Meet Tinker Bell - Town Square Theater',
                    'Meet Favorite Disney Pals at Adventurers Outpost',
                    "Mickey's PhilharMagic",
                    "Mickey & Minnie's Runaway Railway",
                    'Millennium Falcon: Smugglers Run',
                    'Mission: SPACE',
                    'Monsters, Inc. Laugh Floor',
                    'Muppet*Vision 3D',
                    "Na'vi River Journey",
                    "Peter Pan's Flight",
                    'Pirates of the Caribbean',
                    'Primeval Whirl',
                    'Rivers of Light',
                    "Rock 'n' Roller Coaster Starring Aerosmith",
                    'Seven Dwarfs Mine Train',
                    "Soarin' Around the World",
                    'Space Mountain',
                    'Spaceship Earth',
                    'Slinky Dog Dash',
                    'Splash Mountain',
                    'Star Tours – The Adventures Continue',
                    'Test Track Presented by Chevrolet',
                    'The Animation Experience at Conservation Station',
                    'The Barnstormer',
                    'The Magic Carpets of Aladdin',
                    'The Many Adventures of Winnie the Pooh',
                    'The Seas with Nemo & Friends',
                    'The Twilight Zone Tower of Terror',
                    'Tomorrowland Speedway',
                    'Toy Story Midway Mania!',
                    'Turtle Talk With Crush',
                    'Under the Sea ~ Journey of The Little Mermaid',
                    'Up! A Great Bird Adventure',
                    'Voyage of The Little Mermaid')

FP_ANS_KEY = 'Name as many attractions as you can that had FastPass+ as of March 1, 2020 (i.e., before the parks closed).'
DIRECT_KEYS = [
    'Children leaving this location are given a bookmark to commemorate their visit',
    'Belle and Aurora trade off meeting at this Epcot pavilion',
    'This Hollywood Studios restaurant features a princess, among other characters',
    'Jasmine can often be found with Aladdin at a space in this Adventureland shopping area',
    'One princess was evicted to make way for four in this location that opened in 2013',
    'Originally named after the King from a 1959 film',
    'This seasonally themed location took the space of an entire Epcot pavilion expansion pad',
    'This closed location featured North American animals',
    "It’s original location opened in 1996 relatively close to its current location that opened in 2012",
    'This location is based on a fortress from the 13th Century',
    "You’ll be wishing you’d bought some caramel corn right next door while waiting for Snow White at this pavilion",
    'This location was once called Spoodles',
    'Horizons - 1983',
    'Splash Mountain - 2018',
    'Spaceship Earth - 1982',
    'Space Mountain - 1975',
    'The Land - 1982',
    'The Living Seas - 1986',
    'IllumiNations: Reflections of Earth - 2007',
    'Captain Eo - 1986',
    "it’s a small world - 1991",
    'Enchanted Tiki Room - 1971',
    'Tomorrowland Transit Authority - 2005',
    'Wonders of Life - 1989',
    'World of Motion - 1982',
    "Rock’n’Rollercoaster - 2008",
    'Dinosaur - 1998',
    'If You Had Wings - 1972',
    'Person #1',
    'Person #2',
    "Person #3 (or at least, who this *should* be)",
    'Person #4',
    'Person #5',
    'Person #6',
    'Person #7',
    'Person #8',
    'Person #9',
    'Person #10',
    'Person #11',
    'Person #12',
    'Person #13',
    'Person #14',
    'Person #15',
    'Person #16',
    'Person #17',
    'Person #18',
]
DIRECT_ANSWERS = [
    'Enchanted Tales With Belle',
    'France',
    'Hollywood & Vine',
    'Agrabah Bazaar',
    'Princess Fairytale Hall',
    'Cinderella’s Royal Table',
    'Royal Sommerhus',
    'Pocahontas and her Forest friends',
    "Ariel’s Grotto",
    'Akershus Royal Banquet Hall and Restaurant',
    "Germany",
    'Trattoria Al Forno',
    'General Electric',
    'Ziploc',
    'Bell Systems',
    'RCA',
    'Kraft',
    'United Technologies',
    'Siemens',
    'Kodak',
    "Mattel",
    'Florida Citrus Growers',
    'Alamo',
    'MetLife',
    'General Motors',
    "Hanes",
    'McDonald’s',
    'Eastern Airlines',
    'Patrick Warburton',
    'Neil Patrick Harris',
    "Ellen Degeneres",
    'Martin Short',
    'Gilbert Gottfried',
    'Robin Williams ',
    'Gina Torres',
    'Phylicia Rashad',
    'John Michael Higgins',
    'Allison Janney',
    'Michael Jackson',
    'Michael Richards',
    'Judi Dench',
    'Rhea Perlman',
    'Kevin Pollack',
    'Tone Loc',
    'Jon Lovitz',
    'Gary Carter',
]

def parse_input_file(input_file, key_field=None, skip_blank_rows=True):
    input_data = []
    if sys.version_info[0] < 3:  # Python 2.x
        infile = open(input_file, 'rb')
    else:
        infile = open(input_file, newline='\n', encoding='utf8')

    with infile as csvfile:
        reader = csv.reader(csvfile, delimiter=',', quotechar='"')
        headerline = reader.next() if sys.version_info[0] < 3 else next(reader)
        keys = [cell.strip() for cell in headerline]
        for line in reader:
            if skip_blank_rows and all(x == '' for x in line):
                continue
            input_data.append(dict(zip(keys, line)))
    if input_data:
        while all(x == '' for x in input_data[-1].values()):
            input_data.pop()

    if key_field and key_field in keys:
        result = {}
        for x in input_data:
            result[x[key_field]] = x
        return result
    else:
        return input_data

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

def _merge_counter(in_counter: Counter, accepted_answer):
    in_dict = dict(in_counter)
    cleaned_answers = Counter()
    is_accepted_tuple = isinstance(accepted_answer, tuple)
    manual_matches = {}
    if not is_accepted_tuple:
        print(f'\n\n\n**** NEW QUESTION ***\n\nThe actual answer is {accepted_answer}\n')
    for answer, answer_count in in_dict.items():
        is_matching_answer = answer in accepted_answer if is_accepted_tuple else answer == accepted_answer
        if is_matching_answer:
            cleaned_answers[answer] += answer_count
        else:
            if is_accepted_tuple:
                (sort_match, sort_score) = process.extractOne(a, FASTPASS_ANSWERS, scorer=fuzz.token_sort_ratio)
                if sort_score >= MATCH_THRESHOLD:
                    print(f'Matched {answer} to {sort_match} ({answer_count}, score: {sort_score})')
                    cleaned_answers[accepted_answer] += answer_count
                else:
                    possible_matches = [x[0] for x in process.extract(answer, accepted_answer,
                                                                      scorer=fuzz.token_sort_ratio)]
                    possible_matches.append('NONE OF THE ABOVE')
                    selection = rawselect(f'Which does this match?: {answer}', choices=possible_matches)
                    if selection == 'NONE OF THE ABOVE':
                        cleaned_answers[answer] += answer_count
                        manual_matches[answer] = None
                    else:
                        cleaned_answers[selection] += answer_count
                        manual_matches[answer] = selection
            else:
                match_score = fuzz.partial_ratio(accepted_answer, answer)
                if match_score >= MATCH_THRESHOLD:
                    print(f'Matched {answer} to {accepted_answer} ({answer_count}, score: {match_score})')
                    cleaned_answers[accepted_answer] += answer_count
                else:
                    is_ok = confirm(f"Is this acceptable: {answer}")
                    if is_ok:
                        cleaned_answers[accepted_answer] += answer_count
                        manual_matches[answer] = accepted_answer
                    else:
                        cleaned_answers[answer] = answer_count
                        manual_matches[answer] = None

    return cleaned_answers, manual_matches

in_data = parse_input_file(FILE_LOCATION)

all_fp_answers = []
multiple = False
submitted_direct_answers = defaultdict(list)
submitted_da_counters = []

for r in in_data:
    read_answers = re.split('\r|,', r[FP_ANS_KEY])
    read_answers = [x.strip() for x in read_answers if x.strip()]
    # Remove duplicates in same answer
    fp_set = set()
    for a in read_answers:
        # manual formatting
        s = a.replace(';a', 'la').replace("Na'avi River", "Na'vi River")
        (sort_match, sort_score) = process.extractOne(s, FASTPASS_ANSWERS, scorer=fuzz.token_sort_ratio)
        if sort_score > MATCH_THRESHOLD:
            fp_set.add(sort_match)
            # if sort_score < 100:
            #     print(f'{s} -> {sort_match} (score of {sort_score})')
        else:
            fp_set.add(s)
    all_fp_answers.extend(list(fp_set))
    for k in DIRECT_KEYS:
        submitted_direct_answers[k].append(r[k].strip())


# all_fp_answers = [x.strip() for x in all_fp_answers if x.strip()]
all_fp_data = []
fp_counter = Counter(all_fp_answers)
(cleaned_fp_counter, manual_fp_data) = _merge_counter(fp_counter, FASTPASS_ANSWERS)
# print(FP_ANS_KEY)
pprint(cleaned_fp_counter)
pprint(manual_fp_data)

# for a in all_fp_answers:
#     type = 'sort'
#     (sort_match, sort_score) = process.extractOne(a, FASTPASS_ANSWERS, scorer=fuzz.token_sort_ratio)
#     if sort_score < 65 and multiple:
#         (set_match, set_score) = process.extractOne(a, FASTPASS_ANSWERS, scorer=fuzz.token_set_ratio)
#         if set_score > sort_score:
#             (match, score, type) = (set_match, set_score, 'set')
#         else:
#             (match, score) = (sort_match, sort_score)
#     else:
#         (match, score) = (sort_match, sort_score)
#     all_fp_data.append({'text': a, 'match': match, 'score': score, 'type': type})
# all_fp_data.sort(key=lambda i: i['score'], reverse=True)
# for x in all_fp_data:
#     if multiple:
#         print('({type})\t{score}\t{match} = {text}'.format(**x))
#     else:
#         print('{score}\t{match} = {text}'.format(**x))

for i, key in enumerate(DIRECT_KEYS):
    correct_answer = DIRECT_ANSWERS[i]
    answer_counter = Counter([x for x in submitted_direct_answers[key] if x.strip()])
    (cleaned_counter, manual_data) = _merge_counter(answer_counter, correct_answer)
    print(f'{key} -> {correct_answer}')
    pprint(cleaned_counter)
    pprint(manual_data)
pass

