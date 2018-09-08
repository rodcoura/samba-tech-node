import { Video } from "src/interfaces/Video";
import { VideoService } from "../services/VideoService";

export interface WatcherComponentState {
  loadingVideo: boolean
  video?: Video
  exists: boolean
}

export interface WatcherComponentProps {
  match: any
  vds: VideoService
}