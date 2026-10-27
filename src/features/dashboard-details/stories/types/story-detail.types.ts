export interface DetailStat {
    id: string;
    label: string;
    value: string;
    changePercent: number;
    tone: "purple" | "green" | "yellow" | "red";
  }
  
  export interface StoryItem {
    id: string;
    storeId: string;
    title: string;
    publishedAt: string;
    views: number;
    reactions: number;
    status: string;
    tone: string;
  }
  
  export interface StoryStore {
    id: string;
    name: string;
    description: string;
    storyCount: number;
    views: number;
    status: string;
    lastPublishedAt: string;
    warnings: number;
    avatarTone: string;
  }