declare module 'node-iptc' {
  export default function iptc(buffer: Buffer): IptcData
}

type IptcData = {
  // biome-ignore lint/style/useNamingConvention: external library
  object_type_reference?: string
  // biome-ignore lint/style/useNamingConvention: external library
  object_attribute_reference?: string
  // biome-ignore lint/style/useNamingConvention: external library
  object_name?: string
  // biome-ignore lint/style/useNamingConvention: external library
  edit_status?: string
  // biome-ignore lint/style/useNamingConvention: external library
  editorial_update?: string
  urgency?: string
  // biome-ignore lint/style/useNamingConvention: external library
  subject_reference?: string
  category?: string
  // biome-ignore lint/style/useNamingConvention: external library
  supplemental_categories?: string[]
  // biome-ignore lint/style/useNamingConvention: external library
  fixture_id?: string[]
  keywords?: string[]
  // biome-ignore lint/style/useNamingConvention: external library
  content_location_code?: string[]
  // biome-ignore lint/style/useNamingConvention: external library
  content_location_name?: string[]
  // biome-ignore lint/style/useNamingConvention: external library
  release_date?: string
  // biome-ignore lint/style/useNamingConvention: external library
  release_time?: string
  // biome-ignore lint/style/useNamingConvention: external library
  expiration_date?: string
  // biome-ignore lint/style/useNamingConvention: external library
  expiration_time?: string
  // biome-ignore lint/style/useNamingConvention: external library
  special_instructions?: string
  // biome-ignore lint/style/useNamingConvention: external library
  action_advised?: string
  // biome-ignore lint/style/useNamingConvention: external library
  reference_service?: string[]
  // biome-ignore lint/style/useNamingConvention: external library
  reference_date?: string[]
  // biome-ignore lint/style/useNamingConvention: external library
  reference_number?: string[]
  // biome-ignore lint/style/useNamingConvention: external library
  date_created?: string
  // biome-ignore lint/style/useNamingConvention: external library
  time_created?: string
  // biome-ignore lint/style/useNamingConvention: external library
  digital_date_created?: string
  // biome-ignore lint/style/useNamingConvention: external library
  digital_time_created?: string
  // biome-ignore lint/style/useNamingConvention: external library
  originating_program?: string
  // biome-ignore lint/style/useNamingConvention: external library
  program_version?: string
  // biome-ignore lint/style/useNamingConvention: external library
  object_cycle?: string
  // biome-ignore lint/style/useNamingConvention: external library
  by_line?: string[]
  caption?: string // not in spec, but observed in situ
  // biome-ignore lint/style/useNamingConvention: external library
  by_line_title?: string[]
  city?: string
  // biome-ignore lint/style/useNamingConvention: external library
  sub_location?: string
  // biome-ignore lint/style/useNamingConvention: external library
  province_or_state?: string
  // biome-ignore lint/style/useNamingConvention: external library
  country_or_primary_location_code?: string
  // biome-ignore lint/style/useNamingConvention: external library
  country_or_primary_location_name?: string
  // biome-ignore lint/style/useNamingConvention: external library
  original_transmission_reference?: string
  headline?: string
  credit?: string
  source?: string
  // biome-ignore lint/style/useNamingConvention: external library
  copyright_notice?: string
  contact?: string
  // biome-ignore lint/style/useNamingConvention: external library
  local_caption?: string
  // biome-ignore lint/style/useNamingConvention: external library
  caption_writer?: string[]
  // biome-ignore lint/style/useNamingConvention: external library
  rasterized_caption?: string
  // biome-ignore lint/style/useNamingConvention: external library
  image_type?: string
  // biome-ignore lint/style/useNamingConvention: external library
  image_orientation?: string
  // biome-ignore lint/style/useNamingConvention: external library
  language_identifier?: string
  // biome-ignore lint/style/useNamingConvention: external library
  audio_type?: string
  // biome-ignore lint/style/useNamingConvention: external library
  audio_sampling_rate?: string
  // biome-ignore lint/style/useNamingConvention: external library
  audio_sampling_resolution?: string
  // biome-ignore lint/style/useNamingConvention: external library
  audio_duration?: string
  // biome-ignore lint/style/useNamingConvention: external library
  audio_outcue?: string
  // biome-ignore lint/style/useNamingConvention: external library
  job_id?: string
  // biome-ignore lint/style/useNamingConvention: external library
  master_document_id?: string
  // biome-ignore lint/style/useNamingConvention: external library
  short_document_id?: string
  // biome-ignore lint/style/useNamingConvention: external library
  unique_document_id?: string
  // biome-ignore lint/style/useNamingConvention: external library
  owner_id?: string
  // biome-ignore lint/style/useNamingConvention: external library
  object_preview_file_format?: string
  // biome-ignore lint/style/useNamingConvention: external library
  object_preview_file_format_version?: string
  // biome-ignore lint/style/useNamingConvention: external library
  object_preview_data?: string
  // biome-ignore lint/style/useNamingConvention: external library
  date_time?: Date
}
