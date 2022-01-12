// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { OptionType } from '$lib/components/Filters/Base/Base.svelte';

export const fileTypes: OptionType[] = [
	{ label: 'Adobe Acrobat PDF (.pdf)', value: 'pdf' },
	{ label: 'Adobe Postscript (.ps)', value: 'ps' },
	{ label: 'Autodesk DWF (.dwf)', value: 'dwf' },
	{ label: 'Google Earth KML (.kml)', value: 'kml' },
	{ label: 'Google Earth KMZ (.kmz)', value: 'kmz' },
	{ label: 'Microsoft Excel (.xls)', value: 'xls' },
	{ label: 'Microsoft PowerPoint (.ppt)', value: 'ppt' },
	{ label: 'Microsoft Word (.doc)', value: 'doc' },
	{ label: 'Rich Text Format (.rtf)', value: 'rtf' },
	{ label: 'Shockwave Flash (.swf)', value: 'swf' }
];
