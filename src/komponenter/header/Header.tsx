import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../reducer/reducer';
import { Language } from '../../reducer/language-duck';
import { fetchMenypunkter } from '../../reducer/menu-duck';
import Skiplinks from './skiplinks/Skiplinks';
import Mobilmeny from './meny/Mobilmeny';
import Arbeidsflatemeny from './arbeidsflatemeny/Arbeidsflatemeny';
import Desktopmeny from './meny/Desktopmeny';

export const Header = () => {
    const dispatch = useDispatch();
    const language = useSelector((state: AppState) => state.language.language);

    useEffect(() => {
        fetchMenypunkter()(dispatch);
    }, []);

    return (
        <>
            <Skiplinks />
            <header className="siteheader">
                <div className="media-sm-mobil mobil-meny">
                    <Mobilmeny />
                </div>
                <div className="media-md-tablet tablet-desktop-meny">
                    {language === Language.NORSK && <Arbeidsflatemeny />}
                    <Desktopmeny language={language} />
                </div>
            </header>
        </>
    );
};

export default Header;
