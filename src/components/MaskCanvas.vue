<template>
	<div class="body">
		<div class="stars" ref="starsRef">
			<div class="star" v-for="(item, index) in starsCount" :key="index"></div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				starsCount: 900, //星星数量
				distance: 800, //间距
			}
		},
		mounted() {
			let starNodes = Array.from(this.$refs.starsRef.children);
			starNodes.forEach((item) => {
				let speed = 0.2 + Math.random() * 1;
				let thisDistance = this.distance + Math.random() * 300;
				item.style.transformOrigin = `0 0 ${thisDistance}px`;
				item.style.transform =
					`
		        translate3d(0,0,-${thisDistance}px)
		        rotateY(${Math.random() * 360}deg)
		        rotateX(${Math.random() * -50}deg)
		        scale(${speed},${speed})`;
			});
		}
	}
</script>

<style>
	@keyframes rotate {
		0% {
			transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
		}

		100% {
			transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(-360deg);
		}
	}

	.stars {
		transform: perspective(500px);
		transform-style: preserve-3d;
		position: absolute;
		perspective-origin: 50% 100%;
		left: 45%;
		animation: rotate 90s infinite linear;
		bottom: 0;
	}

	.star {
		width: 2px;
		height: 2px;
		background: #f7f7b6;
		position: absolute;
		left: 0;
		top: 0;
		backface-visibility: hidden;
	}
</style>