<template>
  <div>
    <h3>Detail du restaurant : {{restaurant.name}}</h3>
    <button v-on:click="RedirectUrl()">Retour a la fiche detail du restaurant</button> 

    <table>
      <tr class="title">
        <th>Entrees</th>
      </tr>
      <tbody>
        <tr class="content" v-for="e in tab_entrees">
        
          <td>{{ e }}</td>
        </tr>
      </tbody>
    </table>
<br/>
    <table>
      <tr class="title">
        <th>Plats</th>
      </tr>
      <tbody>
        <tr
          class="content"
          v-for="p in tab_plats"
        >
          <td>{{p}}</td>
        </tr>
      </tbody>
    </table>
<br/>
    <table>
      <tr class="title">
        <th>Desserts</th>
      </tr>
      <tbody>
        <tr
          class="content"
          v-for="d in tab_desserts"
        >
          <td>{{d}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "app",
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
      },
      tab_entrees: [],
      tab_plats:[],
      tab_desserts: [],
      entrees: [
          'salade chevre chaud', 
          'poivrons grillee', 
          'salade nicoise', 
          'feuillete chevre', 
          'salade tomates mozarella', 
          'escargot',
          'farcie nicois',
          'bruchceta',
          'charcuterie',
          'quiche lorraine'  
        ],
      plats: [
          'pizza fromage',
          'pizza reine',
          'bouchee a la reine',
          'veloute de carotte',
          'escalope de veau sauce forestiere',
          'faux filet',
          'tomate farcie',
          'moule frites',
          'pene a la norvegienne',
          'escalope milanaise'
      ],
      desserts: [
          'banana split',
          'glace vanille',
          'tiramisu',
          'boule coco',
          'creme brulee',
          'moelleux chocolat',
          'fraise melba',
          'faisselle',
          'fromage',
          'tarte tatin'
      ]
    };
  },
  mounted() {
    this.recupResto();
    this.getRestaurantsFromServer();
    this.genererMenu();
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
        })
        .catch(err => {
          console.log("Une erreur est intervenue " + err);
        });
    },
    recupResto() {
      var CheminComplet = document.location.href;
      var tab = CheminComplet.split("/");
      this.restID = tab[4];
    },
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    },
    genererMenu() {
        /*

            creer un tableau avec les valeurs prerentrer
            trois tableaux en tout : entree plat dessert (10 choix different dans chaque)
            un algo qui tire un nombre aleatoire entre 0 et 9, cinq fois pour chaque tableau 
                        (5 choix different pour les trois tableau : 5 entrees, 5 plats, 5 desserts)
            creer trois nouveaux tableaux avec chacun leur 5 choix 
            Afficher ces trois nouveaux tableaux

        */
        
        var rd;
        for(var i= 0; i < 5; i++){
            rd = this.getRandomInt(10);
            this.tab_entrees.push(this.entrees[rd]);
            this.tab_plats.push(this.plats[rd]);
            this.tab_desserts.push(this.desserts[rd]);
        }
    },
    getColor(index) {
      return index % 2 ? "#CAC1B4" : "#DFD7CA";
    },
    recupResto() {
      var CheminComplet = document.location.href;
      var tab = CheminComplet.split("/");
      this.restID = tab[4];
    },
    RedirectUrl() {
      var CheminComplet = document.location.href;
      var tab = CheminComplet.split("/");
      var url = tab[0] + "/detail/" + tab[4];
      window.location.replace(url);
    }
  }
};
</script>

<style>
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
  text-align: center;
  padding: 5px;
  border-radius: 10px;
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
</style>
