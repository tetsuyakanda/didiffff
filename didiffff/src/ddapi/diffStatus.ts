// Trace

export type DiffStatusToken =
  | DiffStatusTokenInLength
  | 'diffInContents'
  | 'sameLengthObject'
  | 'noDiff'
  | 'noTrace';
export type DiffStatusTokenInLength = 't1only' | 't2only' | 'diffInLength';
export type DiffStatusTrace = 'diff' | 'noDiff' | 'noTrace';

// Text
export type DiffStatusLine = 'l1only' | 'l2only' | 'both';
export type DiffStatusText = boolean;

export interface DiffStatus {
  diffStatusText: DiffStatusText;
  diffStatusTrace: DiffStatusTrace;
}
