<template>		
	<div>
		<form  v-on:submit="ajouterRestaurant(event)">
			<h3>Ajout restaurants</h3>
			<label>
				Nom : <input type="text" name="nom" v-model="name"> 
			</label>
			<label>
				Cuisine : <input type="text" name="cuisine" v-model="cuisine"> 
			</label>

			<button>Ajouter</button>
			</form>
	</div>
</template>

<script>

export default {
    data () {
        return {
            restaurants : [],
            cuisine:'',
            page:0,
            pagesize:10,
            nbRestaurants:0,
            name:'',
            nameRecherche:'',
            restID:0
        }
    },
    mounted(){
        
        console.log("AVANT AFFICHAGE");
        this.getRestaurantsFromServer();
        
    },
    methods: {
		getRestaurantsFromServer() {
			//let url = "http://localhost:4545/api/restaurants";
			  
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
		},
		ajouterRestaurant(event) {
			// eviter le comportement par defaut
			/*event.preventDefault();

                let form = event.target;
                let donneesFormulaire = new FormData(form);

                let url = "http://localhost:4545/api/restaurants";

                fetch(url, {
                        method: "POST",
                        body: donneesFormulaire
                    })
                    .then((responseJSON) => {
                        responseJSON.json()
                            .then((res) => { // arrow function préserve le this
                                // Maintenant res est un vrai objet JavaScript
                                console.log("Restaurant inséré");
                                this.getRestaurantsFromServer();

                                // remettre le formulaire à zéro
                                this.name = "";
                                this.cuisine = "";
                            });
                    })
                    .catch(function (err) {
                        console.log(err);
                    });*/
		    
		}
	}
}
</script>