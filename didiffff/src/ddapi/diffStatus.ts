// Trace

export type DiffStatusToken = DiffStatusTokenInLength | 'diffInContents' | 'noDiff' | 'noTrace';
export type DiffStatusTokenInLength = 't1only' | 't2only' | 'diffInLength';
export type DiffStatusTrace = boolean;

// Text
export type DiffStatusLine = 'l1only' | 'l2only' | 'both';
export type DiffStatusText = boolean;
