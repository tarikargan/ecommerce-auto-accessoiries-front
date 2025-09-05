export interface Media {
  name: string;
  url: string;
  size?: string;
  originName?: string;
  type: string | 'image' | 'video' | 'document';
}
