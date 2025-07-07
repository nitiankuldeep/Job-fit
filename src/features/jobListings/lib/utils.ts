import { jobListingStatus } from "@/drizzle/schema"

export function getNextJobListingStatus(status: jobListingStatus) {
  switch (status) {
    case "draft":
    case "delisted":
      return "published"
    case "published":
      return "delisted"
    default:
      throw new Error(`Unknown job listing status: ${status}`)
  }
}

export function sortJobListingsByStatus(
  a: jobListingStatus,
  b: jobListingStatus
) {
  return JOB_LISTING_STATUS_SORT_ORDER[a] - JOB_LISTING_STATUS_SORT_ORDER[b]
}

const JOB_LISTING_STATUS_SORT_ORDER: Record<jobListingStatus, number> = {
  published: 0,
  draft: 1,
  delisted: 2,
}