declare module 'node-iptc' {
  export default function iptc(buffer: Buffer): IptcData
}

type IptcData = {
  object_type_reference?: string
  object_attribute_reference?: string
  object_name?: string
  edit_status?: string
  editorial_update?: string
  urgency?: string
  subject_reference?: string
  category?: string
  supplemental_categories?: string[]
  fixture_id?: string[]
  keywords?: string[]
  content_location_code?: string[]
  content_location_name?: string[]
  release_date?: string
  release_time?: string
  expiration_date?: string
  expiration_time?: string
  special_instructions?: string
  action_advised?: string
  reference_service?: string[]
  reference_date?: string[]
  reference_number?: string[]
  date_created?: string
  time_created?: string
  digital_date_created?: string
  digital_time_created?: string
  originating_program?: string
  program_version?: string
  object_cycle?: string
  by_line?: string[]
  caption?: string // not in spec, but observed in situ
  by_line_title?: string[]
  city?: string
  sub_location?: string
  province_or_state?: string
  country_or_primary_location_code?: string
  country_or_primary_location_name?: string
  original_transmission_reference?: string
  headline?: string
  credit?: string
  source?: string
  copyright_notice?: string
  contact?: string
  local_caption?: string
  caption_writer?: string[]
  rasterized_caption?: string
  image_type?: string
  image_orientation?: string
  language_identifier?: string
  audio_type?: string
  audio_sampling_rate?: string
  audio_sampling_resolution?: string
  audio_duration?: string
  audio_outcue?: string

  job_id?: string
  master_document_id?: string
  short_document_id?: string
  unique_document_id?: string
  owner_id?: string

  object_preview_file_format?: string
  object_preview_file_format_version?: string
  object_preview_data?: string
  date_time?: Date
}
