export interface DetailStat {
    id: string;
    label: string;
    value: string;
    changePercent: number;
    tone: "purple" | "green" | "yellow" | "red";
  }

  export interface StoryItem {
    id: string;
    title: string;
    publishedAt: string;
    views: number;
    reactions: number;
    status: string;
    tone: string;
  }
