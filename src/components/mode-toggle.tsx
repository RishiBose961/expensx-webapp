import { Moon, Sun } from 'lucide-react'


import { Button } from "@/components/ui/button"
import { useTheme } from './theme-provider'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <Button
    variant="outline"
    onClick={toggleTheme}
    aria-label="Toggle theme"
    className="w-[6rem] justify-start"
  >
    {theme === "dark" ? (
      <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all mr-2" />
    ) : (
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all mr-2" />
    )}
    {theme === "dark" ? "Dark" : "Light"}
  </Button>
  )
}
