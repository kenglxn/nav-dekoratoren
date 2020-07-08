import React, { Fragment, useEffect, useState } from 'react';
import FooterTopp from './footer-topp/FooterTopp';
import FooterBottom from './footer-bottom/FooterBottom';
import { verifyWindowObj } from 'utils/Environment';
import checkIfContainsUrl from 'utils/url-filter/url-filter';
import Feedback from '../feedback/Feedback';

const FooterRegular = () => {
    const [showFeedback, setShowFeedback] = useState(false);

    const useReactPath = () => {
        const [path, setPath] = useState(window.location.pathname);

        const listenToPopstate = () => {
            const winPath = window.location.pathname;
            setPath(winPath);
        };

        useEffect(() => {
            window.addEventListener('popstate', listenToPopstate);
            return () => {
                window.removeEventListener('popstate', listenToPopstate);
            };
        }, []);
        return path;
    };

    const path = verifyWindowObj() ? useReactPath() : '';

    useEffect(() => {
        if (checkIfContainsUrl(path)) {
            setShowFeedback(true);
        } else {
            setShowFeedback(false);
        }
    }, [path]);

    return (
        <Fragment>
            {showFeedback && <Feedback />}
            <FooterTopp />
            <FooterBottom />
        </Fragment>
    );
};

export default FooterRegular;
