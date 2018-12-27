import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Restaurants from './components/Restaurants.vue';
import Add from './components/AddRestaurants.vue';
import Info from './components/Info.vue';
import Detail from './components/Detail.vue';

// Définition des routes
Vue.use(VueRouter);

const routes = [
	{path:'/restaurants', component: Restaurants},
	{path:'/add', component: Add},
	{path:'/info', component: Info},
	{path:'/detail/:id', component: Detail},
]

const router = new VueRouter({
	routes: routes,
	mode:'history'
})

Vue.component("app-info", Info);

Vue.component('app-grades', {
	props: ['date', 'grade', 'score'],
	data: function() {
		return {
		}
	},
	template: 
		`
		<table>
		  <tr>
			<th>Date</th>
			<th>Grade</th>
			<th>Score</th>
		  </tr>
	
		  <tbody>
			<tr>
			  <td>{{date}}</td>
			  <td>{{grade}}</td>
			  <td>{{score}}</td>
			</tr>
		  </tbody>
		</table>
		`
});

Vue.component("app-restau-detail", {
	props: ['cuisine', 'building', 'street', 'zipcode', 'borough'],
	template:
	`
    <ul>
      <li>Cuisine : {{cuisine}}</li>
      <li>Adresse : {{building}}, {{street}} {{zipcode}} {{borough}}</li>
    </ul>
	`
});

new Vue({
  el: '#app',
  router:router,
  render: h => h(App),
  
})
