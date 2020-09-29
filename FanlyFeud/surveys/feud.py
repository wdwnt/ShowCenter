import csv
import sys
from collections import Counter, defaultdict
import json

qs = ("Name something Tom Corless has, that you wish you had.",
      "Name something you’d get the Magic Kingdom for its 49th birthday.",
      "Name something you can do for free at Walt Disney World.",
      "Name something that was added to the parks since the pandemic started.",
      "Name a country you’d like to see added to World Showcase.",
      "Name a Disney-owned animated film that does not feature a princess.",
      "What’s a Disney character that you think would do well in the NBA?")

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

in_data = parse_input_file('2020-09_results.csv')
raw_answers = defaultdict(list)
for all_answers in in_data:
    for q in qs:
        raw_answers[q].append(all_answers[q])
counted_answers = {}
for q, q_answers in raw_answers.items():
    counted_answers[q] = Counter(q_answers)
for q, a_list in counted_answers.items():
    print(q)
    s = {k: v for k, v in sorted(a_list.items(), key=lambda item: item[1], reverse=True)}
    for v, c in s.items():
        print(f'\t{v} = {c}')