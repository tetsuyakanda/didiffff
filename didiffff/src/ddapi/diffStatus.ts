// Trace

export type DiffStatusToken = 'diffInLength' | 'diffInContents' | 'noDiff' | 'noTrace';
export type DiffStatusTrace = boolean;

// Text
export type DiffStatusLine = 'l1only' | 'l2only' | 'both';
export type DiffStatusText = boolean;
