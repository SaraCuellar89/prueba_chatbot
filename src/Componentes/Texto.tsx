/**
 * Wrapper de Text que unifica la tipografia usada en la aplicacion.
 */

// Componente necesario para que se aplique la misma tipografia en toda la aplicacion

import React from 'react';
import { Text, TextProps } from 'react-native';

const Texto = ({ style, ...props }: TextProps) => {
    return (
        <Text
            style={[{ fontFamily: 'JetBrainsMono_400Regular' }, style]}
            {...props}
        />
    );
}

export default Texto;