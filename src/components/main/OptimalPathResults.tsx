"use client"

import { PathState } from "@/actions/orbit"
import { useI18n } from "@/i18n/I18nProvider"
import { IconLink, IconMovie, IconUser } from "@tabler/icons-react"
import Image from "next/image"
import Link from "next/link"

interface OptimalPathResultsProps {
  isLoading: boolean
  resultData: PathState | null
}

export default function OptimalPathResults({ isLoading, resultData }: OptimalPathResultsProps) {
  const {t} = useI18n()

  const getErrorMessage = () => {
    switch (resultData?.message) {
      case "optimal-path-results.error.calculation-failed":
        return t("optimal-path-results.error.calculation-failed")
      case "optimal-path-results.error.misconfigured-environment":
        return t("optimal-path-results.error.misconfigured-environment")
      case "optimal-path-results.error.missing-names":
        return t("optimal-path-results.error.missing-names")
      case "optimal-path-results.error.no-connection":
        return t("optimal-path-results.error.no-connection")
      default:
        return ""
    }
  }

  const responsiveProperties = {
    "avatar.container": "768:h-20 768:w-20",
    "avatar.icon": "768:h-7 768:w-7",
    "card.details": "768:text-lg",
    "card.title": "768:text-2xl",
    "poster.container": "768:w-22",
    "state": "360:tracking-widest 390:text-3xl 390:tracking-wider",
    "title": "360:text-base 390:text-lg"
  }

  return (
    <div className = "flex flex-col gap-5">
      <h2 className = { `${responsiveProperties["title"]} font-optimal-path-results-title text-optimal-path-results-title text-sm uppercase` }>
        {t("optimal-path-results.title")}
      </h2>

      {isLoading ? (
        <h3 className = { `${responsiveProperties["state"]} animate-pulse-fast font-optimal-path-results-state text-2xl text-center text-optimal-path-results-state tracking-wider uppercase` }>
          {t("optimal-path-results.state.calculating")}
        </h3>
      ) : resultData && !resultData.success ? (
        <h3 className = { `${responsiveProperties["state"]} animate-pulse-fast font-optimal-path-results-state text-2xl text-center text-optimal-path-results-error tracking-wider uppercase` }>
          {getErrorMessage()}
        </h3>
      ) : !resultData?.path ? (
        <h3 className = { `${responsiveProperties["state"]} animate-pulse-fast font-optimal-path-results-state text-2xl text-center text-optimal-path-results-state tracking-wider uppercase` }>
          {t("optimal-path-results.state.waiting")}
        </h3>
      ) : (
        <div className = "flex flex-col relative w-full">
          <div className = "flex flex-col gap-8 w-full">
            {resultData.path.map((node, i) => {
              const isActor = node.type === "Actor"
              const isEnd = i === resultData.path!.length - 1
              const isStart = i === 0

              const colorClass = isStart ? "text-optimal-path-results-origin" : isEnd ? "text-optimal-path-results-target" : "text-optimal-path-results-connection"
              const glowClass = isStart ? "border-optimal-path-results-origin drop-shadow-optimal-path-results-origin" : isEnd ? "border-optimal-path-results-target drop-shadow-optimal-path-results-target" : "border-optimal-path-results-connection drop-shadow-optimal-path-results-connection"

              const isLineBlue = i === 0
              const isLinePurple = i === resultData.path!.length - 2
              const lineClass = isLineBlue ? "bg-optimal-path-results-origin" : isLinePurple ? "bg-optimal-path-results-target" : "bg-optimal-path-results-connection"

              const releaseYear = node.release_date ? String(node.release_date).split("-")[0] : ""
              const votePercentage = node.vote_average ? `${Math.round(Number(node.vote_average) * 10)}%` : ""
              const tmdbUrl = isActor ? `https://www.themoviedb.org/person/${node.id}` : `https://www.themoviedb.org/movie/${node.id}`

              return (
                <div
                  className = "flex gap-4 items-center relative w-full"
                  key = {i}
                >
                  {!isEnd && (
                    <div className = { `${lineClass} absolute h-[calc(100%+2rem)] left-8 top-1/2 w-0.5` } />
                  )}

                  {isActor ? (
                    <Link
                      className = { `${glowClass} ${responsiveProperties["avatar.container"]} bg-optimal-path-results-card-fill border-2 flex h-16 items-center justify-center overflow-hidden rounded-full shrink-0 w-16` }
                      href = {tmdbUrl}
                      rel = "noopener noreferrer"
                      target = "_blank"
                    >
                      {node.profile ? (
                        <Image
                          alt = {String(node.name)}
                          className = "h-full object-cover w-full"
                          height = {80}
                          src = {String(node.profile)}
                          width = {80}
                        />
                      ) : (
                        <IconUser className = {`${colorClass} ${responsiveProperties["avatar.icon"]} h-6 w-6`} />
                      )}
                    </Link>
                  ) : (
                    <div className = { `${glowClass} ${responsiveProperties["avatar.container"]} bg-optimal-path-results-card-fill border-2 flex h-16 items-center justify-center overflow-hidden rounded-full shrink-0 w-16` }>
                      <IconMovie className = {`${colorClass} ${responsiveProperties["avatar.icon"]} h-6 w-6`} />
                    </div>
                  )}

                  <Link
                    className = "bg-optimal-path-results-card-fill border border-optimal-path-results-card-border flex flex-1 gap-4 items-center justify-between min-w-0 p-4 rounded-2xl"
                    href = {tmdbUrl}
                    rel = "noopener noreferrer"
                    target = "_blank"
                  >
                    <div className = "flex flex-1 gap-4 items-center min-w-0">
                      {!isActor && node.poster && (
                        <div className = { `${responsiveProperties["poster.container"]} aspect-2/3 border border-optimal-path-results-card-border overflow-hidden rounded shrink-0 w-18` }>
                          <Image
                            alt = {String(node.title)}
                            className = "h-full object-cover w-full"
                            height = {132}
                            src = {String(node.poster)}
                            width = {88}
                          />
                        </div>
                      )}

                      <div className = "flex flex-1 flex-col justify-center min-w-0">
                        <h4 className = { `${responsiveProperties["card.title"]} font-optimal-path-results-results-title sm:text-pretty sm:whitespace-normal text-lg text-optimal-path-results-text-primary truncate w-full` }>
                          {String(node.name || node.title)}
                        </h4>

                        {isActor ? (
                          <span className = { `${colorClass} ${responsiveProperties["card.details"]} font-optimal-path-results-results-details mt-1 text-[0.9rem] tracking-widest uppercase` }>
                            { isStart ? t("optimal-path-results.results.origin-actor") : isEnd ? t("optimal-path-results.results.target-actor") : t("optimal-path-results.results.connection") }
                          </span>
                        ) : (
                          <div className = { `${responsiveProperties["card.details"]} flex flex-col font-optimal-path-results-results-details gap-0.5 mt-1 text-[0.9rem] text-optimal-path-results-text-secondary tracking-wider` }>
                            {releaseYear && (
                              <span>
                                {releaseYear}
                              </span>
                            )}
                            {node.language && (
                              <span>
                                {String(node.language)}
                              </span>
                            )}
                            {votePercentage && (
                              <span>
                                {votePercentage}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {isActor && (
                      <div className = { `${isStart || isEnd ? "bg-optimal-path-results-card-border" : "bg-transparent"} flex items-center justify-center p-2 rounded-full shrink-0` }>
                        {isStart || isEnd ? (
                          <IconUser className = {colorClass} size = {20} />
                        ) : (
                          <IconLink className = "text-optimal-path-results-connection" size = {20} />
                        )}
                      </div>
                    )}
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
