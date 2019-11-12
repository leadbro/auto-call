<template>
  <div id="app">
    <section class="section">
      <div class="container">
        <h1 class="title">Автообзвон</h1>
        <h2 class="subtitle">Настройки проекта</h2>
        <div class="columns">
          <div class="column">
            <b-field label="Название проекта">
              <b-input 
                placeholder="Введите название проекта*"
                v-model="project_name"
              />
            </b-field>

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
                  v-model="start_type"
                  native-value="now"
                >
                  Начать сразу после запуска рассылки
                </b-radio>
              </div>
              <div class="field">
                <b-radio 
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
                  />
                </div>
                <div class="column">
                  <b-timepicker
                    placeholder="Выберите время"
                    v-model="start_time"
                    icon="clock-outline"
                    :disabled="isDatepickerDisabled"
                    :increment-minutes="10"
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
      </div>
    </section>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Autocall</strong> by <a target="_blank" href="https://github.com/leadbro">Alex Andreev</a>. The source code is licensed
          <a target="_blank" href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
          is licensed <a target="_blank" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>

  export default {
    name: 'app',
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
      async onSave() {
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
</script>

<style>
  html,
  body {
    min-height: 100vh;
  }

  body {
    background: #ECE9E6;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #FFFFFF, #ECE9E6);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to top, #FFFFFF, #ECE9E6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  }

  #app {
    font-family: 'Fira Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .control.is-fullwidth {
    display: block;

    .select, select {
      display: block;
      width: 100%;
    }
  }
</style>
