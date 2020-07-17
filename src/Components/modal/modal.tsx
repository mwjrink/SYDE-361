import React from 'react'
import { ModalBackDrop, ModalContainer, ModalWindow } from './modal.styled'
import { Container } from '../generate/abcts-styled'

interface ModalProps {
    open: boolean
    close: () => void
    children: any
}

export default function Modal({ open, close, children }: ModalProps) {
    return open ? (
        <>
            <ModalContainer>
                <ModalBackDrop onClick={close}></ModalBackDrop>
                <ModalWindow>{children}</ModalWindow>
            </ModalContainer>
        </>
    ) : (
        <div />
    )
}
