<template>
  <div id="app">
    <header>
      <h1>{{ msg }}</h1>
      <h2>Navigation</h2>
    </header>
	<div>
		<router-link to="/">Home</router-link>
		<router-link to="/restaurants">Restaurants</router-link>
		<router-link to="/add">Ajouter restaurant</router-link>
    </div>
	
	<app-info></app-info>
	<router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Bienvenue',
      
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
