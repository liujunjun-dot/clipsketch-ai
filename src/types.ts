export type ArtStyle = "pencil" | "watercolor" | "blueprint" | "crayon" | "ink";

export interface TutorialStep {
  stepNumber: number;
  title: string;
  instruction: string;
  imagePrompt: string;
  illustrationUrl: string;
}

export interface PresetTutorial {
  id: string;
  title: string;
  chineseTitle: string;
  style: ArtStyle;
  description: string;
  videoUrl?: string;
  steps: TutorialStep[];
}
