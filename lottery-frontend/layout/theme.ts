import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    base: {
      dark: '#4A5568', // gray.600
      light: '#A0AEC0', // gray.400
      lighter: '#E2E8F0', // gray.200
      lightest: '#EDF2F7', // gray.100
    },
  },
  components: {
    // ボタン・リンクのクリック後に青枠がつくのを無効化
    Button: { baseStyle: { _focus: { boxShadow: 'none' } } },
    Link: { baseStyle: { _focus: { boxShadow: 'none' } } },
  },
})
