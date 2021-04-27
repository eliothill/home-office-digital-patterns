import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import StatusMessage from '../src/StatusMessage';
import {A} from "@not-govuk/components";

describe('StatusMessage', () => {
  describe('when given a status', () => {
    const component = mount(h(StatusMessage, { status: 'My heading' }));
    it('should show the status', () => expect(component.text()).toEqual('My heading'));
    it('should not show extra contents', () => expect(component.exists('.hods-status-message span')).toEqual(false));
    it('should not show any actions', () => expect(component.exists('.hods-status-message__actions')).toEqual(false));

    describe('and extra contents', () => {
      const component = mount(h(StatusMessage, { status: 'My heading' }, 'extra info'));
      it('should show the status and extra contents', () =>
        expect(component.text()).toMatch(/^My heading\s+-\s+extra info$/));

      describe('with an action', () => {
        const component = mount(h(StatusMessage, {
          status: 'My heading',
          actions: h(A, { href: '#' }, 'Run')
        }, 'extra info'));
        it('should show the status and extra contents', () =>
          expect(component.find('p').text()).toMatch(/^My heading\s+-\s+extra info$/));
        it('should also show the action', () =>
          expect(component.find('.hods-status-message__actions a')).toHaveLength(1));
        it('should render the action', () =>
          expect(component.find('.hods-status-message__actions').text()).toEqual('Run'));
      });
      describe('with multiple actions', () => {
        const actions = [
          h(A, { href: '#', key: 1 }, 'Run'),
          h(A, { href: '#', key: 2 }, 'Jump'),
          h(A, { href: '#', key: 3 }, 'Sleep')
        ];
        const component = mount(h(StatusMessage, { status: 'My heading', actions }, 'extra info'));
        it('should show the status and extra contents', () =>
          expect(component.find('p').text()).toMatch(/^My heading\s+-\s+extra info$/));
        it('should have actions', () => expect(component.find('.hods-status-message__actions a')).toHaveLength(3));
        it('should show all the actions', () =>
          expect(component.find('.hods-status-message__actions').text()).toMatch(/^Run\s*Jump\s*Sleep$/));
      });
    });
  });

  describe('when given only contents', () => {
    const component = mount(h(StatusMessage, { }, 'Basic info'));
    it('should show the contents', () => expect(component.text()).toEqual('Basic info'));
    it('should not show any actions', () => expect(component.exists('.hods-status-message__actions')).toEqual(false));
  });

  describe('when given only actions', () => {
    const component = mount(h(StatusMessage, { actions: h(A, { href: '#' }, 'Run') }));
    it('should not display anything', () => expect(component.text()).toEqual(''));
    it('should not render anything', () => expect(component.exists('.hods-status-message')).toEqual(false));
  });
  describe('when given no props at all', () => {
    const component = mount(h(StatusMessage));
    it('should not display anything', () => expect(component.text()).toEqual(''));
    it('should not render anything', () => expect(component.exists('.hods-status-message')).toEqual(false));
  });
});
