<template>
  <div id="app">
    <header>

    </header>


					<!-- Logo -->
						<div>
							<h1>{{ msg }}</h1>
							<p>Navigation</p>
						</div>

					<!-- Nav -->
						<nav>
							<ul>
								<li><router-link to="/">Home</router-link></li>
								<li><router-link to="/restaurants">Restaurants</router-link></li>
								<li><router-link to="/add">Ajouter restaurant</router-link></li>
							</ul>
						</nav>

			
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
 
}

h1, h2 {

}

ul {

}

a {

}



</style>
