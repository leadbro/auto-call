<template>
  <div id="app">
    <section class="section">
      <div class="container">
        <h1 class="title">Автообзвон</h1>
        <h2 class="subtitle">Настройки проекта</h2>

        <form-setup/>
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
  import FormSetup from '@/components/form-setup.vue'

  export default {
    name: 'app',
    components: {
      FormSetup
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
</style>
