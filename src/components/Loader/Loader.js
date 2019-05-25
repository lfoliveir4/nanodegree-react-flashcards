import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import { Loading } from './styles'


const Loader = () => (
    <Loading>
        <ActivityIndicator size="large"  />
    </Loading>
)

export default Loader;