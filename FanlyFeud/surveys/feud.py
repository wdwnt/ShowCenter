import csv
import sys
from collections import Counter, defaultdict
from fuzzywuzzy import fuzz
import csv

THRESHOLD = 80

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
        raw_answers[q].append(all_answers[q].strip())
counted_answers = {}
for q, q_answers in raw_answers.items():
    counted_answers[q] = Counter(q_answers)

for question, answers in counted_answers.items():
    fuzzyPairs = list()
    answer_items = list(answers.items())
    for i in range(len(answer_items)):
        i_answer, i_count = answer_items[i]
        for j in range(i+1, len(answer_items)):
            j_answer, j_count = answer_items[j]
            fuzzyPairs.append((i_answer, j_answer, fuzz.ratio(i_answer, j_answer)))
    fuzzyPairs.sort(key=lambda x: x[2], reverse=True)
    fuzzyPairs = [(pair[0], pair[1]) for pair in fuzzyPairs if pair[2] >= THRESHOLD]
    for answer, count in answer_items:
        if not answer in answers:
            continue
        answer_group = [answer]
        prev_answer_group_len = 0
        while prev_answer_group_len != len(answer_group):
            prev_answer_group_len = len(answer_group)
            for i_answer, j_answer in fuzzyPairs:
                if i_answer in answer_group and j_answer not in answer_group:
                    answer_group.append(j_answer)
                if j_answer in answer_group and i_answer not in answer_group:
                    answer_group.append(i_answer)
        grand_total = 0
        for cur_answer in answer_group:
            grand_total += answers.get(cur_answer, 0)
            del answers[cur_answer]
        answers[", ".join(answer_group)] = grand_total
    answer_items = list(answers.items())
    answer_items.sort(key=lambda x: x[1], reverse=True)
    print(question)
    for answer, count in answer_items:
        print(answer, ': ', count)
    print()

    question = question.replace('?', '')
    with open(question+'.csv', 'w', newline='', encoding="utf-8") as csvfile:
        writer = csv.writer(csvfile, delimiter=',', quotechar='"', quoting=csv.QUOTE_ALL)
        writer.writerow(['Answer(s)', 'Count'])
        writer.writerows(answer_items)
