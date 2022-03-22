import { verifyWindowObj } from 'utils/Environment';
import { Params } from 'store/reducers/environment-duck';
import { InnloggingsstatusState } from '../store/reducers/innloggingsstatus-duck';

// Hindrer crash ved server-side kjøring (amplitude.js fungerer kun i browser)
const amplitude = verifyWindowObj() ? require('amplitude-js') : () => null;

export const initAmplitude = () => {
    if (amplitude) {
        amplitude.getInstance().init('default', '', {
            apiEndpoint: 'amplitude.nav.no/collect-auto',
            saveEvents: false,
            includeUtm: true,
            includeReferrer: true,
            platform: window.location.toString(),
        });
    }
};

export const logPageView = (params: Params, authState: InnloggingsstatusState) => {
    // Wait a second before logging to improve our chances of getting the actual document title
    // from client-side rendered applications
    setTimeout(() => {
        console.log(`Logger sidevisning for ${document.title} - ${authState.data.securityLevel}`);
        logAmplitudeEvent('sidevisning', {
            sidetittel: document.title,
            platform: window.location.toString(),
            innlogging: authState.data.securityLevel ?? false,
            parametre: {
                ...params,
                BREADCRUMBS: !!(params?.BREADCRUMBS && params.BREADCRUMBS.length > 0),
                ...(params.AVAILABLE_LANGUAGES && {
                    AVAILABLE_LANGUAGES: params.AVAILABLE_LANGUAGES.map((lang) => lang.locale),
                }),
            },
        });
    }, 1000);
};

export const logAmplitudeEvent = (eventName: string, data?: any): Promise<any> => {
    return new Promise(function (resolve: any) {
        const eventData = data || {};
        eventData.origin = 'dekoratøren';
        eventData.originVersion = 'unknown';

        if (amplitude) {
            amplitude.getInstance().logEvent(eventName, eventData, resolve);
        }
    });
};
