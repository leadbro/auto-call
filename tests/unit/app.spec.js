/* eslint-disable */

import { expect } from 'chai'
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import FormSetup from '@/components/form-setup.vue'

import Buefy from 'buefy'
const localVue = createLocalVue()
localVue.use(Buefy)

describe('Autocall FormSetup UI Test', () => {
  let wrapper,
    radioButtonDatetime

  beforeEach(() => {
    wrapper = mount(FormSetup, {
      localVue,
      stubs: {
        transition: false
      }
    })

    radioButtonDatetime = wrapper.find('#start_type_datepicker')
  })

  it('datepicker should be enable if start_type equal datepicker', () => {
    const datepicker = wrapper.find('#start_date')

    radioButtonDatetime.trigger('click')

    expect(datepicker.element.disabled).to.be.false
  })

  it('timepicker should be enable if start_type equal datepicker', () => {
    const timepicker = wrapper.find('#start_time')

    radioButtonDatetime.trigger('click')

    expect(timepicker.element.disabled).to.be.false
  })
})
