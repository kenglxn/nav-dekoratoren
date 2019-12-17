/* tslint:disable:no-shadowed-variable */
import { element } from 'prop-types';

export const verifyWindowObj = () => {
    return typeof window !== 'undefined';
};

export const erNavDekoratoren = (): boolean => {
    return (
        verifyWindowObj() && window.location.href.includes('/nav-dekoratoren')
    );
};

const checkWindowObjIncludes = (searchString: string) => {
    if (verifyWindowObj()) {
        return window.location.origin.toLowerCase().includes(searchString);
    }
    return false;
};

const Environments = () => {
    const envDom = document.getElementById('decorator-env');
    if (envDom) {
        const url = envDom.getAttribute('data-src');
        if (url) {
            fetch(url)
                .then(result => {
                    console.log(result);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    } else {
        console.error('Fant ikke env-config-url in dom');
    }

    if (process.env.NODE_ENV === 'development') {
        return {
            baseUrl: 'http://localhost:3000',
            baseUrlEnonic: 'https://www-x1.nav.no',
            innloggingslinjenUrl: 'http://localhost:3000',
            loginUrl: '#',
            logoutUrl: '#',
            menypunkter:
                'http://localhost:8088/person/nav-dekoratoren/api/get/menyvalg',
            minsideArbeidsgiverUrl:
                'https://arbeidsgiver-q.nav.no/min-side-arbeidsgiver/',
            sokeresultat:
                'http://localhost:8088/person/nav-dekoratoren/api/get/sokeresultat',
        };
    }
    if (checkWindowObjIncludes('-q1.nav.no')) {
        return {
            baseUrl: 'https://www-q1.nav.no',
            baseUrlEnonic: 'https://www-x1.nav.no',
            innloggingslinjenUrl: 'https://www-q1.nav.no',
            loginUrl: 'https://loginservice-q.nav.no',
            logoutUrl: 'https://loginservice-q.nav.no/slo',
            menypunkter:
                'https://www-q0.nav.no/person/nav-dekoratoren/api/get/menyvalg',
            minsideArbeidsgiverUrl:
                'https://arbeidsgiver-q1.nav.no/min-side-arbeidsgiver/',
            sokeresultat:
                'https://www-q0.nav.no/person/nav-dekoratoren/api/get/sokeresultat',
        };
    }
    if (checkWindowObjIncludes('-q6.nav.no')) {
        return {
            baseUrl: 'https://www-q6.nav.no',
            baseUrlEnonic: 'https://www-x1.nav.no',
            innloggingslinjenUrl: 'https://tjenester-q6.nav.no',
            loginUrl: 'https://loginservice-q.nav.no',
            logoutUrl: 'https://loginservice-q.nav.no/slo',
            menypunkter:
                'https://www-q0.nav.no/person/nav-dekoratoren/api/get/menyvalg',
            minsideArbeidsgiverUrl:
                'https://arbeidsgiver-q6.nav.no/min-side-arbeidsgiver/',
            sokeresultat:
                'https://www-q0.nav.no/person/nav-dekoratoren/api/get/sokeresultat',
        };
    }
    if (checkWindowObjIncludes('-q0.nav.no') || checkWindowObjIncludes('-t')) {
        return {
            baseUrl: 'https://www-q0.nav.no',
            baseUrlEnonic: 'https://www-x1.nav.no',
            innloggingslinjenUrl: 'https://www-q0.nav.no',
            loginUrl: 'https://loginservice-q.nav.no',
            logoutUrl: 'https://loginservice-q.nav.no/slo',
            menypunkter:
                'https://www-q0.nav.no/person/nav-dekoratoren/api/get/menyvalg',
            minsideArbeidsgiverUrl:
                'https://arbeidsgiver-q.nav.no/min-side-arbeidsgiver/',
            sokeresultat:
                'https://www-q0.nav.no/person/nav-dekoratoren/api/get/sokeresultat',
        };
    }
    if (checkWindowObjIncludes('-q.nav.no')) {
        return {
            baseUrl: 'https://www-q0.nav.no',
            baseUrlEnonic: 'https://www-x1.nav.no',
            innloggingslinjenUrl: 'https://tjenester-q0.nav.no',
            loginUrl: 'https://loginservice-q.nav.no',
            logoutUrl: 'https://loginservice-q.nav.no/slo',
            menypunkter:
                'https://www-q0.nav.no/person/nav-dekoratoren/api/get/menyvalg',
            minsideArbeidsgiverUrl:
                'https://arbeidsgiver-q.nav.no/min-side-arbeidsgiver/',
            sokeresultat:
                'https://www-q0.nav.no/person/nav-dekoratoren/api/get/sokeresultat',
        };
    }
    return {
        baseUrl: 'https://www.nav.no',
        baseUrlEnonic: 'https://www.nav.no',
        innloggingslinjenUrl: 'https://www.nav.no',
        loginUrl: 'https://loginservice.nav.no',
        logoutUrl: 'https://loginservice.nav.no/slo',
        menypunkter:
            'https://www.nav.no/person/nav-dekoratoren/api/get/menyvalg',
        minsideArbeidsgiverUrl:
            'https://arbeidsgiver.nav.no/min-side-arbeidsgiver/',
        sokeresultat:
            'https://www.nav.no/person/nav-dekoratoren/api/get/sokeresultat',
    };
};

export default Environments;
