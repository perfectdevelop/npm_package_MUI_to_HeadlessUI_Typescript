import * as React from 'react';
import { ReactElement } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Tabs, { TabsProps } from '@material-ui/core/Tabs';
import { useTranslatableContext } from 'ra-core';
import { TranslatableFieldsTab } from './TranslatableFieldsTab';
import { AppBarProps } from '../layout';

/**
 * Default locale selector for the TranslatableFields component. Generates a tab for each specified locale.
 * @see TranslatableFields
 */
export const TranslatableFieldsTabs = (
    props: TranslatableFieldsTabsProps & AppBarProps
): ReactElement => {
    const { groupKey, TabsProps: tabsProps } = props;
    const { locales, selectLocale, selectedLocale } = useTranslatableContext();
    const classes = useStyles(props);

    const handleChange = (event, newLocale): void => {
        selectLocale(newLocale);
    };

    return (
        <AppBar
            color="default"
            position="static"
            className="shadow-none border-0 rounded-tl rounded-tr border-solid border"
        >
            <Tabs
                value={selectedLocale}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                {...tabsProps}
            >
                {locales.map(locale => (
                    <TranslatableFieldsTab
                        key={locale}
                        value={locale}
                        locale={locale}
                        groupKey={groupKey}
                    />
                ))}
            </Tabs>
        </AppBar>
    );
};

export interface TranslatableFieldsTabsProps {
    TabsProps?: TabsProps;
    groupKey?: string;
}

const useStyles = makeStyles(
    theme => ({
        root: {},
    }),
    { name: 'RaTranslatableFieldsTabs' }
);
