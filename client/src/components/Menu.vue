<template>
  <div>
    <h3>Detail du restaurant : {{restaurant.name}}</h3>
    <button v-on:click="RedirectUrl()">Retour a la fiche detail du restaurant</button>
    <button v-on:click="passezCommande()">Passez commande</button>

    <h3 v-if="total != 0">Total TTC : {{ total }}</h3>
    <h3 v-else>Votre panier est vide</h3>

	<div id="menuPicker">

		<table>
			<tr class="title">
				<th>Entrees</th>
				<th>Prix</th>
				<th>Quantite</th>
			</tr>
			<tbody>
				<tr class="content" v-for="e,index in tab_entrees">

				<td>{{ e.entree }}</td>
				<td>{{ e.prix }} E</td>
				<td>
						<button v-on:click="increase_quantity(index, tab_entrees)">+</button>
						<input readonly type="number" name="value_quantity" min="0" max="100" v-bind:value=e.qu>
						<button  v-on:click="decrese_quantity(index, tab_entrees)">-</button>
				</td>
				</tr>
			</tbody>
		</table>
		<br/>
		<table>
			<tr class="title">
				<th>Plats</th>
				<th>Prix</th>
				<th>Quantite</th>
			</tr>
			<tbody>
				<tr
				class="content"
				v-for="p, index in tab_plats"
				>
				<td>{{p.plat}}</td>
				<td>{{p.prix}} E</td>
				<td>
						<button v-on:click="increase_quantity(index, tab_plats)">+</button>
						<input readonly type="number" name="value_quantity" min="0" max="100" v-bind:value=p.qu>
						<button  v-on:click="decrese_quantity(index, tab_plats)">-</button>
				</td>
				</tr>
			</tbody>
		</table>
		<br/>
		<table>
			<tr class="title">
				<th>Desserts</th>
				<th>Prix</th>
				<th>Quantite</th>
			</tr>
			<tbody>
				<tr
				class="content"
				v-for="d, index in tab_desserts"
				>
				<td>{{d.dessert}}</td>
				<td>{{d.prix}} E</td>
				<td>
						<button v-on:click="increase_quantity(index,tab_desserts)">+</button>
						<input readonly type="number" name="value_quantity" min="0" max="100" v-bind:value=d.qu>
						<button  v-on:click="decrese_quantity(index, tab_desserts)">-</button>
				</td>
				</tr>
			</tbody>
		</table>
	</div>

	<div id='bill' style="display : none">
		<app-bill
			:products="shoppingCart"
			@commandSent="shoppingCart = []; total = 0"
		></app-bill>
	</div>

  </div>
</template>

<script>
export default {
  name: "app-menu",
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
      entrees: {
          entree: [
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
          prix: [
              10,
              12,
              9,
              5,
              8,
              12,
              10,
              10,
              14,
              10
          ]
      },
      plats: {
          plat: [
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
          prix: [
              10,
              9,
              15,
              12,
              19,
              20,
              14,
              15,
              10,
              17
          ]
      },
      desserts: {
          dessert:[
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
          ],
          prix: [
              8,
              6,
              9,
              5,
              7,
              6,
              9,
              4,
              6,
              8
          ]
      },
      value_quantity:0,
	  total:0,
	  shoppingCart : []
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

      fetch(url)
        .then(reponseJSON => {
          return reponseJSON.json();
        })
        .then(reponseJS => {

          this.restaurant = reponseJS.restaurant;
        })
        .catch(err => {
          console.error("Une erreur est intervenue " + err);
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
        var obj = {};
        var ent = "";
        var pr = 0;
        for(var i= 0; i < 5; i++){
            rd = this.getRandomInt(10);
            ent = this.entrees.entree[rd];
            pr = this.entrees.prix[rd];
            obj = {'entree' : ent , 'prix': pr, qu:0};
            this.tab_entrees.push(obj);
            ent = this.plats.plat[rd];
            pr = this.plats.prix[rd];
            obj = {'plat' : ent , 'prix': pr, qu:0};
            this.tab_plats.push(obj);
            ent = this.desserts.dessert[rd];
            pr = this.desserts.prix[rd];
            obj = {'dessert' : ent , 'prix': pr, qu:0};
            this.tab_desserts.push(obj);
        }
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
    },
	increase_quantity(index, tab)
	{
        tab[index]['qu']++;
        this.total = this.total + tab[index]['prix'];

    },
	decrese_quantity(index, tab)
	{
        if(tab[index].qu > 0){
            tab[index].qu--;
            this.total = this.total - tab[index]['prix'];
        }
    },
	passezCommande()
	{
		this.shoppingCart = [];
		addOrederedElementsToShoppingCart.bind( this )();

		let menuPicker = this.$el.querySelector( '#menuPicker' );
		let bill = this.$el.querySelector( '#bill' );

		this.toggleVisibility( menuPicker );
		this.toggleVisibility( bill );

		///////////////////////////////////////////////////////

		function addOrederedElementsToShoppingCart()
		{
			/*
				TODO : Retravailler la carte pour plutôt obtenir des produits sous forme
				{ name : 'Pizza', prix : 4, type : 'plat', quantity : 0 }
				afin de pouvoir ajouter directement le produit à un pannier et mettre seulement à jour sa quantité
				puis directement envoyer le panier au component de facture
			*/

			pushOrderedElements.bind( this )( this.tab_entrees );
			pushOrderedElements.bind( this )( this.tab_plats );
			pushOrderedElements.bind( this )( this.tab_desserts );

			//////////////////////////////////////////////////////

			function pushOrderedElements( array )
			{
				if( array )
				{
					array.forEach( dish =>
					{
						if( dish.qu > 0 )
						{
							let type = dish.entree || dish.plat || dish.dessert ;

							let dishCopy = { ...dish };
							delete dishCopy.entree;
							delete dishCopy.plat;
							delete dishCopy.dessert;

							this.shoppingCart.push( { ...dishCopy, type } )
						}
					})
				}
			}
		}

	},
	toggleVisibility( htmlElement )
	{
		console.log( 'css avant', htmlElement.style.display)
		htmlElement.style.display === "none" ? htmlElement.style.display = "block" : htmlElement.style.display = "none";
		console.log( 'css après', htmlElement.style.display)
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
