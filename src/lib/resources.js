const fs = require('fs');
const yaml = require('js-yaml');

const defaultLanguage = 'en';

function loadResources(path, lang) {
	const resources = [];

	const basePath = `./resources/${path}`;

	for (dir of fs.readdirSync(basePath)) {
		const resourceYaml = yaml.load(fs.readFileSync(`${basePath}/${dir}/resource.yaml`, 'utf8'));

		if (lang && lang !== defaultLanguage) {
			try {
				const langYaml = yaml.load(fs.readFileSync(`${basePath}/${dir}/${lang}.yaml`, 'utf8'));
				Object.assign(resourceYaml, langYaml);
			} catch (e) {}
		}

		resources.push(resourceYaml);
	}

	return resources;
}

module.exports = {loadResources};
