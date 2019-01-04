<template>
	<div>
		<table>
			<tr class="title">
				<th>Plats</th>
				<th>Prix</th>
				<th>Quantite</th>
			</tr>
			<tbody>
				<tr
					v-for="aProduct, index in products"
				>
					<td>{{ aProduct.plat }}</td>
					<td>{{ aProduct.prix }}</td>
					<td>{{ aProduct.quantite }}</td>
				</tr>
			</tbody>
		</table>

	</div>
</template>

<script>
export default
{
	name : 'bill',
	data()
	{
		return 	{
					restaurant : {},
					products : []
				};
	}
}
</script>

<style>

</style>

