import React from 'react';

export const InoLayoutContext = React.createContext<{
    isRowParent: boolean;
}>({
    isRowParent: false,
}); 