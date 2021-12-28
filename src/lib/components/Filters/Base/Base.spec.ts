import { mount } from 'cypress-svelte-unit-test';
import Base from './Base.svelte';

describe('Base', () => {
	it('should show show the input when the checkbox in clicked', () => {
		mount(Base, {
			props: {
				type: 'URL',
				label: 'Test',
				hasInput: true,
				textInputPlaceholder: 'Some placeholder here'
			}
		});

		cy.get('input[placeholder="Some placeholder here"]').should('not.exist');
		cy.contains('Test').click();
		cy.get('input[placeholder="Some placeholder here"]').should('exist');
	});
});
