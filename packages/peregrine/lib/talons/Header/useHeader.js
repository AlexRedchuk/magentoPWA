import { useCallback } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';
import { useDropdown } from '@magento/peregrine/lib/hooks/useDropdown';
import { useQuery } from "@apollo/client";
import { GET_STORE_LOGO } from './logoProps.qql';

export const useHeader = () => {
    const [{ hasBeenOffline, isOnline, isPageLoading }] = useAppContext();
    const {
        elementRef: searchRef,
        expanded: isSearchOpen,
        setExpanded: setIsSearchOpen,
        triggerRef: searchTriggerRef
    } = useDropdown();
    const { data, error: logoError, loading: logoLoading } = useQuery(GET_STORE_LOGO, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });
    const logoData = data ? data.storeConfig : null;
    const handleSearchTriggerClick = useCallback(() => {
        // Toggle the Search input form.
        setIsSearchOpen(isOpen => !isOpen);
    }, [setIsSearchOpen]);

    return {
        handleSearchTriggerClick,
        hasBeenOffline,
        isOnline,
        isPageLoading,
        isSearchOpen,
        searchRef,
        searchTriggerRef,
        logoData,
        logoError,
        logoLoading
    };
};
