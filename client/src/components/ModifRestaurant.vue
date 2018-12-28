<template>
  <div>
    <form @submit="modifierRestaurants" method="put">
      <br>
      <label for="name">
        Nom :
        <input type="text" name="nom" v-model="name">
      </label>
      <label for="cuisine">
        Cuisine :
        <input type="text" name="cuisine" v-model="cuisine">
      </label>
      <input type="submit" value="Modifier">
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      restaurant: [],
      cuisine: "",
      page: 0,
      pagesize: 10,
      nbRestaurants: 0,
      name: "",
      nameRecherche: "",
      restID: 0
    };
  },
  mounted() {
    this.recupResto();
    console.log("AVANT AFFICHAGE");
    this.getRestaurantsFromServer();
  },
  methods: {
    getRestaurantsFromServer() {
      let url = "http://localhost:4545/api/restaurants/" + this.restID;
      
      fetch(url)
        .then(reponseJSON => {
          //console.log("reponse json");
          return reponseJSON.json();
        })
        .then(reponseJS => {
          // ici on a une réponse en JS
          this.restaurant = reponseJS.restaurant;
          console.log(reponseJS);
            this.name = this.restaurant.name;
            this.cuisine = this.restaurant.cuisine;
        })
        .catch(err => {
          console.log("Une erreur est intervenue " + err);
        });

    },
    modifierRestaurants(event) {
      // Modfier un restaurant
      // REQUETES PUT

      console.log(this.name);
      // Pour éviter que la page ne se ré-affiche
      event.preventDefault();

      // Récupération du formulaire. Pas besoin de document.querySelector
      // ou document.getElementById puisque c'est le formulaire qui a généré
      // l'événement
      let form = event.target;
      // Récupération des valeurs des champs du formulaire
      // en prévision d'un envoi multipart en ajax/fetch
      let donneesFormulaire = new FormData(event.target);

      console.log(event.target);

      let url = "http://localhost:4545/api/restaurants/" + this.restID;

      fetch(url, {
        method: "PUT",
        body: donneesFormulaire,
        mode: "cors"
      })
        .then(responseJSON => {
          responseJSON.json().then(res => {
            // arrow function préserve le this
            // Maintenant res est un vrai objet JavaScript
            console.log("Restaurant inséré");
            this.getRestaurantsFromServer();

            // remettre le formulaire à zéro
            //this.routes.go(1);
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    },
     recupResto() {
      var CheminComplet = document.location.href;
      var tab = CheminComplet.split("/");
      this.restID = tab[4];
    }
  }
};
</script>

<style>
form {
  margin: auto;
}

input[type="text"] {
  width: 20%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 3px solid #ccc;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  outline: none;
}

input[type="text"]:focus {
  border: 3px solid #555;
}

input[type="submit"] {
  background: #cdb1b2;
  color: #7e3d4e;
  padding: 15px;
  border-radius: 0;
  font-weight: bold;
  font-size: 15px;
  border: 0;
  border-radius: 50px;
}
</style>