export default class Environment {
    static baseUrl: string;
    static baseUrlEnonic: string;
    static innloggingslinjenUrl: string;
    static loginUrl: string;
    static logoutUrl: string;
    static menypunkter: string;
    static minsideArbeidsgiverUrl: string;
    static sokeresultat: string;
    static varselinnboksUrl: string;

    static settEnv = (result: any) => {
        Environment.baseUrl = result.baseUrl;
        Environment.baseUrlEnonic = result.baseUrlEnonic;
        Environment.innloggingslinjenUrl = result.innloggingslinjenUrl;
        Environment.loginUrl = result.loginUrl;
        Environment.logoutUrl = result.logoutUrl;
        Environment.menypunkter = result.menypunkter;
        Environment.minsideArbeidsgiverUrl = result.minsideArbeidsgiverUrl;
        Environment.sokeresultat = result.sokeresultat;
        Environment.varselinnboksUrl = result.varselinnboksUrl;
    };
}

export const fetchEnv = () => {
    return new Promise(resolve => {
        const envDom = document.getElementById('decorator-env');
        if (envDom) {
            const url = envDom.getAttribute('data-src');
            if (url) {
                fetch(url)
                    .then(result => result.json())
                    .then(result => {
                        Environment.settEnv(result);
                        resolve(result);
                    })
                    .catch(error => {
                        throw error;
                    });
            }
        } else {
            throw 'Fant ikke data-src fra decorator-env i dom';
        }
    });
};

export const verifyWindowObj = () => {
    return typeof window !== 'undefined';
};

export const erNavDekoratoren = (): boolean => {
    return (
        verifyWindowObj() && window.location.href.includes('/nav-dekoratoren')
    );
};
