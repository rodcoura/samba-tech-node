import { Video } from "./Video";

export interface AppComponentState {
  loadingVideos: boolean | undefined
  uploading: boolean
  uploadingText: string
  videos: Video[]
}