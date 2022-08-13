const findAndReplace = require('mdast-util-find-and-replace');
const {loadResources} = require('../lib/resources');

function resourceLoaderPlugin() {
	const widgetMarkupRegex = /\{\{resources:([a-z0-9A-Z-_\/]+)(?::([a-z]+))?\}\}/g;

	return function transformer(markdownAST) {
		/* markdownAST.children.splice(0, 0, {
			type: 'import',
			value: "import Resource from '@site/src/components/Resource.jsx';",
		}); */

		let found = true;
		function replace(match, path, lang) {
			const resources = loadResources(path, lang);

			found = true;
			return resources.flatMap((resource) => {
				const descriptionLines = resource.description.split('\n');
				quoteContent = [
					{
						type: 'paragraph',
						children: [
							{type: 'strong', children: [{type: 'text', value: 'Description: '}]},
							{type: 'text', value: descriptionLines[0]},
							...descriptionLines.slice(1).flatMap((line) => [
								{
									type: 'break',
								},
								{
									type: 'text',
									value: line,
								},
							]),
						],
					},
				];

				if (resource.links && resource.links.length > 0) {
					for (const link of resource.links) {
						quoteContent.push({
							type: 'paragraph',
							children: [
								{
									type: 'strong',
									children: [
										{type: 'text', value: `Link${resource.links.length !== 1 ? 's' : ''}: `},
									],
								},
								{type: 'link', url: link.url, children: [{type: 'text', value: link.name}]},
							],
						});
					}
				}

				if (resource.credit && resource.credit.length > 0) {
					quoteContent.push({
						type: 'paragraph',
						children: [
							{
								type: 'strong',
								children: [{type: 'text', value: `Credit: `}],
							},
							{
								type: 'text',
								value: resource.credit
									.map((credit) => {
										if (credit.type === 'discord' || credit.type === 'github') {
											return `@${credit.id}`;
										}
										return credit.text;
									})
									.join(' '),
							},
						],
					});
				}

				const result = [
					{
						type: 'heading',
						depth: 2,
						children: [{type: 'text', value: resource.title}],
					},
					{
						type: 'blockquote',
						children: quoteContent,
					},
					/* {
                        type: 'jsx',
                        value: `<Resource data={${JSON.stringify(resource)}}/>`,
                    }, */
				];

				if (resource.discord_invite) {
					result.push({
						type: 'paragraph',
						children: [{type: 'text', value: `@gg/${resource.discord_invite}`}],
					});
				}

				result.push({
					type: 'break',
				});

				return result;
			});
		}

		while (found) {
			found = false;
			// the implementation seems to have issues finding multiple instances in one node
			// the loop ensures that all instances are replaced by searching again after the last one was already replaced
			findAndReplace(markdownAST, widgetMarkupRegex, replace);
		}

		return markdownAST;
	};
}

module.exports = resourceLoaderPlugin;
