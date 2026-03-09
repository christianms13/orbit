import { IconBrandFigma, IconBrandGithub, IconX } from "@tabler/icons-react"
import Link from "next/link"

interface OverlayProps {
  onClose: () => void
}

export default function Overlay({onClose}: OverlayProps) {
  const buttonClassName = "border border-overlay-button-border bg-overlay-button-fill capitalize rounded-2xl p-1.5 font-overlay-button text-overlay-button-icon-fill flex items-center gap-1 text-xl w-full justify-center active:bg-overlay-button-border"

  return (
    <div
      className = "min-h-screen w-full bg-black/80 backdrop-blur-lg fixed top-0 left-0 z-2 flex flex-col items-center justify-center px-14"
      onClick = {onClose}
    >
      <IconX
        className = "text-overlay-menu-close-button absolute top-4.5 right-3"
        onClick = {onClose}
        stroke = {3}
      />

      <div className = "flex flex-col w-max gap-2">
        <Link
          className = {buttonClassName}
          href = "https://www.figma.com/design/mBHbUeowUpy3e4rIgle9jF/orbit?m=auto&t=1eDsvdQSmILyoSlI-1"
        >
          <IconBrandFigma />
          <span
            className = "text-transparent bg-clip-text"
            style = {{ backgroundImage: "linear-gradient(to right, var(--color-overlay-button-figma-gradient-0), var(--color-overlay-button-figma-gradient-1), var(--color-overlay-button-figma-gradient-2), var(--color-overlay-button-figma-gradient-3), var(--color-overlay-button-figma-gradient-4))" }}
          >
            check figma design
          </span>
        </Link>

        <Link
          className = {buttonClassName}
          href = "https://github.com/christian-ms13/orbit"
        >
          <IconBrandGithub />
          <span
            className = "text-overlay-button-github"
          >
            check github code
          </span>
        </Link>

        <div className = "flex items-center w-full justify-between gap-2">
          <button className = {buttonClassName}>
            <span
              className = "text-transparent bg-clip-text"
              style = {{ backgroundImage: "linear-gradient(to right, var(--color-overlay-button-english-gradient-0), var(--color-overlay-button-english-gradient-1), var(--color-overlay-button-english-gradient-2))" }}
            >
              english
            </span>
          </button>

          <button className = {buttonClassName}>
            <span
              className = "text-transparent bg-clip-text"
              style = {{ backgroundImage: "linear-gradient(to right, var(--color-overlay-button-spanish-gradient-0), var(--color-overlay-button-spanish-gradient-1), var(--color-overlay-button-spanish-gradient-2))" }}
            >
              español
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
