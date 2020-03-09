import React from 'react';
import BEMHelper from '../../../../../../utils/bem';
import { MenyNode } from '../../../../../../reducer/menu-duck';
import { MenyLenkeSeksjon } from '../../meny-lenker/MenyLenkeSeksjon';
import KbNav, {
    NaviGroup,
    NodeEdge,
} from '../../../../../../utils/keyboard-navigation/kb-navigation';
import { LenkeMedGA } from '../../../../../LenkeMedGA';
import Environment from '../../../../../../utils/Environment';
import { GACategory } from '../../../../../../utils/google-analytics';
import Tekst from '../../../../../../tekster/finn-tekst';
import { Systemtittel } from 'nav-frontend-typografi';
import { KbNavigation } from '../../../../../../utils/keyboard-navigation/KbNavigation';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../../reducer/reducer';

type Props = {
    classname: string;
    isOpen: boolean;
    menyLenker: MenyNode | undefined;
};

export const MinsideDropdown = (props: Props) => {
    const { classname, isOpen, menyLenker } = props;
    const parentKbNode = useSelector(
        (state: AppState) => state.keyboardNodes.minside
    );
    const cls = BEMHelper(classname);

    if (!menyLenker) {
        return null;
    }

    return (
        <KbNavigation
            group={NaviGroup.DesktopMinsideMeny}
            rootIndex={{ col: 0, row: 0, sub: 0 }}
            maxColsPerSection={[1, 1, 3]}
            isEnabled={isOpen}
            parentNode={parentKbNode}
            parentEdge={NodeEdge.Bottom}
        >
            <>
                <div className={cls.element('topp-seksjon')}>
                    <LenkeMedGA
                        href={Environment.DITT_NAV_URL}
                        id={KbNav.getKbId(NaviGroup.DesktopMinsideMeny, {
                            col: 0,
                            row: 1,
                            sub: 0,
                        })}
                        gaEventArgs={{
                            category: GACategory.Header,
                            action: 'dittnav',
                            label: Environment.DITT_NAV_URL,
                        }}
                    >
                        <Tekst id={'til-forside'} />
                    </LenkeMedGA>
                    <Systemtittel
                        className={cls.element('topp-seksjon-tittel')}
                    >
                        <Tekst id={'min-side'} />
                    </Systemtittel>
                </div>
                <div className={cls.element('lenke-seksjoner')}>
                    {menyLenker &&
                        menyLenker.children.map((menygruppe, index) => (
                            <MenyLenkeSeksjon
                                menygruppe={menygruppe}
                                isOpen={isOpen}
                                colIndex={index}
                                rowIndex={2}
                                kbNaviGroup={NaviGroup.DesktopMinsideMeny}
                                key={menygruppe.displayName}
                            />
                        ))}
                </div>
            </>
        </KbNavigation>
    );
};

export default MinsideDropdown;
