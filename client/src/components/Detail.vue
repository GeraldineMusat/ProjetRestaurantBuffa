<template>
<div>

    <h3>Detail du restaurant : {{r['name']}}</h3>

    <div class="rowContainer">

		<GmapMap
			:center="coordinates"
			:zoom="7"
			map-type-id="terrain"
			class="map"
		>
			<GmapMarker
				:position="coordinates"
				:clickable="true"
				:draggable="true"
			/>
		</GmapMap>

		<app-restau-detail
			v-bind:cuisine="r['cuisine']"
			v-bind:building="a['building']"
			v-bind:street="a['street']"
			v-bind:zipcode="a['zipcode']"
			v-bind:borough="r['borough']"
		>
		</app-restau-detail>

		<!--  Notes -->
		<div>
			<h3>Note(s)</h3>

			<table>
				<tr class="title">
					<th>Date</th>
					<th>Grade</th>
					<th>Score</th>
				</tr>

				<tbody>
					<app-grades
					v-for="g in grades"
					v-bind:date="g.date"
					v-bind:grade="g.grade"
					v-bind:score="g.score"
					></app-grades>
				</tbody>
			</table>
		</div>

    </div>

	<div class="menuDiv">
		<router-link class="button" :to="`/menu/${restaurant._id}`">Voir le menu</router-link>
	</div>

</div>
</template>

<script>

export default
{
  data()
  {
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
      coordinates :
      {
        lat : "",
        lng : ""
      },
      r: {
        name: "",
        cuisine: "",
        borough: ""
      },
      a: {
        building: "",
        street: "",
        zipcode: ""
      }
    };
  },
  mounted()
  {
    this.recupResto();
    console.log("AVANT AFFICHAGE");
    this.getRestaurantsFromServer();
  },
  methods:
  {
    getRestaurantsFromServer()
    {
		let url = "http://localhost:4545/api/restaurants/" + this.restID;

		fetch(url)
			.then(reponseJSON =>
			{
				return reponseJSON.json();
			})
			.then(reponseJS =>
			{
				this.restaurant = reponseJS.restaurant;
				this.grades = reponseJS.restaurant.grades;

				this.grades.forEach( grade =>
				{
					let date = new Date( grade.date );
					let noMonth = date.getMonth();
					let noDay = date.getDay();
					let noYear = date.getFullYear();

					grade.date = `${ noYear }-${ noDay }-${ noMonth }`;
				});


				this.r["cuisine"] = this.restaurant.cuisine;

				this.r["name"] = this.restaurant.name;
				this.r["borough"] = this.restaurant.borough;

				if( this.restaurant.address )
				{
					this.a["building"] = this.restaurant.address.building;
					this.a["street"] = this.restaurant.address.street;
          this.a["zipcode"] = this.restaurant.address.zipcode;

          this.coordinates.lat = this.restaurant.address.coord[ 0 ];
          this.coordinates.lng = this.restaurant.address.coord[ 1 ];
				}
			})
			.catch( err => console.error("Une erreur est intervenue " + err ) );
    },
	recupResto()
	{
		var CheminComplet = document.location.href;
		var tab = CheminComplet.split("/");
		this.restID = tab[4];
    }
  }
};
</script>

<style>

.button {
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

.map
{
  width: 500px;
  height: 300px
}

.rowContainer
{
	display: flex;
	justify-content: space-around
}

.menuDiv
{
	margin: auto;
	position: absolute;
	left: 50%;
}
</style>
