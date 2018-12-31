<template>
  <div class="app">
      <h3>Nombre de restaurants total : {{nbRestaurants}}</h3>
    <h3>Nombre de restaurants par page : {{restaurants.length}}</h3>
<label>
    Rechercher : <input type="text" v-on:input="chercherRestaurants" v-model="nameRecherche"> 
  </label>
    <div class="slidecontainer">
      <input
        type="range"
        min="5"
        max="100"
        value="10"
        v-model="pagesize"
        v-on:input="onChg(event)"
        class="slider"
        id="myRange"
      >
    </div>
    <table>
      <tr class="title">
        <th>Nom</th>
        <th>Cuisine</th>
        <th>Action</th>
      </tr>
      <tbody>
        <tr
          class="content"
          v-for="r,index in restaurants"
          v-bind:style="{backgroundColor:getColor(index)}"
        >
          <td>{{r.name}}</td>
          <td>{{r.cuisine}}</td>
          <td>
            <router-link class="rl" :to="`/detail/${r._id}`">Detail</router-link>
            <button v-on:click="supprimerRestaurant(index)">Delete</button>
            <!-- <button v-on:click="modifierRest(index)">Modifier</button> -->
            <router-link class="rl" :to="`/modif/${r._id}`">Modifier</router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="div-center b">
      <button v-on:click="premiere">Premiere page</button>
      <button v-on:click="precedent">Precedent</button>
      <button v-on:click="suivant">Suivant</button>
      <button v-on:click="derniere">Derniere page</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg:
        "Bienvenue sur le site internet permettant de parcourir des restaurants",
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
    this.getRestaurantsFromServer();
    console.log(this.restaurants);
  },
  methods: {
    getRestaurantsFromServer() {
      //let url = "http://localhost:4545/api/restaurants";
      let url =
        "http://localhost:4545/api/restaurants?page=" +
        this.page +
        "&pagesize=" +
        this.pagesize +
        "&name=" +
        this.nameRecherche;

      fetch(url)
        .then(reponseJSON => {
          //console.log("reponse json");
          return reponseJSON.json();
        })
        .then(reponseJS => {
          // ici on a une réponse en JS
          this.restaurants = reponseJS.data;
          this.nbRestaurants = reponseJS.count;
          console.log(reponseJS);
        })
        .catch(err => {
          console.log("Une erreur est intervenue " + err);
        });
      console.log(this.nbRestaurants);
    },
    supprimerRestaurant(index) {
      // Supprimer un restaurant
      //this.restaurants.splice(index, 1);
      //this.getRestaurantsFromServer();
      this.restID = this.restaurants[index]._id;
      let url = "http://localhost:4545/api/restaurants/" + this.restID;
      //console.log(this.restID);
      fetch(url, {
        method: "DELETE"
      })
        .then(responseJSON => {
          responseJSON.json().then(res => {
            // arrow function préserve le this
            // Maintenant res est un vrai objet JavaScript
            console.log("Restaurant supp");
            this.getRestaurantsFromServer();

            // remettre le formulaire à zéro
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getColor(index) {
      return index % 2 ? "#CAC1B4" : "#DFD7CA";
    },
    precedent(event) {
      // Pour la pagination page precedente
      if (this.page > 0) {
        this.page = this.page - 1;
        this.getRestaurantsFromServer();
      }
    },
    suivant(event) {
      // Pour la pagination page suivante
      let res = Math.round(this.nbRestaurants / this.pagesize) - 1;
      if (this.page < res) {
        this.page = this.page + 1;
        this.getRestaurantsFromServer();
      }
    },
    onChg(event) {
      // Pour le slide pour le nombre de restaurants par page
      //console.log(this.pagesize);
      this.getRestaurantsFromServer();
    },
    chercherRestaurants: _.debounce(function() {
      // Pour chercher les restaurants, avec un temps alloué pour ecrire
      this.getRestaurantsFromServer();
    }, 300),
    premiere(event) {
      this.page = 0;
      this.getRestaurantsFromServer();
    },
    derniere(event) {
      let res = this.nbRestaurants / this.pagesize;
      this.page = Math.round(res) - 1;
      this.getRestaurantsFromServer();
    }
  }
};
</script>

<style>
body {
}

#app {
}

header {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: 0.02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}

button {
  background: #cdb1b2;
  color: #7e3d4e;
  padding: 15px;
  border-radius: 0;
  font-weight: bold;
  font-size: 15px;
  border: 0;
  border-radius: 50px;
}

table {
  border-radius: 10px;
  border: none;
  border-collapse: none;
  margin: auto;
}

.content {
  border: 1px solid 878177;
  border-radius: 10px;
  color: #665e52;
  font-size: 15px;
}

.title {
  border: 1px solid 878177;
  border-radius: 10px;
  font-size: 15px;
  font-weight: bold;
  font-size: 25px;
  color: #595157;
}

td {
  padding: 5px;
  border-radius: 10px;
  text-align: center;
}

.bordureRouge {
  border: 2px dashed red;
}

.div-center {
  margin: 0 auto;
  width: 500px;
}

.rl {
  text-decoration: none;
  background: #cdb1b2;
  color: #7e3d4e;
  padding: 15px;
  border-radius: 0;
  font-weight: bold;
  font-size: 15px;
  border: 0;
  border-radius: 50px;
}

.b > button {
  background: #7e3d4e;
  color: #EADBE2;
  padding: 15px;
  border-radius: 0;
  font-size: 15px;
  border: 0;
  border-radius: 5px;
}

.slidecontainer {
  width: 60%;
  margin: auto;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 5px;
  background: #cdb1b2;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #7e3d4e;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #7e3d4e;
  cursor: pointer;
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
</style>
