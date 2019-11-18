import { expect } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'
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

  it('interval select should be disabled if callback_count is null', () => {
    const
      selectCallbackCount = wrapper.find('#callback_count'),
      nullOption = selectCallbackCount.findAll('option').at(2),
      selectInterval = wrapper.find('#select_interval')

    nullOption.element.selected = true
    selectCallbackCount.trigger('change')

    expect(selectInterval.element.disabled).to.be.true
  })

  it('required fields should be checked if button_save was clicked', () => {
    const
      inputName = wrapper.find('#project_name'),
      buttonSave = wrapper.find('#button_save')

    wrapper.vm.project_name = 'foo'
    buttonSave.trigger('click')
    expect(inputName.classes('is-danger')).to.be.true

    wrapper.vm.project_name = 'My Awesome Project'
    buttonSave.trigger('click')
    expect(inputName.classes('is-danger')).to.be.false

  })
})
