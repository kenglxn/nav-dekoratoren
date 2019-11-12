import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../reducer/reducer';
import { Dispatch } from '../../../redux/dispatch-type';
import { finnArbeidsflate } from '../../../reducer/arbeidsflate-duck';
import { EtikettLiten } from 'nav-frontend-typografi';
import BEMHelper from '../../../utils/bem';
import {
    MenuValue,
    oppdaterSessionStorage,
} from '../../../utils/meny-storage-utils';
import { toppmenyLenker } from './toppmeny-lenker';
import './Toppmeny.less';

interface StateProps {
    arbeidsflate: MenuValue;
}

interface DispatchProps {
    settArbeidsflate: () => void;
}

type ToppmenyProps = StateProps & DispatchProps;

const Toppmeny = ({ settArbeidsflate, arbeidsflate }: ToppmenyProps) => {
    const cls = BEMHelper('toppmeny');

    return (
        <nav className="toppmeny" id="toppmeny">
            <ul className={cls.element('topp-liste-rad')} role="tablist">
                {toppmenyLenker.map(
                    (lenke: {
                        tittel: string;
                        url: string;
                        key: MenuValue;
                    }) => {
                        return (
                            <li
                                role="tab"
                                aria-selected={arbeidsflate === lenke.tittel}
                                className={cls.element('list-element')}
                                key={lenke.tittel}
                            >
                                <a
                                    className={cls.element('lenke')}
                                    href={lenke.url}
                                    onClick={event => {
                                        oppdaterSessionStorage(
                                            event,
                                            lenke.key,
                                            lenke.url
                                        );
                                        settArbeidsflate();
                                    }}
                                >
                                    <div
                                        className={cls.element(
                                            'lenke-inner',
                                            arbeidsflate === lenke.tittel
                                                ? 'active'
                                                : ''
                                        )}
                                    >
                                        <EtikettLiten>
                                            {lenke.tittel}
                                        </EtikettLiten>
                                    </div>
                                </a>
                            </li>
                        );
                    }
                )}
            </ul>
        </nav>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    arbeidsflate: state.arbeidsflate.status,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    settArbeidsflate: () => dispatch(finnArbeidsflate()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Toppmeny);
