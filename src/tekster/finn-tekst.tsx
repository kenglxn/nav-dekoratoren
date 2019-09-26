import React from 'react';
import { ledetekster } from './ledetekster';
import { AppState } from '../reducer/reducer';
import { connect } from 'react-redux';
import {
    Language,
    spraakValgEngelsk,
    spraakValgNorsk,
    spraakValgSamisk,
} from '../reducer/language-duck';

export function finnTekst(id: string, language: Language): string {
    let ledetekst: string = ledetekster[id];

    if (!ledetekst) {
        console.error(`Kunne ikke finne teksten ${id}! Returnerer oppgitt id.`); // tslint:disable-line:no-console
        return id;
    }
    if (spraakValgNorsk(language)) {
        return ledetekst;
    } else if (spraakValgEngelsk(language)) {
        id += '-en';
        ledetekst = ledetekster[id];
    } else if (spraakValgSamisk(language)) {
        id += '-se';
        ledetekst = ledetekster[id];
    }
    return ledetekst;
}

interface OwnProps {
    id: string;
}

interface StateProps {
    language: Language;
}

type TekstProps = OwnProps & StateProps;

const Tekst = ({ id, language }: TekstProps) => {
    return <>{finnTekst(id, language)}</>;
};

const mapStateToProps = (state: AppState): StateProps => ({
    language: state.language.language,
});

export default connect(mapStateToProps)(Tekst);