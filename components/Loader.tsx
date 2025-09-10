import { COLORS } from '@/constants/theme'
import { View, ActivityIndicator } from 'react-native'


export function Loader() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignContent: "center", backgroundColor: COLORS.background}}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  )
}