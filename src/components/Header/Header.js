import React, { Component } from 'react'
import {  View, } from 'react-native'
import { Constants } from 'expo'

import { TextTitle } from './styles'



const Header = ({ children }) => {
    <View>
        <View>
            <TextTitle>{children}</TextTitle>
        </View>
    </View>
}

export default Header;