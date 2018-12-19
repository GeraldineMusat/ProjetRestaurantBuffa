<template>
	<div>
		<h3>Nombre de restaurants total : {{nbRestaurants}}</h3>
		<h3>Nombre de restaurants par page : {{restaurants.length}}</h3>
	</div>
</template>

<script>

export default {
	data() {
		return {
			nbRestaurants : 10,
			restaurants : []
		}
	}
	
}
</script>