"use client"

import * as React from "react"
import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
    Code,
    Laptop,
    Mail,
    FileText,
    Home,
    Briefcase
} from "lucide-react"

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { useRouter } from "next/navigation"

export function CommandMenu() {
    const [open, setOpen] = React.useState(false)
    const router = useRouter()

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false)
        command()
    }, [])

    return (
        <>
            <div className="fixed bottom-4 right-4 z-50 md:bottom-8 md:right-8">
                <div className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 bg-black/50 backdrop-blur-md rounded-full border border-white/10 shadow-lg pointer-events-none select-none">
                    <span className="text-xs">Press</span>
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-slate-400 opacity-100">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </div>
            </div>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList className="bg-deep-bg/95 backdrop-blur-xl border-white/10">
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Navigation">
                        <CommandItem onSelect={() => runCommand(() => window.scrollTo({ top: 0, behavior: 'smooth' }))}>
                            <Home className="mr-2 h-4 w-4" />
                            <span>Home</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => window.scrollTo({ top: 800, behavior: 'smooth' }))}>
                            <Briefcase className="mr-2 h-4 w-4" />
                            <span>Projects</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => window.scrollTo({ top: 1500, behavior: 'smooth' }))}>
                            <Code className="mr-2 h-4 w-4" />
                            <span>Tech Stack</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator className="bg-white/10" />
                    <CommandGroup heading="Actions">
                        <CommandItem onSelect={() => runCommand(() => window.open('mailto:hello@example.com', '_blank'))}>
                            <Mail className="mr-2 h-4 w-4" />
                            <span>Contact Me</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => window.open('/resume.pdf', '_blank'))}>
                            <FileText className="mr-2 h-4 w-4" />
                            <span>View Resume</span>
                            <CommandShortcut>⌘P</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}
