import React from 'react';
import { MenuValue } from '../../../../../../../utils/meny-storage-utils';
import BEMHelper from '../../../../../../../utils/bem';
import Tekst from '../../../../../../../tekster/finn-tekst';
import Lenke from 'nav-frontend-lenker';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../../../reducer/reducers';

interface Props {
    arbeidsflate: MenuValue;
    erInnlogget: boolean;
    tabindex: boolean;
}

const ForsideLenke = (props: Props) => {
    const cls = BEMHelper('forsideLenke');
    const { DITT_NAV_URL, MINSIDE_ARBEIDSGIVER_URL } = useSelector(
        (state: AppState) => state.environment
    );
    return (
        <>
            {props.arbeidsflate === MenuValue.PRIVATPERSON &&
                props.erInnlogget && (
                    <div className={cls.className}>
                        <Undertittel className={cls.element('ingress')}>
                            <Tekst id="person-minside-lenke" />
                        </Undertittel>
                        <Lenke
                            href={DITT_NAV_URL}
                            className={cls.element('lenke')}
                            tabIndex={props.tabindex ? 0 : -1}
                        >
                            <Tekst id="ga-til-min-side-mobil" />
                        </Lenke>
                    </div>
                )}
            {props.arbeidsflate === MenuValue.ARBEIDSGIVER && (
                <div className={cls.className}>
                    <Undertittel className={cls.element('ingress')}>
                        <Tekst id="min-side-arbeidsgiver" />
                    </Undertittel>
                    <Lenke
                        href={MINSIDE_ARBEIDSGIVER_URL}
                        className={cls.element('lenke')}
                        tabIndex={props.tabindex ? 0 : -1}
                    >
                        <Tekst id="ga-til-min-side-mobil" />
                    </Lenke>
                </div>
            )}
        </>
    );
};

export default ForsideLenke;