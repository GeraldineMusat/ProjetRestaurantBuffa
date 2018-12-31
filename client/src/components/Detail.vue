<template>
  <div>
    <h3>Detail du restaurant : {{r['name']}}</h3>

    <!-- <router-link :to="`/menu/${r._id}`">Menu</router-link>  -->
    <app-restau-detail
      v-bind:cuisine="r['cuisine']"
      v-bind:building="a['building']"
      v-bind:street="a['street']"
      v-bind:zipcode="a['zipcode']"
      v-bind:borough="r['borough']"
    ></app-restau-detail>

    <h4>Note(s)</h4>

    <app-grades
      v-for="g in grades"
      v-bind:date="g.date"
      v-bind:grade="g.grade"
      v-bind:score="g.score"
    ></app-grades>
  </div>
</template>

<script>
export default {
  data() {
    return {
      restaurant: {},
      cuisine: "",
      name: "",
      nameRecherche: "",
      restID: 0,
      grades: [],
      building: "",
      street: "",
      zipcode: "",
      borough: "",
      r: {
        'name': '',
        'cuisine': '',
        'borough': ''
      },
      a: {
        'building': '',
        'street': '',
        'zipcode': ''
      }
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
      console.log(url);

      fetch(url)
        .then(reponseJSON => {
          //console.log("reponse json");
          return reponseJSON.json();
        })
        .then(reponseJS => {
          // ici on a une réponse en JS
          this.restaurant = reponseJS.restaurant;
          this.grades = reponseJS.restaurant.grades;
          console.log(reponseJS);
          console.log(this.restaurant.address);

          this.r['cuisine'] = this.restaurant.cuisine;

          //console.log(this.r['cuisine']);

          this.r['name'] = this.restaurant.name;
          this.r['borough'] = this.restaurant.borough;

          if (this.restaurant.address !== undefined) {
            this.a['building'] = this.restaurant.address.building;
            this.a['street'] = this.restaurant.address.street;
            this.a['zipcode'] = this.restaurant.address.zipcode;
          }

        })
        .catch(err => {
          console.log("Une erreur est intervenue " + err);
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