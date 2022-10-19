import React from 'react';
import { AppState } from 'store/reducers';
import { Heading } from '@navikt/ds-react';
import Tekst from 'tekster/finn-tekst';
import { useSelector } from 'react-redux';
import BEMHelper from 'utils/bem';
import AlleVarslerLenke from './AlleVarslerLenke';
import { VarselListe } from './VarselListe';
import IngenVarslerIkon from 'ikoner/varsler/IngenVarslerIkon';
import './Varselvisning.less';

const stateSelector = (state: AppState) => ({
    varsler: state.varsler.data,
    minSideUrl: state.environment.MIN_SIDE_URL,
});

type Props = {
    setKbId?: boolean;
};

export const Varselvisning = ({ setKbId }: Props) => {
    const { varsler, minSideUrl } = useSelector(stateSelector);

    const antallVarsler = varsler?.oppgaver.length + varsler?.beskjeder.length + varsler?.innbokser.length;
    const isTomListe = varsler && antallVarsler === 0;

    const cls = BEMHelper('varsler-visning');

    return (
        <div className={isTomListe ? 'varsler-visning-tom' : 'varsler-visning'}>
            <Heading
                level="2"
                size="medium"
                className={isTomListe ? 'varsler-visning-tom-tittel' : 'varsler-visning-tittel'}
            >
                <Tekst id={'varsler-tittel'} />
            </Heading>
            {isTomListe ? (
                <div className={'varsler-visning-tom-liste'}>
                    <IngenVarslerIkon />
                    <p className="varsler-tom-hovedtekst">
                        <Tekst id={'varsler-tom-liste'} />
                    </p>
                    <p className="varsler-tom-ingress">
                        <Tekst id={'varsler-tom-liste-ingress'} />
                    </p>
                </div>
            ) : (
                <VarselListe varsler={varsler} rowIndex={setKbId ? 0 : undefined} />
            )}
            <AlleVarslerLenke varselInnboksUrl={`${minSideUrl}varslinger`} rowIndex={setKbId ? 1 : undefined} />
        </div>
    );
};
