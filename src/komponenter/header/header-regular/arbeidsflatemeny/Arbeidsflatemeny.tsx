import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { Undertekst } from 'nav-frontend-typografi';
import { arbeidsflateLenker } from './arbeidsflate-lenker';
import { GACategory } from 'utils/google-analytics';
import { LenkeMedGA } from 'komponenter/LenkeMedGA';
import { useCookies } from 'react-cookie';
import { settArbeidsflate } from 'store/reducers/arbeidsflate-duck';
import { cookieOptions } from 'store/reducers/arbeidsflate-duck';
import Tekst from 'tekster/finn-tekst';
import BEMHelper from 'utils/bem';
import { erNavDekoratoren } from 'utils/Environment';
import './Arbeidsflatemeny.less';

const Arbeidsflatemeny = () => {
    const cls = BEMHelper('arbeidsflate');
    const dispatch = useDispatch();
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    const [, setCookie] = useCookies(['decorator-context']);
    const arbeidsflate = useSelector(
        (state: AppState) => state.arbeidsflate.status
    );

    return (
        <nav className={cls.className} aria-label="Velg brukergruppe">
            <ul className={cls.element('topp-liste-rad')} role="tablist">
                {arbeidsflateLenker(XP_BASE_URL).map((lenke) => {
                    return (
                        <li
                            role="tab"
                            aria-selected={arbeidsflate === lenke.key}
                            className={cls.element('liste-element')}
                            key={lenke.key}
                        >
                            <LenkeMedGA
                                classNameOverride={cls.element('lenke')}
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
                                gaEventArgs={{
                                    context: arbeidsflate,
                                    category: GACategory.Header,
                                    action: 'arbeidsflate-valg',
                                }}
                            >
                                <div
                                    className={cls.element(
                                        'lenke-inner',
                                        arbeidsflate === lenke.key
                                            ? 'active'
                                            : ''
                                    )}
                                >
                                    <Undertekst>
                                        <Tekst id={lenke.lenkeTekstId} />
                                    </Undertekst>
                                </div>
                            </LenkeMedGA>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Arbeidsflatemeny;