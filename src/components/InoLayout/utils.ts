import React from 'react';
import { InoCol } from './InoCol';

export const hasInoColChildren = (children: React.ReactNode): boolean => {
    return React.Children.toArray(children).some(
        child => React.isValidElement(child) && child.type === InoCol
    );
}; 