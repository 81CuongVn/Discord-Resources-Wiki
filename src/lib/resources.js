const fs = require('fs');
const yaml = require('js-yaml');

const defaultLanguage = 'en';

function loadResources(path, lang) {
	const resources = [];

	const basePath = `./resources/${path}`;

	for (dir of fs.readdirSync(basePath)) {
		if (!fs.statSync(`${basePath}/${dir}`).isDirectory()) continue;

		const path = `${basePath}/${dir}/resource.yaml`;
		const resourceYaml = yaml.load(fs.readFileSync(path, 'utf8'));
		resourceYaml.missing_translation = false;
		resourceYaml.base_path = basePath;
		resourceYaml.resource_path = path;

		if (lang && lang !== defaultLanguage) {
			const langPath = `${basePath}/${dir}/${lang}.yaml`;
			resourceYaml.translation_path = `${basePath}/${dir}/${lang}.yaml`;
			try {
				const langYaml = yaml.load(fs.readFileSync(langPath, 'utf8'));
				Object.assign(resourceYaml, langYaml);
			} catch {
				resourceYaml.missing_translation = true;
			}
		}

		resources.push(resourceYaml);
	}

	return resources;
}

module.exports = {loadResources};
