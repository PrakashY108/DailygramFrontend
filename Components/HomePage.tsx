import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Stories from '../HomeComponents/Stories'
import HomeMiddle from '../HomeComponents/HomeMiddle'

export default function HomePage() {
  return(
    <View>
     <Stories />
      <HomeMiddle />
    </View>
  )
}
