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

	</div>
</template>

<script>
export default
{
	name : 'bill',
	props :
	[
		'products'
	]
}
</script>

<style>

</style>

