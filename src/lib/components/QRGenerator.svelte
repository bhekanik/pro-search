<script lang="ts">
	import QRCode from 'qrcode';

	let canvas = null;
	export let link;

	$: {
		if (canvas && link) {
			QRCode.toCanvas(
				canvas,
				link,
				{
					color: {
						dark: '#5b20a6'
					}
				},
				function (error) {
					if (error) console.error(error);
					console.log('success!');
				}
			);
		}
	}
</script>

<canvas bind:this={canvas} />
