"use client"

import { IconRocket, IconX, IconXboxA, IconXboxB } from "@tabler/icons-react"
import { useState } from "react"

export default function Form() {
  const [inputValues, setInputValues] = useState(["", ""])

  const handleClearInput = (index: number) => {
    const newValues = [...inputValues]
    newValues[index] = ""
    setInputValues(newValues)

    const input = document.getElementById(`user-input-${index}`)
    input?.focus()
  }

  const handleInputChange = (index: number, value: string) => {
    const newValues = [...inputValues]
    newValues[index] = value
    setInputValues(newValues)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const inputsProps = [
    {
      Icon: IconXboxA,
      placeholder: "e.g. Pedro Pascal"
    },
    {
      Icon: IconXboxB,
      placeholder: "e.g. Harrison Ford"
    }
  ]

  return (
    <form
      className = "flex flex-col gap-6 w-full"
      onSubmit = {handleSubmit}
    >
      <div className = "flex flex-col gap-2">
        {inputsProps.map(({ Icon, placeholder }, i) => (
          <div
            className = "bg-form-input-fill border-2 border-form-input-border flex items-center justify-between px-4 py-3 rounded-[25px] gap-3"
            key = {i}
          >
            <div className = "flex items-center justify-start gap-3 w-full">
              <Icon className = { i === 0 ? "drop-shadow-form-input-starting-tag text-form-input-starting-tag" : "drop-shadow-form-input-target-tag text-form-input-target-tag" } />

              <input
                className = { `${ i === 0 ? "caret-form-input-starting-tag" : "caret-form-input-target-tag" } capitalize flex focus:outline-none font-form-input items-center justify-between placeholder-form-input-placeholder/30 placeholder:normal-case text-form-input-text text-lg w-full` }
                id = {`user-input-${i}`}
                onChange = { (e) => handleInputChange(i, e.target.value) }
                placeholder = {placeholder}
                type = "text"
                value = {inputValues[i]}
              />
            </div>

            {inputValues[i].length > 0 && (
              <button
                className = "text-form-input-clear-icon"
                onClick = { () => handleClearInput(i) }
                type = "button"
              >
                <IconX size = {20} />
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        className = "active:bg-form-active-submit-button-fill bg-form-submit-button-fill drop-shadow-form-submit-button flex font-form-submit-button gap-3 items-center justify-center p-5 rounded-3xl text-form-submit-button-text text-xl tracking-wider uppercase"
        type = "submit"
      >
        <IconRocket size = {25} />
        calculate path
      </button>
    </form>
  )
}
