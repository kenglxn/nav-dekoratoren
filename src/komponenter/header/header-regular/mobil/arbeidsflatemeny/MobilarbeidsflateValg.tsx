import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import BEMHelper from 'utils/bem';
import { settArbeidsflate } from 'store/reducers/arbeidsflate-duck';
import { cookieOptions } from 'store/reducers/arbeidsflate-duck';
import { MenuValue } from 'utils/meny-storage-utils';
import { arbeidsflateLenker } from 'komponenter/header/header-regular/common/arbeidsflate-lenker';
import { GACategory } from 'utils/google-analytics';
import { LenkeMedGA } from 'komponenter/common/LenkeMedGA';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import { finnTekst } from 'tekster/finn-tekst';
import { Language } from 'store/reducers/language-duck';
import { erNavDekoratoren } from 'utils/Environment';
import { useCookies } from 'react-cookie';
import './MobilarbeidsflateValg.less';

interface Props {
    tabindex: boolean;
    lang: Language;
}

const stateProps = (state: AppState) => ({
    arbeidsflate: state.arbeidsflate.status,
});

const MobilarbeidsflateValg = ({ tabindex, lang }: Props) => {
    const dispatch = useDispatch();
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    const [, setCookie] = useCookies(['decorator-context']);
    const { arbeidsflate } = useSelector(stateProps);
    const cls = BEMHelper('mobil-arbeidsflate-valg');

    return (
        <ul className={cls.className}>
            {arbeidsflateLenker(XP_BASE_URL).map(
                (lenke: {
                    url: string;
                    lenkeTekstId: string;
                    stikkordId: string;
                    footerStikkordId: string;
                    key: MenuValue;
                }) => {
                    return arbeidsflate === lenke.key ? null : (
                        <li
                            key={lenke.key}
                            className={cls.element('liste-element')}
                        >
                            <LenkeMedGA
                                href={lenke.url}
                                onClick={(event) => {
                                    event.preventDefault();
                                    dispatch(settArbeidsflate(lenke.key));
                                    setCookie(
                                        'decorator-context',
                                        lenke.key,
                                        cookieOptions
                                    );
                                    if (!erNavDekoratoren()) {
                                        window.location.href = lenke.url;
                                    }
                                }}
                                tabIndex={tabindex ? 0 : -1}
                                gaEventArgs={{
                                    context: arbeidsflate,
                                    category: GACategory.Header,
                                    action: 'arbeidsflate-valg',
                                }}
                            >
                                <Undertittel>
                                    <span
                                        className={cls.element('lenke-tittel')}
                                    >
                                        {lenke.key
                                            .charAt(0)
                                            .toUpperCase()
                                            .concat(
                                                lenke.key.slice(1).toLowerCase()
                                            )}
                                    </span>{' '}
                                </Undertittel>
                                <Normaltekst>
                                    {finnTekst(lenke.stikkordId, lang)
                                        .split('|')
                                        .map((ord) => {
                                            return (
                                                <span
                                                    className="bullet"
                                                    key={ord}
                                                >
                                                    {ord}
                                                </span>
                                            );
                                        })}
                                </Normaltekst>
                            </LenkeMedGA>
                        </li>
                    );
                }
            )}
        </ul>
    );
};

export default MobilarbeidsflateValg;