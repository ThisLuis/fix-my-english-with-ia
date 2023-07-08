const COHERE_API_KEY = 'HGC9fmSVWJwBb9qvu3ivOLZNeoFNxxIaEZzbeZng'
const COHERE_API_GENERATE_URL = 'https://api.cohere.ai/generate'


export async function fixMyEnglish(input) {
	console.log('fixMyEnglish')
	const data = {
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
				max_tokens: 40,
				temperature: 0.3,
				k: 0,
				p: 1,
				frequency_penalty: 0,
				presence_penalty: 0,
				stop_sequences: ['--'],
				return_likelihoods: 'NONE'
	}
	const response = await fetch(COHERE_API_GENERATE_URL, {
		method: 'POST',
		headers: {
			Authorization: `BEARER ${COHERE_API_KEY}`,
			"Content-Type": 'application/json',
			"Cohere-Version": '2022-12-06'
		},
		body: JSON.stringify(data)
	}).then(res => res.json())

	const { text } = response.generations[0]
	return text
		.replace('--', '')
		.replaceAll('"', '')
		.trim()
}