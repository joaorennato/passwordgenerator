import React, { useState } from 'react';
import Toast from 'react-native-tiny-toast';
import styled from 'styled-components/native';
import Slider from '@react-native-community/slider';
import Clipboard from '@react-native-clipboard/clipboard';

import Lock from './assets/lock-3.svg';

let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@,!$';

export default () => {

    const [chars, setChars] = useState(6);
    const [senha, setSenha] = useState('');

    const gerarSenha = () => {
        let pass = '';
        let n = charset.length;

        for(i=0; i < chars; i++){
            pass += charset.charAt(Math.floor(Math.random()*n));
        }

        setSenha(pass);
    }

    const copiaSenha = () => {
        Clipboard.setString(senha);
        Toast.show("A senha foi copiada!");
    }

    return (
        <Container>
            <Cadeado />
            <Texto>{ chars } caracteres</Texto>
            <Arrasta  
                minimumValue={6} 
                maximumValue={20} 
                step={1}
                minimumTrackTintColor="#FFB655" 
                maximumTrackTintColor="#EE8700" 
                thumbTintColor="#C66C00"
                value={chars} 
                onValueChange={chars=>setChars(chars)}
            />
            <Botao onPress={gerarSenha}>
                <BotaoTexto>Gerar</BotaoTexto>
            </Botao>
            <AreaSenhaGerada>
                <SenhaGerada onPress={copiaSenha} onLongPress={copiaSenha}>{senha}</SenhaGerada>
            </AreaSenhaGerada>
        </Container>
    );
}

const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
`;

const Cadeado = styled(Lock)`
    width: 100%;
    height: 170px;
    margin-bottom: 25px;
`;

const Texto = styled.Text`
    font-size: 18px;
    color: #444;
    margin-bottom: 25px;
`;

const Arrasta = styled(Slider)`
    width: 80%;
    margin-bottom: 25px;
`;

const Botao = styled.TouchableOpacity`
    width: 70%;
    height: 60px;
    border-radius: 30px;
    background-color: #77DD99;
    align-items: center;
    justify-content: center;
    margin-bottom: 25px;
`;

const BotaoTexto = styled.Text`
    font-size: 18px;
    color: #333;
    text-transform: uppercase;
`;

const AreaSenhaGerada = styled.View`
    width: 80%;
    padding: 0 20px;
    height: 60px;
    border-radius: 30px;
    background-color: #FFFFFF;
    align-items: center;
    justify-content: center;
`;

const SenhaGerada = styled.Text`
    color: #333;
    font-size: 18px;
    font-weight: bold;
`;