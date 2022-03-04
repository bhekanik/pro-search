<script lang="ts">
	import QRCode from 'qrcode';

	let canvas = null;
	export let link: string;

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
				function (error: unknown) {
					if (error) console.error(error);
				}
			);
		}
	}
</script>

<canvas bind:this={canvas} />
