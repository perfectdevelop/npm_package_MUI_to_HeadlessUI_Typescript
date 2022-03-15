import React from 'react';
import Button from './Button';
import { useTranslate } from 'ra-core';

const skipToContent = () => {
    if (typeof document === 'undefined') return;
    const element = document.getElementById('main-content');

    if (!element) {
        if (process.env.NODE_ENV !== 'production') {
            console.warn(
                'No element with id "main-content" was found. Ensure the element that contains your main content has an id of "main-content".'
            );
        }

        return;
    }

    element.setAttribute('tabIndex', '-1');
    element.focus();
    element.blur();
    element.removeAttribute('tabIndex');
};

const SkipNavigationButton = () => {
    const translate = useTranslate();

    return (
        <Button
            onClick={skipToContent}
            className="skip-nav-button fixed p-1 bg-slate-400 text-slate-400 left-2 hover:opacity-80 focus:top-2"
            label={translate('ra.navigation.skip_nav')}
            variant="contained"
        />
    );
};

export default SkipNavigationButton;
