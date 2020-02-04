import json
import copy

# constants
class OldChainGenerator(object):
	def __init__(self):
		self.wordPairFileName = "wordPairs.json"
		self.wordChainFileName = "wordLists.json"

		self.chain_length = 7

	def append_words_to_chain(self, partial_chain, return_list, short_list, pair_dictionary):
		last_word = partial_chain[-1]

		if last_word not in pair_dictionary:
			# end of the line
			short_list.append(partial_chain)
			return

		next_words = pair_dictionary[last_word]

		found_continuation = False
		for next_word in next_words:
			if next_word in partial_chain:
				# repeat word
				# don't add to the short_list here because the last_word has other next_words to try
				# we don't know if it was a total dead end yet
				continue

			new_chain = copy.copy(partial_chain)
			new_chain.append(next_word)

			found_continuation = True

			if len(new_chain) < self.chain_length:
				self.append_words_to_chain(new_chain, return_list, short_list, pair_dictionary)
			else:
				return_list.append(new_chain)

		if not found_continuation:
			short_list.append(partial_chain)


	def naiveMethod(self, pair_dictionary, reverse_dictionary):
		result = []
		too_short = []  # to hold lists that are too short

		for first_word in pair_dictionary:
			chain = [first_word]

			chain = self.append_words_to_chain(chain, result, too_short, pair_dictionary)

		print("Short List:")
		short_count = 0
		for list in too_short:
			if len(list) == (self.chain_length - 1) and list[0] not in reverse_dictionary:
				print(list)
				short_count += 1

		print("Just short count: %d" % short_count)

		return result


	def getListsFromDictionary(self, pair_dictionary, reverse_dictionary):
		return naiveMethod(pair_dictionary, reverse_dictionary)


	def getReverseDictionary(self, pair_dictionary):
		result = {}

		# go through the whole list
		for first_word, second_words in pair_dictionary.items():
			# for each second word
			for second_word in second_words:

				# only process a second word once
				if second_word in result:
					continue

				result[second_word] = []
				# go through the whole list again and collect all the first words for it
				for firstWord2, secondWords2 in pair_dictionary.items():
					if second_word in secondWords2:

						if firstWord2 not in result[second_word]:
							# print("%s %s" % (second_word, firstWord2))
							result[second_word].append(firstWord2)

		return result


	# main

file = open(wordPairFileName, 'r')
pairRoot = json.load(file)

pairDictionary = pairRoot["word pairs"]
reverseDictionary = getReverseDictionary(pairDictionary)

lists = getListsFromDictionary(pairDictionary, reverseDictionary)

print("Generated %d lists" % len(lists))

listsRoot = {}
listsRoot["wordLists"] = lists

file = open(wordChainFileName, mode="w")
json.dump(listsRoot, file, indent="	")

file.close()
