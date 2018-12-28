<template>
  <div>
    <form @submit="ajouterRestaurant" method="post">
      <br>
      <label for="name">
        Nom :
        <input type="text" name="nom" v-model="name">
      </label>
      <label for="cuisine">
        Cuisine :
        <input type="text" name="cuisine" v-model="cuisine">
      </label>
      <input type="submit" value="ajouter">
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      restaurants: [],
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
    console.log("AVANT AFFICHAGE");
  },
  methods: {
    ajouterRestaurant(event) {
      // eviter le comportement par defaut
      event.preventDefault();
      let form = event.target;
      let donneesFormulaire = new FormData(form);

      let url = "http://localhost:4545/api/restaurants";

      fetch(url, {
        method: "POST",
        body: donneesFormulaire
      })
        .then(responseJSON => {
          responseJSON.json().then(res => {
            // arrow function préserve le this
            // Maintenant res est un vrai objet JavaScript
            console.log("Restaurant inséré");

            // remettre le formulaire à zéro
            this.name = "";
            this.cuisine = "";
          });
        })
        .catch(function(err) {
          console.log(err);
        });
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