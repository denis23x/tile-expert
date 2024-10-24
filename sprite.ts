/** @format */

import prompts from 'prompts';
import fs from 'node:fs';
import jsdom from 'jsdom';
import { spawn, ChildProcess } from 'child_process';

(async () => {
	const sprite: prompts.Answers<string> = await prompts({
		type: 'select',
		name: 'sprite',
		message: 'Select a sprite',
		choices: [
			{
				title: 'Icon',
				value: 'icon',
				description: 'Build sprite of icons'
			}
			// ...
		],
		initial: 0
	});

	const insertSprite = (path: string, selector: string) => {
		// @ts-ignore
		fs.readFile(path, 'utf8', (error: NodeJS.ErrnoException, sprite: string) => {
			if (error) {
				throw error;
			}

			jsdom.JSDOM.fromFile('src/index.html').then((dom: jsdom.JSDOM) => {
				// @ts-ignore
				dom.window.document.querySelector(selector).innerHTML = sprite;

				const html: string = dom.serialize().replace('<!-- @format -->', '');

				fs.writeFile('src/index.html', html, (error: NodeJS.ErrnoException | null) => {
					if (error) {
						throw error;
					}
				});
			});
		});
	};

	if (sprite['sprite']) {
		const command: string[] = ['svg2sprite ./src/assets/icons ./src/assets/sprite-icons.svg --inline'];
		const commandRun: ChildProcess = spawn(command.join(' && '), {
			shell: true,
			stdio: 'inherit'
		});

		commandRun.on('close', () => {
			insertSprite('src/assets/sprite-icons.svg', "[data-sprite='icons']");

			spawn('prettier --write src/index.html --log-level silent', {
				shell: true,
				stdio: 'inherit'
			});
		});
	} else {
		console.log('Ok, Bye!');
	}
})();
