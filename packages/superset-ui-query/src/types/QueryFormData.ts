/* eslint camelcase: 0 */
// FormData uses snake_cased keys.
import { AdhocMetric } from './Metric';
import { TimeRange } from './Time';
import { AdhocFilter } from './Filter';

export type QueryFormDataMetric = string | AdhocMetric;
export type QueryFormResidualDataValue = string | AdhocMetric;
export type QueryFormResidualData = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};
export type QueryFields = {
  [key: string]: string;
};

// Type signature for formData shared by all viz types
// It will be gradually filled out as we build out the query object

export type BaseFormData = {
  /** datasource identifier ${id}_${type} */
  datasource: string;
  /**
   * visualization type
   * - necessary if you use the plugin and want to use
   * buildQuery function from the plugin.
   * This must match the key used when registering the plugin.
   * - not necessary if you do not plan to use the
   * buildQuery function from the plugin.
   * Can put "custom" (or any string) in this field in that case.
   */
  viz_type: string;
  /** list of columns to group by */
  groupby?: string[];
  where?: string;
  columns?: string[];
  all_columns?: string[];
  /** list of filters */
  adhoc_filters?: AdhocFilter[];
  /** order descending */
  order_desc?: boolean;
  /** limit number of time series */
  limit?: number;
  /** limit number of row in the results */
  row_limit?: string | number | null;
  /** The metric used to order timeseries for limiting */
  timeseries_limit_metric?: QueryFormResidualDataValue;
  /** Force refresh */
  force?: boolean;
  queryFields?: QueryFields;
} & TimeRange &
  QueryFormResidualData;

// FormData is either sqla-based or druid-based
export type SqlaFormData = {
  granularity_sqla: string;
  time_grain_sqla?: string;
  having?: string;
} & BaseFormData;

export type DruidFormData = {
  granularity: string;
  having_druid?: string;
  druid_time_origin?: string;
} & BaseFormData;

export type QueryFormData = SqlaFormData | DruidFormData;

//---------------------------------------------------
// Type guards
//---------------------------------------------------

export function isDruidFormData(formData: QueryFormData): formData is DruidFormData {
  return 'granularity' in formData;
}

export function isSqlaFormData(formData: QueryFormData): formData is SqlaFormData {
  return 'granularity_sqla' in formData;
}
