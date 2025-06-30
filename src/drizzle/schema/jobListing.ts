
import { pgTable, varchar,integer,text, pgEnum,boolean,timestamp, index} from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { OrganizationTable } from "./organization";
import { relations } from "drizzle-orm";
import { JobListingApplicationTable } from "./jobListingApplication";




export const wageIntervals=["hourly","yearly"] as const
export type wageInterval =typeof wageIntervals[number]
export const wageIntervalEnum= pgEnum("job_listing_wage_interval",wageIntervals)


export const locationRequirements=["in-office","hybrid","remote"] as const
export type locationRequirement =typeof locationRequirements[number]
export const locationRequirementEnum= pgEnum("job_listing_location_requirement",locationRequirements)


export const experienceLevels=["junior","mid-level","senior"] as const
export type experienceLevel =typeof experienceLevels[number]
export const experienceLevelEnum= pgEnum("job_listing_experience_level",experienceLevels)

export const jobListingStatuses=["draft","published","delisted"] as const
export type jobListingStatus =typeof jobListingStatuses[number]
export const jobListingStatusEnum= pgEnum("job_listing_status",jobListingStatuses)

export const jobListingTypes=["intership","part-time","full-time"] as const
export type jobListingStatuse =typeof jobListingTypes[number]
export const jobListingTypeEnum= pgEnum("job_listing_type",jobListingTypes)



export const JobListingTable= pgTable("job_Listings",{
    id,
    organizationId: varchar().references(()=>OrganizationTable.id,{onDelete:"cascade"}).notNull(),
    title:varchar().notNull(),
    description: text().notNull(),
    wage: integer(),
    wageInterval: wageIntervalEnum(),
    stateAbbreviation:varchar(),
    city: varchar(),
    isfeatured:boolean().notNull().default(false),
    locationRequirement: locationRequirementEnum().notNull(),
    experienceLevel: experienceLevelEnum().notNull(),
    status: jobListingStatusEnum().notNull().default("draft"),
    type: jobListingTypeEnum().notNull(),
    postedAt: timestamp({withTimezone:true}),
    createdAt,
    updatedAt

},
table=>[index().on(table.stateAbbreviation)]
)
export const jobListingReferences = relations(
  JobListingTable,
  ({ one, many }) => ({
    organization: one(OrganizationTable, {
      fields: [JobListingTable.organizationId],
      references: [OrganizationTable.id],
    }),
    applications: many(JobListingApplicationTable),
  })
)