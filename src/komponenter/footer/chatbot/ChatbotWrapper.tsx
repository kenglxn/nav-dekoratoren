import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { verifyWindowObj } from 'utils/Environment';
import moment from 'moment-timezone';
import { finnTekst } from 'tekster/finn-tekst';
import { getResizeObserver } from 'utils/resize-observer';
import debounce from 'lodash.debounce';
import './ChatbotWrapper.less';

// Prevents nodejs renderer crash
const Chat = verifyWindowObj() ? require('@navikt/nav-chatbot') : () => null;

const humanChatIsOpen = (serverTime: number) => {
    const now = moment(serverTime).tz('Europe/Oslo');
    if (now.isoWeekday() > 5) {
        return false;
    }
    const opening = moment(now).hours(9).minutes(0);
    const closing = moment(now).hours(14).minutes(30);
    return now.isBetween(opening, closing, 'minutes', '[)');
};

const dockIfNearBottom = (
    chatbotElement: HTMLElement,
    dockElement: HTMLElement,
    chatbotBottomOffset: number
) => () => {
    const chatbotFixedPosition =
        window.innerHeight - chatbotElement.scrollHeight;
    const chatbotDockedPosition =
        dockElement.getBoundingClientRect().top + chatbotBottomOffset;

    if (chatbotFixedPosition > chatbotDockedPosition) {
        chatbotElement.style.position = 'static';
    } else {
        chatbotElement.style.removeProperty('position');
    }
};

const stateSelector = (state: AppState) => ({
    paramChatbot: state.environment.PARAMS.CHATBOT,
    language: state.language.language,
    serverTime: state.environment.SERVER_TIME,
    menuIsActive:
        state.dropdownToggles.hovedmeny ||
        state.dropdownToggles.minside ||
        state.dropdownToggles.sok ||
        state.dropdownToggles.varsler,
});

type Props = {
    customerKey?: string;
    queueKey?: string;
    configId?: string;
};

export const ChatbotWrapper = ({
    customerKey = '41155',
    queueKey = 'Q_CHAT_BOT',
    configId = '599f9e7c-7f6b-4569-81a1-27202c419953',
}: Props) => {
    const { paramChatbot, language, serverTime, menuIsActive } = useSelector(
        stateSelector
    );
    const [cookies] = useCookies();
    const [mountChatbot, setMountChatbot] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const dockRef = useRef<HTMLDivElement>(null);

    const labelText = finnTekst(
        humanChatIsOpen(serverTime) ? 'chat-veileder' : 'chat-chatbot',
        language
    );

    useEffect(() => {
        const chatbotSessionActive = !!cookies['chatbot-frida_config'];
        const chatbotVersion122IsMounted =
            document.getElementsByClassName('gxKraP').length > 0;
        setMountChatbot(
            !chatbotVersion122IsMounted &&
                (chatbotSessionActive || paramChatbot)
        );
    }, []);

    useEffect(() => {
        if (!mountChatbot) {
            return;
        }
        const chatbotElement = containerRef.current;
        const dockElement = dockRef.current;
        if (!chatbotElement || !dockElement) {
            return;
        }

        const chatbotBottomOffset =
            window.innerHeight - chatbotElement.getBoundingClientRect().bottom;
        const repositionHandler = dockIfNearBottom(
            chatbotElement,
            dockElement,
            chatbotBottomOffset
        );

        const bodyResizeObserver = getResizeObserver(
            debounce(repositionHandler, 100)
        );

        repositionHandler();

        window.addEventListener('scroll', repositionHandler);
        bodyResizeObserver.observe(document.body);
        return () => {
            window.removeEventListener('scroll', repositionHandler);
            bodyResizeObserver.unobserve(document.body);
        };
    }, [mountChatbot]);

    return mountChatbot ? (
        <div className={'chatbot-dock'} ref={dockRef}>
            <div
                className={`chatbot-container${
                    menuIsActive ? ' chatbot-container__menu-active' : ''
                }`}
                ref={containerRef}
            >
                <Chat
                    customerKey={customerKey}
                    queueKey={queueKey}
                    configId={configId}
                    label={labelText}
                />
            </div>
        </div>
    ) : null;
};