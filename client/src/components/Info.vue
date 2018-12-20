<template>
	<div>
		<h3>Nombre de restaurants total : {{nbRestaurants}}</h3>
	</div>
</template>

<script>

export default {
	data() {
		return {
			restaurants : [],
			nbRestaurants:0
		}
	},
	mounted(){
			
		console.log("AVANT AFFICHAGE");
		this.getRestaurantsFromServer();
	
	},
	methods: {
		getRestaurantsFromServer() {
			let url = "http://localhost:4545/api/restaurants";
			fetch(url)
					.then((reponseJSON) => {
						//console.log("reponse json");
						return reponseJSON.json();
					})
					.then((reponseJS) => {
						// ici on a une réponse en JS
						this.restaurants = reponseJS.data;
                        this.nbRestaurants = reponseJS.count;
					})
					.catch((err) => {
						console.log("Une erreur est intervenue " + err);
					})
		}
	}
	
}
</script>