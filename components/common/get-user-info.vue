<template>
	<u-popup v-model="show" mode="center" border-radius="14">
		<view>
			人生若只如初见，何事秋风悲画扇
		</view>
	</u-popup>
</template>

<script>
	export default {
		data() {
			return {
				show:false
			}
		},
		methods: {
			getdata(){
				this.show = true;
			}
		}
	}
</script>

<style>
</style>
