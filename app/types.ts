export type Todo = {
  uid: string,
  name: string,
  tag: string,
  isCompleted: boolean
}
export type ThemeContextType = {
  theme: string
  toggleTheme: () => void
}