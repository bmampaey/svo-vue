/* Define constants global to the whole App */

/* Type of events and their user friendly equivalent */
export const HEK_EVENT_TYPE_NAMES = Object.freeze({
	AR: 'Active Region',
	CE: 'CME',
	CD: 'Coronal Dimming',
	CH: 'Coronal Hole',
	CW: 'Coronal Wave',
	FI: 'Filament',
	FE: 'Filament Eruption',
	FA: 'Filament Activation',
	FL: 'Flare',
	LP: 'Loop',
	OS: 'Oscillation',
	SS: 'Sunspot',
	EF: 'Emerging Flux',
	CJ: 'Coronal Jet',
	PG: 'Plage',
	OT: 'Other',
	NR: 'Nothing Reported',
	SG: 'Sigmoid',
	SP: 'Spray Surge',
	CR: 'Coronal Rain',
	CC: 'Coronal Cavity',
	ER: 'Eruption',
	TO: 'Topological Object'
});

/* The URL for the HEK API */
export const HEK_API_URL = 'http://www.lmsal.com/hek/her';

/* The minimum required search params for a search request to the HEK API to be successful */
export const HEK_EVENT_LIST_SEARCH_PARAMS = Object.freeze({
	cosec: 2, // ask for json
	cmd: 'search', // search command
	type: 'column',
	event_coordsys: 'helioprojective', //always specify wide coordinates, otherwise does not work
	x1: '-5000',
	x2: '5000',
	y1: '-5000',
	y2: '5000',
	return: 'event_type,event_starttime,event_endtime,kb_archivid,gs_thumburl,frm_name,frm_identifier', // limit the returned fields
	event_type: '**', // override to only select some event types
	event_starttime: new Date(Date.UTC(1975, 9, 1)).toISOString(), // The first HEK event is in september 1975
	event_endtime: new Date().toISOString()
});

/* The required search params for converting an avent ivorn (kb_archivid) to a URL with the details of the event */
export const HEK_EVENT_DETAIL_SEARCH_PARAMS = Object.freeze({
	cmd: 'view-voevent',
	ivorn: ''
});

/* The URL of the SDA API server. All URLs in the SDA are absolute, so do not specify the API URL here */
export const SDA_SERVER = 'http://solarnet.oma.be';

/* The absolute URL of the SDA API */
export const SDA_API_URL = '/SDA/api/v1';

/* The absolute URL of the SDA API login interface */
export const SDA_LOGIN_URL = '/SDA/api/v1/user/login/';

/* The default page size for paginated tables: HekEventList and MetadataList */
export const DEFAULT_PAGE_SIZE = 10;
