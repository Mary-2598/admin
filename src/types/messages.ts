export type ReadFilter = "all" | "read" | "unread" | "unanswered";

export interface BoothRow {
  id: string;
  name: string;
  imageUrl?: string;
  messageCount: number;
  readCount: number;
  unreadCount: number;
  awaitingReply: boolean;
  lastActivityAt: string; // ISO UTC
  warningCount: number;
  status: "active" | "blocked" | "warned";
}

export interface BoothPage {
  rows: BoothRow[];
  total: number;
  page: number;
  pageCount: number;
}

export interface ChatMessage {
  id: string;
  boothId: string;
  from: "user" | "booth";
  text: string;
  sentAt: string; // ISO UTC
}

export interface UserInfo {
  id: string;
  name: string;
  role: string;
  maskedPhone: string;
  joinedAt: string;
  lastSeenAt: string;
  /** ISO UTC; set by the server (now + 24h) when the user is blocked. */
  blockedUntil?: string;
}

export interface BoothInfo {
  id: string;
  name: string;
  category: string;
  city: string;
  status: "active" | "blocked";
  rating: number;
  sales: number;
  followers: number;
  ownerName: string;
  ownerMaskedPhone: string;
  ownerJoinedAt: string;
  warningCount: number;
  adCount: number;
  highlightCount: number;
}

export type SupportActionType = "report" | "warning" | "block" | "correction" | "other";
export type SupportActionStatus = "pending" | "done";

export interface SupportAction {
  id: string;
  type: SupportActionType;
  description: string;
  agent: string;
  status: SupportActionStatus;
  createdAt: string; // ISO UTC
}

export interface MessageStats {
  total: number;
  fresh: number;
  unread: number;
  irrelevant: number;
}

export type ReportReason = "inappropriate" | "ads" | "rules" | "insult" | "other";
