import * as React from 'react';
import { forwardRef, memo } from 'react';
import { Layout, AppBar, UserMenu, useLocale, useSetLocale } from 'react-admin';
import { MenuItem, ListItemIcon, MenuItemProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Language from '@material-ui/icons/Language';
import { Menu } from '@headlessui/react';

const useStyles = makeStyles(theme => ({
    menuItem: {
        color: theme.palette.text.secondary,
    },
    icon: { minWidth: theme.spacing(5) },
}));

const SwitchLanguage = forwardRef((props: MenuItemProps, ref) => {
    const locale = useLocale();
    const setLocale = useSetLocale();
    const classes = useStyles();
    return (
        <>
            <MenuItem
                ref={ref}
                className={classes.menuItem}
                onClick={e => {
                    setLocale(locale === 'en' ? 'fr' : 'en');
                    props.onClick(e);
                }}
            >
                <ListItemIcon className={classes.icon}>
                    <Language />
                </ListItemIcon>
                Switch Language
            </MenuItem>
            <Menu>
                <Menu.Button>More</Menu.Button>
                <Menu.Items>
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                className={`${active && 'bg-blue-500'}`}
                                href="/account-settings"
                            >
                                Account settings
                            </a>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                className={`${active && 'bg-blue-500'}`}
                                href="/account-settings"
                            >
                                Documentation
                            </a>
                        )}
                    </Menu.Item>
                    <Menu.Item disabled>
                        <span className="opacity-75">
                            Invite a friend (coming soon!)
                        </span>
                    </Menu.Item>
                </Menu.Items>
            </Menu>
        </>
    );
});

const MyUserMenu = props => (
    <UserMenu {...props}>
        <SwitchLanguage />
    </UserMenu>
);

const MyAppBar = memo(props => <AppBar {...props} userMenu={<MyUserMenu />} />);

export default props => <Layout {...props} appBar={MyAppBar} />;
