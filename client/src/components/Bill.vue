<template>
	<div>

		<table>

			<tr class="title">
				<th>Plats</th>
				<th>Prix</th>
				<th>Quantite</th>
			</tr>
			<tbody>
				<tr v-for="aProduct in products" :key="aProduct.plat">
					<td>{{ aProduct.type }}</td>
					<td>{{ aProduct.prix }}</td>
					<td>{{ aProduct.qu }}</td>
				</tr>
			</tbody>
		</table>

		<div
			v-if="products.length == 0"
			style="margin:auto;width:50%;text-align:center;"
		>
			Votre panier est vide
		</div>

		<div>

			<button @click="validateCommand()">Valider</button>

			<div id='message'></div>

		</div>

	</div>
</template>

<script>
export default
{
	name : 'app-bill',
	props :
	[
		'products'
	],
	methods :
	{
		validateCommand()
		{
			this.$el.querySelector( '#message' ).innerText = 'Votre commande a été envoyé.'
			this.$emit( 'commandSent' );
		}
	}
}
</script>

<style>

table
{
	border-spacing: 20px;
}

/* TODO make a component out of this button instead of copy pasting the css everytime */
button
{
	background: #cdb1b2;
	color: #7e3d4e;
	padding: 15px;
	border-radius: 0;
	font-weight: bold;
	font-size: 15px;
	border: 0;
	border-radius: 50px;
}


#message
{
	color: lightcoral;
}

</style>

