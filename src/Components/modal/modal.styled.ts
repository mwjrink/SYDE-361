import styled from 'styled-components'
import { BoxShadow } from '../../style/utils'

export const ModalContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ModalWindow = styled.div`
    background: white;
    min-width: 240px;
    min-height: 240px;
    z-index: 3;
    opacity: 100%;
    position: center;

    border-radius: 4px;
    box-shadow: ${BoxShadow(4)};

    padding: 4px;
`

export const ModalBackDrop = styled.div`
    background: black;
    opacity: 50%;

    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    z-index: 1;
`
