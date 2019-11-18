<template>
  <form id="form-setup">
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">
            Название проекта
            <b-tooltip
              label="Введите название проекта"
              position="is-right"
            >
              <b-icon
                pack="mdi"
                type="is-dark"
                icon="help-circle"
                size="is-small"
              />
            </b-tooltip>
          </label>
          <b-field
            :type="{ 'is-danger': !isProjectNameValid }"
          >
            <b-input
              placeholder="Введите название проекта*"
              v-model="project_name"
              id="project_name"
            />
          </b-field>
        </div>

        <b-field label="Выберите базу для обзвона">
          <b-select
            v-model="base"
            placeholder="Выберите из списка"
            class="is-fullwidth"
            icon="library"
          >
            <option
              v-for="item in callbases"
              :key="item.id"
              :value="item.id"
            >
              {{item.name}}
            </option>
          </b-select>
        </b-field>

        <b-field
          label="Дата и время запуска проекта"
          :addons="false"
        >
          <div class="field">
            <b-radio
              name="start_type"
              v-model="start_type"
              native-value="now"
            >
              Начать сразу после запуска рассылки
            </b-radio>
          </div>
          <div class="field">
            <b-radio
              name="start_type"
              id="start_type_datepicker"
              v-model="start_type"
              native-value="datetime"
            >
              Начать в указанное время
            </b-radio>
          </div>
          <div class="columns">
            <div class="column">
              <b-datepicker
                placeholder="Выберите дату"
                v-model="start_date"
                icon="calendar-today"
                :disabled="isDatepickerDisabled"
                id="start_date"
              />
            </div>
            <div class="column">
              <b-timepicker
                placeholder="Выберите время"
                v-model="start_time"
                icon="clock-outline"
                :disabled="isDatepickerDisabled"
                :increment-minutes="10"
                id="start_time"
              />
            </div>
          </div>
        </b-field>
        <b-field
          label="Время совершения звонков"
          :addons="false"
        >
          <div class="columns">
            <div class="column">
              <b-timepicker
                placeholder="Не раньше"
                v-model="start_min"
                :increment-minutes="10"
              />
            </div>
            <div class="column">
              <b-timepicker
                placeholder="Не позднее"
                v-model="start_max"
                :increment-minutes="10"
              />
            </div>
          </div>
        </b-field>
      </div>
      <div class="column">
        <b-field
          label="Параметры звонков"
          :addons="false"
        >
          <div class="columns">
            <div class="column is-three-fifths">
              <div>Сколько раз перезвонить, если абонент не ответил</div>
            </div>
            <div class="column">
              <b-select
                class="is-fullwidth"
                icon="phone-plus"
                v-model="callback_count"
                id="callback_count"
              >
                <option
                  v-for="item in callback_counts"
                  :key="item.id"
                  :value="item.value"
                >
                  {{item.name}}
                </option>
              </b-select>
            </div>
          </div>
          <div class="columns">
            <div class="column is-three-fifths">
              <div :class="{'has-text-grey-lighter': isIntervalDisabled}">
                Интервал между повторными звонками, если абонент не ответил
              </div>
            </div>
            <div class="column">
              <b-select
                class="is-fullwidth"
                icon="timer"
                v-model="callback_interval"
                :disabled="isIntervalDisabled"
                id="select_interval"
              >
                <option
                  v-for="item in intervals"
                  :key="item.id"
                  :value="item.value"
                >
                  {{item.name}}
                </option>
              </b-select>
            </div>
          </div>
        </b-field>
        <b-field
          label="Дополнительные настройки"
          :addons="false"
        >
          <div class="field">
            <b-checkbox v-model="recognize_bot">Распознать автоответчик</b-checkbox>
          </div>
          <div class="field">
            <b-checkbox v-model="i_delay">Интелектуальная задержка</b-checkbox>
          </div>
          <div class="field">
            <b-checkbox v-model="record_audio">Записывать разговоры (аудио)</b-checkbox>
          </div>
          <div class="field">
            <b-checkbox v-model="record_text">Вести текстовую запись разговоров</b-checkbox>
          </div>
        </b-field>
      </div>
    </div>
    <div class="buttons">
      <b-button
        type="is-success"
        outlined
        @click="onSave"
        id="button_save"
      >
        Сохранить
      </b-button>
      <b-button
        type="is-danger"
        outlined
      >
        Отмена
      </b-button>
    </div>
  </form>
</template>

<script>
  export default {
    name: "form-setup",
    data() {
      return {
        project_name: '',
        base: null,
        start_type: 'now',
        start_date: null,
        start_time: null,
        start_min: null,
        start_max: null,
        callback_count: 3,
        callback_interval: 600,
        recognize_bot: false,
        i_delay: false,
        record_audio: false,
        record_text: false,
        isProjectNameValid: true,
        callbases: [
          {
            id: 0,
            name: 'Россия',
          },
          {
            id: 1,
            name: 'СНГ',
          },
          {
            id: 2,
            name: 'ЕС',
          },
        ],
        callback_counts: [
          {
            id: 0,
            name: '3 раза',
            value: 3
          },
          {
            id: 1,
            name: '5 раз',
            value: 5
          },
          {
            id: 2,
            name: 'Не перезванивать',
            value: null
          },
        ],
        intervals: [
          {
            id: 0,
            name: '10 мин',
            value: 600
          },
          {
            id: 1,
            name: '30 мин',
            value: 1800
          },
        ],
      }
    },
    computed: {
      /*
        Возможно ли начать в указанное время
      */
      isDatepickerDisabled() {
        return this.start_type === 'now'
      },
      /*
        Возможно ли настроить интервал между повторными звонками
      */
      isIntervalDisabled() {
        return this.callback_count === null
      },
      /*
        Получает данные формы
      */
      getFormData() {
        return {
          project_name: this.project_name,
          base: this.base,
          start_type: this.start_type,
          start_date: this.start_date,
          start_time: this.start_time,
          start_min: this.start_min,
          start_max: this.start_max,
          callback_count: this.callback_count,
          callback_interval: this.callback_interval,
          recognize_bot: this.recognize_bot,
          i_delay: this.i_delay,
          record_audio: this.record_audio,
          record_text: this.record_text,
        }
      },
    },
    methods: {
      validate() {
        return this.project_name.length > 3
      },
      onSave() {
        this.isProjectNameValid = false

        if (this.validate()) {
          this.isProjectNameValid = true

          try {
            /*
            Представим, что запрос удался

            const response = await fetch('/api/save-form', {
              method: 'POST',
              body: JSON.stringify(this.getFormData),
              headers: {
                'Content-Type': 'application/json'
              }
            })

            const json = await response.json()*/

            /* Показываем уведомление, что всё получилось */
            this.$buefy.notification.open({
              message: 'Настройки успешно сохранены',
              type: 'is-success',
              position: 'is-bottom-right'
            })
          } catch(e) {
            /* Показываем уведомление об ошибке */
            this.$buefy.notification.open({
              message: e,
              type: 'is-danger',
              position: 'is-bottom-right'
            })
          }
        }
      }
    }
  }
</script>

<style>
  .control.is-fullwidth {
    display: block;

    .select, select {
      display: block;
      width: 100%;
    }
  }
</style>