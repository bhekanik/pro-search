import { mount } from 'cypress-svelte-unit-test';
import Base from './Base.svelte';

describe('Base', () => {
	it('should render correctly', () => {
		mount(Base, {
			props: {
				type: 'Title',
				label: 'Test'
			}
		});

		cy.contains('Test');
	});
});
