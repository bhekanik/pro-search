/// <reference types="cypress" />
import { startDevServer } from '@cypress/vite-dev-server';
import path from 'path';
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
export default (on, config) => {
	on('dev-server:start', async (options) => {
		return startDevServer({
			options,
			viteConfig: { configFile: path.resolve(__dirname, '..', '..', 'vite.config.js') }
		});
	});
};
