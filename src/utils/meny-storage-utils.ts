import { MenyNode } from '../reducer/menu-duck';
import { Language } from '../reducer/language-duck';

export const NAVHEADER = 'NAVHEADER';

export enum MenuValue {
    PRIVATPERSON = 'PRIVATPERSON',
    ARBEIDSGIVER = 'ARBEIDSGIVER',
    SAMARBEIDSPARTNER = 'SAMARBEIDSPARTNER',
    IKKEVALGT = 'IKKEVALGT',
}

enum MenuName {
    Hovedmeny = 'Main menu',
    MinsideMeny = 'My page menu',
}

export const validateMenuNode = (menyNode: MenyNode | undefined) =>
    menyNode && menyNode.children && menyNode.children.length > 0;

export const getSessionStorage = (key: string): string | null => {
    return sessionStorage.getItem(key);
};

export const setSessionStorage = (key: string, value: MenuValue) => {
    return sessionStorage.setItem(key, value);
};

export const oppdaterSessionStorage = (valgVerdi: MenuValue): void => {
    const headervalg = getSessionStorage(NAVHEADER);
    if (headervalg && headervalg === valgVerdi) {
        return;
    }
    setSessionStorage(NAVHEADER, valgVerdi);
};

export const getHovedmenyNode = (
    menypunkter: MenyNode[],
    language: Language,
    arbeidsflate: MenuValue
): MenyNode | undefined => {
    const languageNode = getLanguageNode(language, menypunkter);
    return languageNode
        ? language === Language.NORSK
            ? findNode(languageNode, arbeidsflate)
            : findNode(languageNode, MenuName.Hovedmeny)
        : undefined;
};

export const getMinsideMenyNode = (
    menypunkter: MenyNode[],
    language: Language
): MenyNode | undefined => {
    const languageNode = getLanguageNode(language, menypunkter);
    return languageNode
        ? findNode(languageNode, MenuName.MinsideMeny)
        : undefined;
};

export const getLanguageNode = (
    lang: Language,
    nodeMenu: MenyNode[]
): MenyNode | undefined =>
    ({
        NORSK: nodeMenu.find(n => n.path === '/no'),
        ENGELSK: nodeMenu.find(n => n.path === '/en'),
        SAMISK: nodeMenu.find(n => n.path === '/se'),
    }[lang]);

const findNode = (
    node: MenyNode,
    displayName: string
): MenyNode | undefined => {
    if (node.displayName.toLowerCase() === displayName.toLowerCase()) {
        return node;
    } else if (node.hasChildren) {
        let result = undefined;
        for (let i = 0; result == null && i < node.children.length; i++) {
            result = findNode(node.children[i], displayName);
        }
        return result;
    }
    return undefined;
};
