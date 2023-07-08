import cohere from 'cohere-ai'

cohere.init('HGC9fmSVWJwBb9qvu3ivOLZNeoFNxxIaEZzbeZng');

export async function fixMyEnglish(input) {
  const response = await cohere.generate({
		model: 'xlarge',
		prompt: `This is a spell checker generator
		
	--
	Incorrect sample: "I is good!"
	Correct sample: "I am good!"
	--
	Incorrect sample: "I have 22 years old."
	Correct sample: "I am 22 years old."
	--
	Incorrect sample: "I don't can know"
	Correct sample: "I don't know"
	--
		Incorrect sample: "${input}"
		Correct sample:`,
			max_tokens: 440,
			temperature: 0.3,
			k: 0,
			p: 1,
			frequency_penalty: 0,
			presence_penalty: 0,
			stop_sequences: ['--'],
			return_likelihoods: 'NONE'
	})

	return response.body.generations[0].text
}